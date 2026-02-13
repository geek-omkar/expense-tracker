import { EmptyState } from "@/components/empty-state";
import { ExpenseItem } from "@/components/expense-item";
import { ExpenseHeader } from "@/components/ExpenseHeader";
import { useExpenses } from "@/hooks/use-expenses";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


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

  // Local state for search input - updates immediately without waiting for store
  const [localSearch, setLocalSearch] = useState(() => searchQuery);

  // Handle search input change - update local state immediately, then store
  const handleSearchChange = useCallback(
    (text: string) => {
      setLocalSearch(text); // Update local state immediately for UI
      setSearchQuery(text); // Update store for filtering
    },
    [setSearchQuery]
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
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expenses</Text>
      </View>

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Header Component - Outside FlatList */}
      <ExpenseHeader
        selectedCategory={selectedCategory}
        total={total}
        expenseCount={filteredExpenses.length}
        searchValue={localSearch}
        onSearchChange={handleSearchChange}
      />

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        ListHeaderComponent={null}
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
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1a1a2e",
    letterSpacing: -0.5,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: "#8e8e93",
  },
  errorBanner: {
    backgroundColor: "#FFE5E5",
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 100,
  },
});
