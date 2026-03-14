"use client";
import { useState, useCallback } from "react";

export const useFormValidation = (schema) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = useCallback((data) => {
    try {
      schema.parse(data);
      setErrors({});
      return { isValid: true, errors: {} };
    } catch (error) {
      if (error.errors) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          fieldErrors[path] = err.message;
        });
        setErrors(fieldErrors);
        return { isValid: false, errors: fieldErrors };
      }
      return { isValid: false, errors: {} };
    }
  }, [schema]);

  const validateField = useCallback((name, value) => {
    try {
      const fieldSchema = schema.shape[name];
      if (fieldSchema) {
        fieldSchema.parse(value);
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
        return true;
      }
    } catch (error) {
      if (error.errors) {
        setErrors((prev) => ({
          ...prev,
          [name]: error.errors[0]?.message,
        }));
        return false;
      }
    }
    return true;
  }, [schema]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  }, [validateField]);

  const clearError = useCallback((name) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const getFieldProps = useCallback((name) => ({
    name,
    error: errors[name],
    touched: touched[name],
    onBlur: handleBlur,
    onChange: (e) => clearError(name),
  }), [errors, touched, handleBlur, clearError]);

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    touched,
    validate,
    validateField,
    handleBlur,
    clearError,
    clearAllErrors,
    getFieldProps,
    isValid,
  };
};

export default useFormValidation;
