import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Recommendation = ({ show, genre }) => {
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
  });

  if (!show) {
    return null;
  }
  if (result.loading) {
    return <p>loading...</p>;
  }

  const booksByGenre = result.data.allBooks;

  return (
    <>
      <h3>recommendations</h3>
      <p>
        books in your favorite genre <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Recommendation;
