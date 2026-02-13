import React, { memo } from 'react';
import { View } from 'react-native';
import { TotalCard } from './TotalCard';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './category-filter';

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
}: ExpenseHeaderProps) => {
  const label = selectedCategory 
    ? `${selectedCategory} Expenses` 
    : 'Total Expenses';

  return (
    <View>
      {/* Total Card */}
      <TotalCard 
        label={label}
        total={total}
        count={expenseCount}
      />

      {/* Search Bar */}
      <SearchBar 
        value={searchValue} 
        onChangeText={onSearchChange} 
      />

      {/* Category Filter */}
      <CategoryFilter />
    </View>
  );
});

ExpenseHeader.displayName = 'ExpenseHeader';
