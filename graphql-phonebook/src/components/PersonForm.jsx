import { useMutation } from '@apollo/client';

import { ADD_PERSON, ALL_PERSONS } from '../queries';
import { useField } from '../hooks';

const PersonForm = ({ setError }) => {
  const [nameField, resetNameField] = useField('text');
  const [streetField, resetStreetField] = useField('text');
  const [cityField, resetCityField] = useField('text');
  const [phoneField, resetPhoneField] = useField('text');

  const [createPerson] = useMutation(ADD_PERSON, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => ({
        allPersons: allPersons.concat(response.data.addPerson),
      }));
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    resetNameField();
    resetStreetField();
    resetCityField();
    resetPhoneField();

    createPerson({
      variables: {
        name: nameField.value,
        street: streetField.value,
        city: cityField.value,
        phone: phoneField.value.length > 0 ? phoneField.value : undefined,
      },
    });
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name <input {...nameField} />
        </div>
        <div>
          phone <input {...phoneField} />
        </div>
        <div>
          street <input {...streetField} />
        </div>
        <div>
          city <input {...cityField} />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default PersonForm;
