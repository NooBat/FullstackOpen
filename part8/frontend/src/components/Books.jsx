import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries';

import QueryResult from './QueryResult';

const Books = ({ show }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <h2>books</h2>

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

export default Books;
