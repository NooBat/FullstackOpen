import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {
  const [filter, setFilter] = useState(null);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  });
  const allBooks = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const genres = new Set();
  const books = result.data.allBooks;
  allBooks.data.allBooks.forEach((book) => {
    book.genres.forEach((genre) => {
      genres.add(genre);
    });
  });

  return (
    <div>
      <h2>books</h2>

      {!filter ? (
        <p>
          <strong>all genres</strong>
        </p>
      ) : (
        <p>
          in genre <strong>{filter}</strong>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {[...genres].map((genre) => (
          <button key={genre} type='button' onClick={() => setFilter(genre)}>
            {genre}
          </button>
        ))}
        <button type='button' onClick={() => setFilter(null)}>
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
