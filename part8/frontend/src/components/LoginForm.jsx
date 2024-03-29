const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <label htmlFor='username'>
        username:{' '}
        <input
          type='text'
          name='username'
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        />
      </label>
    </div>
    <div>
      <label htmlFor='password'>
        password:{' '}
        <input
          type='password'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
    </div>
    <button type='submit'>log in</button>
  </form>
);

export default LoginForm;
