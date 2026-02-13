import React, { memo } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = memo(({ 
  value, 
  onChangeText, 
  placeholder = "Search expenses..." 
}: SearchBarProps) => (
  <View style={styles.searchContainer}>
    <Text style={styles.searchIcon}>🔍</Text>
    <TextInput
      style={styles.searchInput}
      placeholder={placeholder}
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

const styles = StyleSheet.create({
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
