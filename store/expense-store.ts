import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { Category, Expense, ExpenseFormData } from '@/types/expense';

const STORAGE_KEY = 'expenses_data';

interface ExpenseState {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: Category | null;

  // Actions
  loadExpenses: () => Promise<void>;
  addExpense: (data: ExpenseFormData) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: Category | null) => void;

  // Computed (via selectors)
  getFilteredExpenses: () => Expense[];
  getTotal: () => number;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedCategory: null,

  loadExpenses: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const expenses: Expense[] = data ? JSON.parse(data) : [];
      // Sort by date descending
      expenses.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      set({ expenses, isLoading: false });
    } catch {
      set({ error: 'Failed to load expenses', isLoading: false });
    }
  },

  addExpense: async (data: ExpenseFormData) => {
    set({ error: null });
    try {
      const newExpense: Expense = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      const updatedExpenses = [newExpense, ...get().expenses];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExpenses));
      set({ expenses: updatedExpenses });
    } catch {
      set({ error: 'Failed to save expense' });
      throw new Error('Failed to save expense');
    }
  },

  deleteExpense: async (id: string) => {
    set({ error: null });
    try {
      const updatedExpenses = get().expenses.filter((e) => e.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExpenses));
      set({ expenses: updatedExpenses });
    } catch {
      set({ error: 'Failed to delete expense' });
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSelectedCategory: (category: Category | null) => {
    set({ selectedCategory: category });
  },

  getFilteredExpenses: () => {
    const { expenses, searchQuery, selectedCategory } = get();
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
  },

  getTotal: () => {
    const filtered = get().getFilteredExpenses();
    return filtered.reduce((sum, e) => sum + e.amount, 0);
  },
}));
