import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = ({ show }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [changeAuthor] = useMutation(EDIT_AUTHOR);
  const result = useQuery(ALL_AUTHORS);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = [...result.data.allAuthors].sort(
    (a, b) => b.bookCount - a.bookCount
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    setName('');
    setBorn('');

    changeAuthor({
      variables: { name, setBornTo: Number(born) },
    });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>{}</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set Birthyear</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <select
              defaultValue='default'
              onChange={({ target }) => setName(target.value)}
            >
              <option value='default' disabled>
                choose author
              </option>
              {authors.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            born{' '}
            <input
              type='number'
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
