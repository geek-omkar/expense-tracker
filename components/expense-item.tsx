import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Expense } from '@/types/expense';
import { useExpenseStore } from '@/store/expense-store';
import { getCategoryIcon, getCategoryColor, formatCurrency, formatDate } from '@/utils/helpers';

interface ExpenseItemProps {
  expense: Expense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);

  const handleDelete = () => {
    Alert.alert(
      'Delete Expense',
      `Are you sure you want to delete "${expense.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteExpense(expense.id),
        },
      ]
    );
  };

  const categoryColor = getCategoryColor(expense.category);

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={handleDelete}
      activeOpacity={0.7}
    >
      <View style={[styles.categoryIcon, { backgroundColor: categoryColor + '20' }]}>
        <Text style={styles.categoryEmoji}>{getCategoryIcon(expense.category)}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {expense.title}
        </Text>
        <View style={styles.metaRow}>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '15' }]}>
            <Text style={[styles.categoryText, { color: categoryColor }]}>
              {expense.category}
            </Text>
          </View>
          <Text style={styles.date}>{formatDate(expense.date)}</Text>
        </View>
      </View>
      <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryEmoji: {
    fontSize: 22,
  },
  details: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#8e8e93',
  },
  amount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
  },
});
