import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useExpenses } from '@/hooks/use-expenses';
import { ExpenseItem } from '@/components/expense-item';
import { EmptyState } from '@/components/empty-state';
import { CategoryFilter } from '@/components/category-filter';
import { formatCurrency } from '@/utils/helpers';

export default function ExpenseListScreen() {
  const insets = useSafeAreaInsets();
  const {
    filteredExpenses,
    total,
    isInitialLoading,
    refreshing,
    error,
    searchQuery,
    selectedCategory,
    hasNoExpenses,
    setSearchQuery,
    onRefresh,
  } = useExpenses();

  const renderHeader = () => (
    <View>
      {/* Total Card */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>
          {selectedCategory ? `${selectedCategory} Expenses` : 'Total Expenses'}
        </Text>
        <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
        <Text style={styles.totalCount}>
          {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search expenses..."
          placeholderTextColor="#8e8e93"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {/* Category Filter */}
      <CategoryFilter />
    </View>
  );

  if (isInitialLoading) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Expenses</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a1a2e" />
          <Text style={styles.loadingText}>Loading expenses...</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expenses</Text>
      </View>

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          hasNoExpenses ? (
            <EmptyState
              icon="💰"
              title="No expenses yet"
              subtitle="Tap the + tab below to add your first expense and start tracking your spending."
            />
          ) : (
            <EmptyState
              icon="🔍"
              title="No results found"
              subtitle="Try adjusting your search or filter to find what you're looking for."
            />
          )
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#1a1a2e"
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      />
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
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: -0.5,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: '#8e8e93',
  },
  errorBanner: {
    backgroundColor: '#FFE5E5',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
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
  listContent: {
    paddingBottom: 100,
  },
});
