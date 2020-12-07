import React from 'react';
import { Padding, Title, Text } from '@/ui';
import FormItem from '../../components/form-item';

const Group = ({ group, fields }) => {
  const { title, description, fields: fieldIds } = group;
  return (
    <Padding size={40}>
      <Title size={24} as="h2">
        {title}
      </Title>

      <Text>{description}</Text>
      <Padding top={32}>
        {fieldIds.map((field) => {
          if (fields[field].parent) {
            return null;
          }
          const child = fields[fields[field].child];
          return <FormItem key={field} info={fields[field]} child={child} />;
        })}
      </Padding>
    </Padding>
  );
};

export default Group;
