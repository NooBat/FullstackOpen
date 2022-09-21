const resolvers = {
  Query: {
    /** returns an array of Tracks that
     * will be used to populate
     * the homepage grid of our web client */
    tracksForHomepage: (_, __, { dataSources }) =>
      dataSources.trackAPI.getTracksForHomepage(),
    /** returns a Track with the given id */
    track: (_, { id }, { dataSources }) => dataSources.trackAPI.getTrack(id),
    /** returns a Module with the given id */
    module: (_, { id }, { dataSources }) => dataSources.trackAPI.getModule(id),
  },
  Mutation: {
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const updatedTrack = await dataSources.trackAPI.incrementTrackViews(id);

        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track: updatedTrack,
        };
      } catch (err) {
        const errorMessage = 'Something went wrong';

        return {
          code: err.extensions.response.status,
          success: false,
          message: `${errorMessage}! Error: ${err.extensions.response.body}`,
          track: null,
        };
      }
    },
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) =>
      dataSources.trackAPI.getAuthor(authorId),
    modules: ({ id }, _, { dataSources }) =>
      dataSources.trackAPI.getTrackModules(id),
  },
};

module.exports = resolvers;
