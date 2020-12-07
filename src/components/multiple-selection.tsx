import React from 'react';
import { CheckboxRow } from '@/ui';
import { useField } from 'formik';
import FormItem from './form-item';

const MultipleSelection = (props) => {
  const { options, child, name } = props;
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const checkBoxes = options.map((option) => (
    <div key={option.id}>
      <CheckboxRow
        isActive={value[option.id]?.checked}
        label={option.label}
        onClick={() => setValue({ ...value, [option.id]: { checked: !value[option.id]?.checked } })}
      />
    </div>
  ));
  return (
    <>
      {checkBoxes}
      {child && value['3'].checked ? <FormItem info={child} child={null} /> : null}
    </>
  );
};

export default MultipleSelection;
