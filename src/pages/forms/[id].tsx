import React, { useState } from 'react';
import { Button, Box, Divider, Padding, Flexbox } from '@/ui';
import { Reset } from 'styled-reset';
import Group from '../../lib/layout/group';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

export default function FormsPage({ data }): JSX.Element {
  const { query } = useRouter();
  const [step, setStep] = useState(0); // base 0
  const [disable, setDisable] = useState(false);
  const [response, setResponse] = useState(null);

  const { id } = query;
  const { groups: groupsIds } = data.insurances[id];

  const { groups, fields } = data;
  const group = groups[groupsIds[step]];

  const next = (validateForm): void => {
    validateForm.then((errors) => {
      if (Object.keys(errors).length) {
        setDisable(false);
        return;
      }
      setStep(step + 1);
    });
  };

  const back = (): void => {
    setStep(step - 1);
    setDisable(true);
  };

  const fieldsInGroups = groupsIds
    .map((field) => groups[field].fields)
    .flat()
    .map((id) => fields[id])
    .reduce((acc, curr) => {
      acc[curr.fieldId] = curr.value;
      return acc;
    }, {});

  const requiredFieldsByGroup = group.fields.filter((field) => fields[field].required).map((f) => fields[f]);
  const numberFieldsByGroup = group.fields.filter((field) => fields[field].type === 'number').map((f) => fields[f]);

  return (
    <>
      <Reset />
      <Flexbox height="100vh" alignItems="center" justifyContent="center">
        <Box border={1} borderRadius={10} width={640}>
          {response ? (
            <code>{JSON.stringify(response, null, 2)}</code>
          ) : (
            <Formik
              initialValues={fieldsInGroups}
              onSubmit={(values) => {
                setResponse(values);
              }}
              validate={(values) => {
                const errors = {};
                numberFieldsByGroup.forEach((field) => {
                  const value = values[field.fieldId];
                  if (value !== '' && field.type === 'number' && !/^[0-9]+$/i.test(value)) {
                    errors[field.fieldId] = 'only numbers allowed';
                  }
                });

                requiredFieldsByGroup.forEach((field) => {
                  const value = values[field.fieldId];
                  if (value === '') {
                    errors[field.fieldId] = 'mandatory field';
                  }
                  /**
                   * Best way to handle it is preserving the API data on a state manager
                   *  and toggle the visibility field based on the checked option
                   */

                  if (values.questions && values.questions[3].checked && values.vacation === '') {
                    errors.vacation = 'mandatory field';
                  } else {
                    delete errors.vacation;
                  }
                });

                if (Object.keys(errors).length) {
                  setDisable(false);
                } else {
                  setDisable(true);
                }

                return errors;
              }}
            >
              {({ values, handleSubmit, validateForm }) => (
                <form onSubmit={handleSubmit}>
                  <Group group={group} fields={fields} />
                  <Divider />
                  <Padding top={20} x={40} bottom={40}>
                    <Flexbox alignItems="center" justifyContent={`${step === 0 ? 'flex-end' : 'space-between'}`}>
                      {step !== 0 && (
                        <Button type="button" onClick={back}>
                          Back
                        </Button>
                      )}
                      {step < groupsIds.length - 1 ? (
                        <Button type="button" disabled={!disable} onClick={() => next(validateForm(values))}>
                          Next
                        </Button>
                      ) : null}
                      {step === groupsIds.length - 1 ? (
                        <Button disabled={!disable} type="submit">
                          Finish
                        </Button>
                      ) : null}
                    </Flexbox>
                  </Padding>
                </form>
              )}
            </Formik>
          )}
        </Box>
      </Flexbox>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/form-fields');
  const data = await res.json();
  return { props: { data } };
}
