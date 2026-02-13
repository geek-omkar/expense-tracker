import { useCallback, useEffect, useState } from 'react';
import { useExpenseStore } from '@/store/expense-store';

/**
 * Hook that encapsulates all expense list logic:
 * - Initial loading
 * - Pull-to-refresh
 * - Search & category filter state
 * - Filtered expenses and computed total
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
  const getFilteredExpenses = useExpenseStore((s) => s.getFilteredExpenses);
  const getTotal = useExpenseStore((s) => s.getTotal);

  const filteredExpenses = getFilteredExpenses();
  const total = getTotal();

  // Load expenses on mount
  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

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
