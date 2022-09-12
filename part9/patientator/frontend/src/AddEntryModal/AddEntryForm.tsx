import { Button, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';

import {
  DiagnosisSelection,
  SelectField,
  TextField,
} from '../components/FormField';
import { useStateValue } from '../state';
import {
  EntryFormValues,
  HealthCheckRating,
  HealthRatingOption,
  TypeOption,
} from '../types';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: 'HealthCheck', label: 'HealthCheck' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'OccupationalHealthcare' },
];

const healthRatingOptions: HealthRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
  { value: HealthCheckRating.HighRisk, label: 'High Risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const renderFormOnType = (type: string) => {
    switch (type) {
      case 'HealthCheck':
        return (
          <SelectField
            label='Health Rating'
            name='healthCheckRating'
            options={healthRatingOptions}
          />
        );
      case 'Hospital':
        return (
          <>
            <p style={{ margin: '10px 0' }}>
              <i>Discharge</i>
            </p>
            <Field
              component={TextField}
              label='Discharge Date'
              name='discharge.date'
              placeholder='YYYY-MM-DD'
            />
            <Field
              component={TextField}
              label='Criteria'
              name='discharge.criteria'
            />
          </>
        );
      case 'OccupationalHealthcare':
        return (
          <>
            <Field component={TextField} label='Employer' name='employerName' />
            <p style={{ margin: '10px 0' }}>
              <i>Sick Leave</i>
            </p>
            <Field
              component={TextField}
              label='Start Date'
              name='sickLeave.startDate'
            />
            <Field
              component={TextField}
              label='End Date'
              name='sickLeave.endDate'
            />
          </>
        );
      default:
        throw new Error(`Unhandled discriminated union type: ${type}`);
    }
  };

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: 'Hospital',
        discharge: {
          date: '',
          criteria: '',
        },
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};

        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
      }}
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue, values }) => (
        <Form className='form ui'>
          <SelectField label='Type' name='type' options={typeOptions} />
          <Field
            component={TextField}
            label='Date'
            name='date'
            placeholder='YYYY-MM-DD'
          />
          <Field
            component={TextField}
            label='Description'
            name='description'
            placeholder='Description'
          />
          <Field
            component={TextField}
            label='Specialist'
            name='specialist'
            placeholder='Specialist'
          />
          {renderFormOnType(values.type)}
          <DiagnosisSelection
            diagnoses={Object.values(diagnoses)}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
          />
          <Grid>
            <Grid item>
              <Button
                color='secondary'
                variant='contained'
                style={{ float: 'left' }}
                type='button'
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: 'right',
                }}
                type='submit'
                variant='contained'
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddEntryForm;
