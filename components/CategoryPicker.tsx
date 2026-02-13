import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Category, CATEGORIES } from '@/types/expense';
import { getCategoryColor, getCategoryIcon } from '@/utils/helpers';

export interface CategoryPickerProps {
  selected: Category | null;
  onSelect: (category: Category) => void;
  error?: string;
}

export const CategoryPicker = memo(({ selected, onSelect, error }: CategoryPickerProps) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.label}>Category</Text>
    <View style={styles.categoryGrid}>
      {CATEGORIES.map((cat) => {
        const isSelected = selected === cat;
        const color = getCategoryColor(cat);
        return (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryOption,
              isSelected && { backgroundColor: color, borderColor: color },
            ]}
            onPress={() => onSelect(cat)}
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
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
));

CategoryPicker.displayName = 'CategoryPicker';

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
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
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 6,
    marginLeft: 4,
  },
});
