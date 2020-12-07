import { Field, Input, Padding } from '@/ui';
import { useFormikContext } from 'formik';
import React from 'react';

const InputField = ({ input }) => {
  const { values, handleChange, errors } = useFormikContext();
  const { fieldId, label, description, type, required } = input;

  return (
    <Padding bottom={12}>
      <Field fieldId={fieldId} label={label} error={errors[fieldId]}>
        <Input
          value={values[fieldId]}
          name={fieldId}
          fieldId={fieldId}
          placeholder={description}
          type={type}
          isRequired={required}
          onChange={handleChange}
        />
      </Field>
    </Padding>
  );
};

export default InputField;
