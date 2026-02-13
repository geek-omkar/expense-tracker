import React, { memo } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

export interface SubmitButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const SubmitButton = memo(({ title, onPress, isLoading = false, disabled = false }: SubmitButtonProps) => (
  <TouchableOpacity
    style={[styles.submitButton, (isLoading || disabled) && styles.submitButtonDisabled]}
    onPress={onPress}
    disabled={isLoading || disabled}
    activeOpacity={0.8}
  >
    {isLoading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={styles.submitButtonText}>{title}</Text>
    )}
  </TouchableOpacity>
));

SubmitButton.displayName = 'SubmitButton';

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#1a1a2e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
