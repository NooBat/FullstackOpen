import { useQuery } from '@apollo/client';

import QueryResult from '../components/QueryResult';
import { ALL_BOOKS } from '../queries';

const Recommendations = ({ show, favouriteGenre }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: {
      genre: favouriteGenre,
    },
    skip: !(show && favouriteGenre),
  });

  if (!show) {
    return null;
  }

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <strong>{favouriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>{}</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </QueryResult>
  );
};

export default Recommendations;
