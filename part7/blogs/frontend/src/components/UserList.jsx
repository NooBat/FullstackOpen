import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const selectUsers = (state) => state.users;

const UserList = () => {
  const users = useSelector(selectUsers);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>{}</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
