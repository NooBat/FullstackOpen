const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sumOfLikes, blog) => sumOfLikes + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const mostFavorite = Math.max(...blogs.map((blog) => blog.likes));
  const favBlog = blogs[blogs.findIndex((blog) => blog.likes === mostFavorite)];

  const mostFavoriteBlog = {
    author: favBlog.author,
    likes: favBlog.likes,
    title: favBlog.title,
    url: favBlog.url,
  };

  return mostFavoriteBlog;
};

const mostBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const authors = blogs.reduce((arrayOfAuthors, blog) => {
    if (arrayOfAuthors.length > 0) {
      const index = arrayOfAuthors.findIndex((a) => a.author === blog.author);
      if (index > -1) {
        const oldLog = arrayOfAuthors[index];

        const updatedLog = {
          author: oldLog.author,
          blogs: oldLog.blogs + 1,
        };

        return arrayOfAuthors.filter((author) => author !== oldLog).concat(updatedLog);
      }
    }

    const newLog = {
      author: blog.author,
      blogs: 1,
    };

    return arrayOfAuthors.concat(newLog);
  }, []);

  const authorWithMostBlogs = Math.max(...authors.map((author) => author.blogs));

  return authors.find((author) => author.blogs === authorWithMostBlogs);
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const authors = blogs.reduce((arrayOfAuthors, blog) => {
    if (arrayOfAuthors.length > 0) {
      const index = arrayOfAuthors.findIndex((a) => a.author === blog.author);
      if (index > -1) {
        const oldLog = arrayOfAuthors[index];

        const updatedLog = {
          author: oldLog.author,
          likes: oldLog.likes + blog.likes,
        };

        return arrayOfAuthors.filter((log) => log !== oldLog).concat(updatedLog);
      }
    }

    const newLog = {
      author: blog.author,
      likes: blog.likes,
    };

    return arrayOfAuthors.concat(newLog);
  }, []);

  const maximumNumberOfLikes = Math.max(...authors.map((author) => author.likes));
  return authors.find((author) => author.likes === maximumNumberOfLikes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes,
};
