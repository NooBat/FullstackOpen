import { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import QueryResult from '../components/QueryResult';

const Authors = ({ show }) => {
  const [name, setName] = useState('default');
  const [born, setBorn] = useState('');
  const [editAuthor] = useMutation(EDIT_AUTHOR);
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (!show) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: {
        name,
        setBornTo: Number(born),
      },
    });

    setName('');
    setBorn('');
  };

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <h2>authors</h2>
      <section>
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <th>born</th>
              <th>books</th>
            </tr>
            {data?.allAuthors?.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <h2>set birthyear</h2>
      <section>
        <form onSubmit={handleSubmit}>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value='default' disabled hidden>
              ---choose author---
            </option>
            {data?.allAuthors?.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          <div>
            <label htmlFor='birth-year'>
              born:{' '}
              <input
                type='number'
                name='birth-year'
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </label>
          </div>
          <button type='submit'>update author</button>
        </form>
      </section>
    </QueryResult>
  );
};

export default Authors;
