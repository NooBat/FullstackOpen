let token = null;

function setUser(user) {
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
  token = user.token;
}

function getUser() {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    token = user.token;
    return user;
  }

  return null;
}

function clearUser() {
  window.localStorage.removeItem('loggedBlogAppUser');
  token = null;
}

function getToken() {
  return token;
}

export default {
  setUser,
  getUser,
  clearUser,
  getToken,
};
