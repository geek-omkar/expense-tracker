import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '@/utils/helpers';

export interface TotalCardProps {
  label: string;
  total: number;
  count: number;
}

export const TotalCard = memo(({ label, total, count }: TotalCardProps) => (
  <View style={styles.totalCard}>
    <Text style={styles.totalLabel}>{label}</Text>
    <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
    <Text style={styles.totalCount}>
      {count} expense{count !== 1 ? 's' : ''}
    </Text>
  </View>
));

TotalCard.displayName = 'TotalCard';

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
});
