import { useState } from 'react';

import { useQuery } from '@apollo/client';

import { ALL_BOOKS, ALL_GENRES } from '../queries';
import QueryResult from '../components/QueryResult';

const Books = ({ show }) => {
  const [currentGenre, setCurrentGenre] = useState(null);
  const allBooksQuery = useQuery(ALL_BOOKS, {
    variables: {
      genre: currentGenre,
    },
  });
  const allGenresQuery = useQuery(ALL_GENRES, {
    skip: allBooksQuery.loading,
  });

  if (!show) {
    return null;
  }

  return (
    <QueryResult
      loading={allBooksQuery.loading}
      error={allBooksQuery.error}
      data={allBooksQuery.data}
    >
      <h2>books</h2>
      {currentGenre ? (
        <p>
          in genre <strong>{currentGenre}</strong>
        </p>
      ) : (
        <p>
          <strong>all genres</strong>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th>{}</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooksQuery.data?.allBooks?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenresQuery.data?.allGenres?.map((genre) => (
        <button
          key={genre}
          type='button'
          onClick={() => setCurrentGenre(genre)}
        >
          {genre}
        </button>
      ))}
      <button type='button' onClick={() => setCurrentGenre(null)}>
        all genres
      </button>
    </QueryResult>
  );
};

export default Books;
