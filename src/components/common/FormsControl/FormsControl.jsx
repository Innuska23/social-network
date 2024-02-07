import React, { forwardRef } from "react";
import styles from "./FormsControl.module.css";

const FormControl = forwardRef(({ input, meta, children }, ref) => {
  const hasError = meta && meta.touched && meta.error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
});

export const Textarea = forwardRef(({ input, meta, ...restProps }, ref) => {
  return (
    <FormControl input={input} meta={meta} ref={ref}>
      <textarea {...input} {...restProps} ref={ref} />
    </FormControl>
  );
});

export const Input = forwardRef(({ input, meta, ...restProps }, ref) => {
  return (
    <FormControl input={input} meta={meta} ref={ref}>
      <input {...input} {...restProps} ref={ref} />
    </FormControl>
  );
});

export default Textarea;
