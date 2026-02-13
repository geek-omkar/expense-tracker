import { Category, Expense, ExpenseFormData } from "@/types/expense";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEY = "expenses_data";

/**
 * Generate a unique ID for expenses
 * Uses timestamp + random number for uniqueness
 * Format: timestamp-random (e.g., "1706451234567-12345")
 */
function generateId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);
  return `${timestamp}-${random}`;
}

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
  searchQuery: "",
  selectedCategory: null,

  loadExpenses: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const expenses: Expense[] = JSON.parse(data);
        // Validate parsed data is an array
        if (!Array.isArray(expenses)) {
          throw new Error("Invalid data format in storage");
        }
        // Sort by date descending
        expenses.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        set({ expenses, isLoading: false });
      } else {
        set({ expenses: [], isLoading: false });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load expenses";
      console.error("Error loading expenses:", error);
      set({ error: errorMessage, isLoading: false });
    }
  },

  addExpense: async (data: ExpenseFormData) => {
    set({ error: null });
    try {
      // Validate data before creating expense
      if (!data.title || !data.category || !data.date) {
        throw new Error("Missing required fields");
      }

      // Validate amount is a valid positive number
      if (
        typeof data.amount !== "number" ||
        isNaN(data.amount) ||
        data.amount <= 0
      ) {
        throw new Error("Amount must be a valid positive number");
      }

      // Validate date is valid
      const dateObj = new Date(data.date);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date format");
      }

      const newExpense: Expense = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };

      const updatedExpenses = [newExpense, ...get().expenses];

      // Validate JSON serialization before saving
      const jsonString = JSON.stringify(updatedExpenses);
      if (!jsonString) {
        throw new Error("Failed to serialize expense data");
      }

      await AsyncStorage.setItem(STORAGE_KEY, jsonString);
      set({ expenses: updatedExpenses });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save expense";
      console.error("Error saving expense:", error);
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  deleteExpense: async (id: string) => {
    set({ error: null });
    try {
      const updatedExpenses = get().expenses.filter((e) => e.id !== id);
      const jsonString = JSON.stringify(updatedExpenses);
      if (!jsonString) {
        throw new Error("Failed to serialize expense data");
      }
      await AsyncStorage.setItem(STORAGE_KEY, jsonString);
      set({ expenses: updatedExpenses });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete expense";
      console.error("Error deleting expense:", error);
      set({ error: errorMessage });
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
      filtered = filtered.filter((e) => e.title.toLowerCase().includes(query));
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
