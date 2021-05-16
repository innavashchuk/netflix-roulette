import * as React from 'react';
import { useField } from 'formik';
import './input-text-field.scss';

export interface InputTextFieldProps {
    label: string,
    name: string,
    disabled?: boolean,
    type: string,
    className?: string,
    value: string | number,
    placeholder?: string,
    onChange?: (e: React.ChangeEvent<any>) => void
}

export const InputTextField = ({ label, disabled, ...props }: InputTextFieldProps): React.ReactElement => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.name} className="form-label">{label}</label>
        <input
            className={`form-input${!disabled && meta.touched && meta.error ? ' invalid-field' : ''}${disabled ? ' disabled' : ''}`}
            aria-label={label}
            {...field}
            {...props}
            />
        {meta.touched && meta.error && !disabled ?
          <div className="validation-error-display">{meta.error}</div>
         : null}
      </>
    );
  };
