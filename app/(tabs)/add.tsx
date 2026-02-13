import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CATEGORIES } from '@/types/expense';
import { useExpenseForm } from '@/hooks/use-expense-form';
import { getCategoryColor, getCategoryIcon, formatDateForDisplay } from '@/utils/helpers';

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

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Expense</Text>
        <Text style={styles.headerSubtitle}>Track a new expense</Text>
      </View>

      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={[styles.input, errors.title ? styles.inputError : undefined]}
            placeholder="e.g. Grocery shopping"
            placeholderTextColor="#c7c7cc"
            value={title}
            onChangeText={handleTitleChange}
            returnKeyType="next"
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        {/* Amount Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Amount ($)</Text>
          <TextInput
            style={[styles.input, errors.amount ? styles.inputError : undefined]}
            placeholder="0.00"
            placeholderTextColor="#c7c7cc"
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            returnKeyType="next"
          />
          {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
        </View>

        {/* Category Selection */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat;
              const color = getCategoryColor(cat);
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryOption,
                    isSelected && { backgroundColor: color, borderColor: color },
                  ]}
                  onPress={() => handleCategoryChange(cat)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.categoryOptionEmoji}>
                    {getCategoryIcon(cat)}
                  </Text>
                  <Text
                    style={[
                      styles.categoryOptionText,
                      isSelected && styles.categoryOptionTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
        </View>

        {/* Date Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={[styles.input, errors.date ? styles.inputError : undefined]}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#c7c7cc"
            value={date}
            onChangeText={handleDateChange}
            keyboardType="number-pad"
            maxLength={10}
          />
          {date && !errors.date && (
            <Text style={styles.datePreview}>{formatDateForDisplay(date)}</Text>
          )}
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isSaving && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSaving}
          activeOpacity={0.8}
        >
          {isSaving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Add Expense</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#8e8e93',
    marginTop: 2,
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: 20,
    paddingBottom: 100,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1a1a2e',
    borderWidth: 1.5,
    borderColor: '#e5e5ea',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 6,
    marginLeft: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e5e5ea',
    gap: 6,
  },
  categoryOptionEmoji: {
    fontSize: 18,
  },
  categoryOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#636366',
  },
  categoryOptionTextActive: {
    color: '#fff',
  },
  datePreview: {
    fontSize: 13,
    color: '#8e8e93',
    marginTop: 6,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#1a1a2e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
