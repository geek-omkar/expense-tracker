import React, { memo } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { CategoryFilter } from './category-filter';
import { formatCurrency } from '@/utils/helpers';

// Search Bar Component
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = memo(({ value, onChangeText }: SearchBarProps) => (
  <View style={styles.searchContainer}>
    <Text style={styles.searchIcon}>🔍</Text>
    <TextInput
      style={styles.searchInput}
      placeholder="Search expenses..."
      placeholderTextColor="#8e8e93"
      value={value}
      onChangeText={onChangeText}
      returnKeyType="search"
      clearButtonMode="while-editing"
      autoCorrect={false}
      autoCapitalize="none"
    />
  </View>
));

SearchBar.displayName = 'SearchBar';

// Expense Header Component
export interface ExpenseHeaderProps {
  selectedCategory: string | null;
  total: number;
  expenseCount: number;
  searchValue: string;
  onSearchChange: (text: string) => void;
}

export const ExpenseHeader = memo(({ 
  selectedCategory, 
  total, 
  expenseCount, 
  searchValue, 
  onSearchChange 
}: ExpenseHeaderProps) => (
  <View>
    {/* Total Card */}
    <View style={styles.totalCard}>
      <Text style={styles.totalLabel}>
        {selectedCategory ? `${selectedCategory} Expenses` : 'Total Expenses'}
      </Text>
      <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
      <Text style={styles.totalCount}>
        {expenseCount} expense{expenseCount !== 1 ? 's' : ''}
      </Text>
    </View>

    {/* Search Bar */}
    <SearchBar value={searchValue} onChangeText={onSearchChange} />

    {/* Category Filter */}
    <CategoryFilter />
  </View>
));

ExpenseHeader.displayName = 'ExpenseHeader';

const styles = StyleSheet.create({
  totalCard: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    padding: 24,
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
  },
  totalCount: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a2e',
    paddingVertical: 12,
  },
});
