import { useState } from 'react';

import { gql, useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries';
import QueryResult from '../components/QueryResult';

const ALL_GENRES = gql`
  query allGenres {
    allGenres {
      id
      name
    }
  }
`;

const Books = ({ show }) => {
  const [currentGenre, setCurrentGenre] = useState(null);
  const allGenresQuery = useQuery(ALL_GENRES);
  const allBooksQuery = useQuery(ALL_BOOKS, {
    skip: allGenresQuery.loading,
    variables: {
      genre: currentGenre,
    },
  });

  if (!show) {
    return null;
  }

  return (
    <QueryResult
      loading={allGenresQuery.loading}
      error={allGenresQuery.error}
      data={allGenresQuery.data}
    >
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
      </QueryResult>
      {allGenresQuery.data?.allGenres?.map(({ id, name }) => (
        <button key={id} type='button' onClick={() => setCurrentGenre(name)}>
          {name}
        </button>
      ))}
      <button type='button' onClick={() => setCurrentGenre(null)}>
        all genres
      </button>
    </QueryResult>
  );
};

export default Books;
