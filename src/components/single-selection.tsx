import React from 'react';
import { Padding, Card, Flexbox, FlexCell, Text, Checkbox } from '@/ui';
import { useField } from 'formik';

const SingleSelection = ({ label, description, name, id, children }) => {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const isSelected = (v: string): boolean => v === value;

  return (
    <Padding top={12}>
      <Card borderColor={isSelected(id) && '#0957C3'}>
        <Padding size={24}>
          <Flexbox>
            <FlexCell>
              <Padding right={12}>
                <Checkbox isActive={isSelected(id)} onClick={() => setValue(id)} />
              </Padding>
            </FlexCell>
            <FlexCell>
              <Text>
                <strong>{label}</strong>
              </Text>
              <Padding y={12}>
                <Text>{description}</Text>
              </Padding>
              {children}
            </FlexCell>
          </Flexbox>
        </Padding>
      </Card>
    </Padding>
  );
};

export default SingleSelection;
