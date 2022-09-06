import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { useField } from '../hooks';

import { EDIT_NUMBER } from '../queries';

const PhoneForm = ({ setError }) => {
  const [nameField, resetNameField] = useField('text');
  const [phoneField, resetPhoneField] = useField('text');

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  const handleSubmit = (event) => {
    event.preventDefault();
    resetNameField();
    resetPhoneField();

    changeNumber({
      variables: { name: nameField.value, phone: phoneField.value },
    });
  };

  useEffect(() => {
    if (result.data && !result.data.editNumber) {
      setError('name not found');
    }
  }, [result.data]);

  return (
    <>
      <h2>Change Number</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name <input {...nameField} />
        </div>
        <div>
          phone <input {...phoneField} />
        </div>
        <button type='submit'>change</button>
      </form>
    </>
  );
};

export default PhoneForm;
