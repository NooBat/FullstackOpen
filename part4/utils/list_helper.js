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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
