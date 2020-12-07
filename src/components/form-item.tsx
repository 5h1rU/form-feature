import { Badge } from '@/ui';
import React from 'react';
import InputField from './input';
import MultipleSelection from './multiple-selection';
import SingleSelection from './single-selection';

interface Item {
  fieldId: string;
  description: string;
  label: string;
  type: string;
  error: string;
  visible: boolean;
  required: boolean;
  options?: any[];
}
interface FormItem {
  info: Item;
  child: number;
}

const FormItem: React.FC<FormItem> = ({ info, child }) => {
  const { fieldId, type, options } = info;
  switch (type) {
    case 'text':
    case 'number':
      return <InputField input={info} />;
    case 'multipleSelection':
      return <MultipleSelection name={fieldId} child={child} options={options} />;
    case 'singleSelection':
      return options.map((option) => (
        <SingleSelection
          id={option.id}
          name={fieldId}
          key={option.label}
          label={option.label}
          description={option.description}
        >
          {option.tag ? <Badge type="success">{option.tag}</Badge> : null}
        </SingleSelection>
      ));
    default:
      throw new Error('Please Insert a valid type');
  }
};

export default FormItem;
