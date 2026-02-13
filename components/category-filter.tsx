import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { CATEGORIES, Category } from '@/types/expense';
import { useExpenseStore } from '@/store/expense-store';
import { getCategoryColor, getCategoryIcon } from '@/utils/helpers';

export function CategoryFilter() {
  const selectedCategory = useExpenseStore((state) => state.selectedCategory);
  const setSelectedCategory = useExpenseStore((state) => state.setSelectedCategory);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.chip,
          !selectedCategory && styles.chipActive,
        ]}
        onPress={() => setSelectedCategory(null)}
        activeOpacity={0.7}
      >
        <Text style={[styles.chipText, !selectedCategory && styles.chipTextActive]}>
          All
        </Text>
      </TouchableOpacity>
      {CATEGORIES.map((category) => {
        const isActive = selectedCategory === category;
        const color = getCategoryColor(category);
        return (
          <TouchableOpacity
            key={category}
            style={[
              styles.chip,
              isActive && { backgroundColor: color, borderColor: color },
            ]}
            onPress={() =>
              setSelectedCategory(isActive ? null : category)
            }
            activeOpacity={0.7}
          >
            <Text style={styles.chipEmoji}>{getCategoryIcon(category)}</Text>
            <Text
              style={[
                styles.chipText,
                isActive && styles.chipTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f2f2f7',
    borderWidth: 1.5,
    borderColor: '#f2f2f7',
    gap: 4,
  },
  chipActive: {
    backgroundColor: '#1a1a2e',
    borderColor: '#1a1a2e',
  },
  chipEmoji: {
    fontSize: 14,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636366',
  },
  chipTextActive: {
    color: '#fff',
  },
});
