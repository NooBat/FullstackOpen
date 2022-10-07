const QueryResult = ({ loading, error, data, children }) => {
  if (loading) {
    return (
      <p style={{ textAlign: 'center', fontSize: '2rem' }}>
        <strong>Loading...</strong>
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: 'center', color: 'red' }}>
        ERROR: {error.message}
      </p>
    );
  }

  return data ? (
    children
  ) : (
    <p style={{ textAlign: 'center' }}>Nothing to show here...</p>
  );
};

export default QueryResult;
