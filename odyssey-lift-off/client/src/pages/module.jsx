import { gql, useQuery } from '@apollo/client';

import { Layout, ModuleDetail, QueryResult } from '../components';

const GET_MODULE_AND_PARENT_TRACK = gql`
  query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`;

const Module = ({ trackId, moduleId }) => {
  const { loading, error, data } = useQuery(GET_MODULE_AND_PARENT_TRACK, {
    variables: {
      trackId,
      moduleId,
    },
  });

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        <ModuleDetail module={data?.module} track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Module;
