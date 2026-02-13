import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useExpenseStore } from '@/store/expense-store';

/**
 * Hook that encapsulates all expense list logic:
 * - Initial loading
 * - Pull-to-refresh
 * - Search & category filter state
 * - Filtered expenses and computed total
 * - Reloads expenses when screen comes into focus
 *
 * Keeps screen components focused purely on rendering.
 */
export function useExpenses() {
  const [refreshing, setRefreshing] = useState(false);

  const expenses = useExpenseStore((s) => s.expenses);
  const isLoading = useExpenseStore((s) => s.isLoading);
  const error = useExpenseStore((s) => s.error);
  const searchQuery = useExpenseStore((s) => s.searchQuery);
  const selectedCategory = useExpenseStore((s) => s.selectedCategory);
  const setSearchQuery = useExpenseStore((s) => s.setSearchQuery);
  const loadExpenses = useExpenseStore((s) => s.loadExpenses);

  // Calculate filtered expenses reactively
  const filteredExpenses = useMemo(() => {
    let filtered = expenses;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((e) =>
        e.title.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((e) => e.category === selectedCategory);
    }

    return filtered;
  }, [expenses, searchQuery, selectedCategory]);

  // Calculate total reactively
  const total = useMemo(() => {
    return filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  }, [filteredExpenses]);

  // Load expenses on mount
  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  // Reload expenses when screen comes into focus (e.g., after adding an expense)
  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [loadExpenses])
  );

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadExpenses();
    setRefreshing(false);
  }, [loadExpenses]);

  // Whether the list is in its initial loading state (no cached data yet)
  const isInitialLoading = isLoading && expenses.length === 0;

  // Whether there are no expenses at all (vs. filters hiding them)
  const hasNoExpenses = expenses.length === 0;

  // Whether there are expenses but filters produced empty results
  const hasNoResults = !hasNoExpenses && filteredExpenses.length === 0;

  return {
    // Data
    expenses,
    filteredExpenses,
    total,

    // State
    isLoading,
    isInitialLoading,
    refreshing,
    error,
    searchQuery,
    selectedCategory,
    hasNoExpenses,
    hasNoResults,

    // Actions
    setSearchQuery,
    onRefresh,
  };
}
