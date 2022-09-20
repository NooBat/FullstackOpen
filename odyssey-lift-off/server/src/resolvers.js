const resolvers = {
  Query: {
    /* returns an array of Tracks that
     * will be used to populate
     * the homepage grid of our web client */
    tracksForHomepage: (_, __, { dataSources }) =>
      dataSources.trackAPI.getTracksForHomepage(),
    track: (_, { id }, { dataSources }) => dataSources.trackAPI.getTrack(id),
    module: (_, { id }, { dataSources }) => dataSources.trackAPI.getModule(id),
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) =>
      dataSources.trackAPI.getAuthor(authorId),
    modules: ({ id }, _, { dataSources }) =>
      dataSources.trackAPI.getTrackModules(id),
  },
};

module.exports = resolvers;
