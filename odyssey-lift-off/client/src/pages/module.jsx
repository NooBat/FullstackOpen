import { gql, useQuery } from '@apollo/client';

import { Layout, QueryResult } from '../components';

const GET_MODULE = gql`
  query getModule($moduleId: ID!) {
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
  }
`;

const Module = ({ moduleId }) => {
  const { loading, error, data } = useQuery(GET_MODULE, {
    variables: {
      moduleId,
    },
  });

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        {data?.module}
      </QueryResult>
    </Layout>
  );
};

export default Module;
