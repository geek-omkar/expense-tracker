import React, { memo } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

export interface FormFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  hint?: string;
}

export const FormField = memo(({ label, error, hint, ...inputProps }: FormFieldProps) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error ? styles.inputError : undefined]}
      placeholderTextColor="#c7c7cc"
      {...inputProps}
    />
    {hint && !error && <Text style={styles.hint}>{hint}</Text>}
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
));

FormField.displayName = 'FormField';

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
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1a1a2e',
    borderWidth: 1.5,
    borderColor: '#e5e5ea',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  hint: {
    fontSize: 13,
    color: '#8e8e93',
    marginTop: 6,
    marginLeft: 4,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 6,
    marginLeft: 4,
  },
});
