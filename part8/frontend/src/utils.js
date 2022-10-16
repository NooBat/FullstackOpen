export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    const seen = new Set();
    return a.filter((item) => {
      const k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => ({
    allBooks: uniqByName(allBooks.concat(addedBook)),
  }));
};

export const uniqByAttributes = (a, attribute = undefined) => {
  const seen = new Set();
  return a.filter((item) => {
    const k = attribute ? item[attribute] : item;
    return seen.has(k) ? false : seen.add(k);
  });
};
