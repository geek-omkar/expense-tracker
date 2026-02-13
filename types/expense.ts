export const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string; // ISO date string
  createdAt: string; // ISO timestamp
}

export type ExpenseFormData = Omit<Expense, 'id' | 'createdAt'>;

export interface ExpenseFormErrors {
  title?: string;
  amount?: string;
  category?: string;
  date?: string;
}
