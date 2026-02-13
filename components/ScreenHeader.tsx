import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

export const ScreenHeader = memo(({ title, subtitle }: ScreenHeaderProps) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>{title}</Text>
    {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
  </View>
));

ScreenHeader.displayName = 'ScreenHeader';

const styles = StyleSheet.create({
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
});
