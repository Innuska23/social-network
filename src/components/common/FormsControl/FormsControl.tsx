import React, { forwardRef, ForwardedRef } from "react";

import styles from "./FormsControl.module.css";

type FormControlProps = {
  input?: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: () => void;
  };
  meta?: {
    error: string;
    touched: boolean;
  };
  placeholder?: string;
  className?: string;
  children: React.ReactNode;
};

const FormControl = forwardRef(
  ({ input, meta, children }: FormControlProps, ref: ForwardedRef<HTMLDivElement>) => {
    const hasError = meta && meta.touched && meta.error;
    return (
      <div className={styles.formControl + " " + (hasError ? styles.error : "")} ref={ref}>
        <div>{children}</div>
        {hasError && <span>{meta.error}</span>}
      </div>
    );
  }
);

type InputProps = {
  field?: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: () => void;
  };
  meta?: {
    error: string;
    touched: boolean;
  };
  placeholder?: string;
  type?: string;
  className?: string;
};

export const Textarea = forwardRef(
  ({ field, meta, placeholder, className, ...restProps }: InputProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <FormControl input={field} meta={meta} placeholder={placeholder} className={className}>
        <textarea {...field} {...restProps} ref={ref} />
      </FormControl>
    );
  }
);

export const Input = forwardRef(
  ({ field, meta, placeholder, ...restProps }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <FormControl input={field} meta={meta} placeholder={placeholder}>
        <input {...field} {...restProps} ref={ref} />
      </FormControl>
    );
  }
);