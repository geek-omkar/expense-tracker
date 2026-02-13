import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { Category, ExpenseFormErrors } from '@/types/expense';
import { useExpenseStore } from '@/store/expense-store';

/**
 * Hook that encapsulates the Add Expense form logic:
 * - Field state management
 * - Validation with inline error messages
 * - Auto-formatting for date input
 * - Submission with loading state
 * - Form reset after success
 *
 * Returns everything the form UI needs, keeping the screen component
 * focused purely on rendering.
 */
export function useExpenseForm(onSuccess?: () => void) {
  const addExpense = useExpenseStore((s) => s.addExpense);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState<ExpenseFormErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  // Clear a single field's error when the user edits that field
  const clearFieldError = useCallback((field: keyof ExpenseFormErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      return { ...prev, [field]: undefined };
    });
  }, []);

  // Field change handlers that also clear inline errors
  const handleTitleChange = useCallback(
    (text: string) => {
      setTitle(text);
      clearFieldError('title');
    },
    [clearFieldError]
  );

  const handleAmountChange = useCallback(
    (text: string) => {
      // Only allow valid number characters
      const cleaned = text.replace(/[^0-9.]/g, '');
      setAmount(cleaned);
      clearFieldError('amount');
    },
    [clearFieldError]
  );

  const handleCategoryChange = useCallback(
    (cat: Category) => {
      setCategory(cat);
      clearFieldError('category');
    },
    [clearFieldError]
  );

  // Auto-format date as user types (YYYY-MM-DD)
  const handleDateChange = useCallback(
    (text: string) => {
      const cleaned = text.replace(/[^0-9]/g, '');
      let formatted = cleaned;
      if (cleaned.length > 4) {
        formatted = cleaned.slice(0, 4) + '-' + cleaned.slice(4);
      }
      if (cleaned.length > 6) {
        formatted = formatted.slice(0, 7) + '-' + cleaned.slice(6, 8);
      }
      setDate(formatted);
      clearFieldError('date');
    },
    [clearFieldError]
  );

  // Validate all fields — returns true if valid
  const validate = useCallback((): boolean => {
    const newErrors: ExpenseFormErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    const numAmount = parseFloat(amount);
    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!category) {
      newErrors.category = 'Please select a category';
    }

    if (!date.trim()) {
      newErrors.date = 'Date is required';
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        newErrors.date = 'Use format YYYY-MM-DD';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [title, amount, category, date]);

  // Reset form to its initial state
  const resetForm = useCallback(() => {
    setTitle('');
    setAmount('');
    setCategory(null);
    setDate(new Date().toISOString().split('T')[0]);
    setErrors({});
  }, []);

  // Submit the form
  const handleSubmit = useCallback(async () => {
    if (!validate()) return;

    setIsSaving(true);
    try {
      await addExpense({
        title: title.trim(),
        amount: parseFloat(amount),
        category: category!,
        date: new Date(date).toISOString(),
      });

      Alert.alert('Success', 'Expense added successfully!', [
        {
          text: 'OK',
          onPress: () => {
            resetForm();
            onSuccess?.();
          },
        },
      ]);
    } catch {
      Alert.alert('Error', 'Failed to save expense. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [validate, addExpense, title, amount, category, date, resetForm, onSuccess]);

  return {
    // Field values
    title,
    amount,
    category,
    date,

    // State
    errors,
    isSaving,

    // Handlers
    handleTitleChange,
    handleAmountChange,
    handleCategoryChange,
    handleDateChange,
    handleSubmit,
    resetForm,
  };
}
