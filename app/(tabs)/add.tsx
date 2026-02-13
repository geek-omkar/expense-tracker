import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useExpenseForm } from '@/hooks/use-expense-form';
import { formatDateForDisplay } from '@/utils/helpers';
import { ScreenHeader } from '@/components/ScreenHeader';
import { FormField } from '@/components/FormField';
import { CategoryPicker } from '@/components/CategoryPicker';
import { SubmitButton } from '@/components/SubmitButton';

export default function AddExpenseScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const {
    title,
    amount,
    category,
    date,
    errors,
    isSaving,
    handleTitleChange,
    handleAmountChange,
    handleCategoryChange,
    handleDateChange,
    handleSubmit,
  } = useExpenseForm(() => router.navigate('/(tabs)'));

  const dateHint = date && !errors.date ? formatDateForDisplay(date) : undefined;

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader title="Add Expense" subtitle="Track a new expense" />

      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <FormField
          label="Title"
          placeholder="e.g. Grocery shopping"
          value={title}
          onChangeText={handleTitleChange}
          error={errors.title}
          returnKeyType="next"
        />

        <FormField
          label="Amount ($)"
          placeholder="0.00"
          value={amount}
          onChangeText={handleAmountChange}
          error={errors.amount}
          keyboardType="decimal-pad"
          returnKeyType="next"
        />

        <CategoryPicker
          selected={category}
          onSelect={handleCategoryChange}
          error={errors.category}
        />

        <FormField
          label="Date"
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={handleDateChange}
          error={errors.date}
          hint={dateHint}
          keyboardType="number-pad"
          maxLength={10}
        />

        <SubmitButton
          title="Add Expense"
          onPress={handleSubmit}
          isLoading={isSaving}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: 20,
    paddingBottom: 100,
  },
});
