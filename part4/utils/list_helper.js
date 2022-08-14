const dummy = () => 1;

const totalLikes = (blogs) =>
  blogs
    .map((blog) => blog.likes)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return {};
  }

  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));

  return blogs[blogs.findIndex((blog) => blog.likes === maxLikes)];
};

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return {};
  }

  const hashMap = {};
  blogs.forEach((blog) => {
    const author = blog.author;
    if (hashMap[author]) {
      hashMap[author] += 1;
    } else {
      hashMap[author] = 1;
    }
  });

  const authors = Object.keys(hashMap);

  const maxBlogs = Math.max(...authors.map((author) => hashMap[author]));
  const result = {
    author: authors.find((author) => hashMap[author] === maxBlogs),
    blogs: maxBlogs,
  };

  return result;
};

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return {};
  }

  const hashMap = {};
  blogs.forEach((blog) => {
    const author = blog.author;
    if (hashMap[author]) {
      hashMap[author] += blog.likes;
    } else {
      hashMap[author] = blog.likes;
    }
  });

  const authors = Object.keys(hashMap);

  const maxLikes = Math.max(...authors.map((author) => hashMap[author]));
  const result = {
    author: authors.find((author) => hashMap[author] === maxLikes),
    likes: maxLikes
  };

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
