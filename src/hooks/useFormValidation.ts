import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation(rules: ValidationRules) {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = useCallback((name: string, value: any): string | null => {
    const rule = rules[name];
    if (!rule) return null;

    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return 'This field is required';
    }

    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
      return `Must be no more than ${rule.maxLength} characters`;
    }

    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return 'Invalid format';
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [rules]);

  const validateForm = useCallback((data: any): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, data[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rules, validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
  };
}