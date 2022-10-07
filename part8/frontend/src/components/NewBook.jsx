import { useState } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries';

const NewBook = ({ show, handleNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) =>
      handleNotification({
        message: error.graphQLErrors[0].message,
        severity: 'error',
      }),
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres,
      },
      update: (cache, { data }) => {
        cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => ({
          allBooks: allBooks.concat(data?.addBook),
        }));
        cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
          if (allAuthors.find((a) => a.id === data?.addBook?.author.id)) {
            return {
              allAuthors,
            };
          }

          return {
            allAuthors: allAuthors.concat(data?.addBook?.author),
          };
        });
      },
    });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <form onSubmit={submit}>
      <div>
        title
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        published
        <input
          type='text'
          value={published}
          onChange={({ target }) => setPublished(target.value)}
        />
      </div>
      <div>
        <input
          value={genre}
          onChange={({ target }) => setGenre(target.value)}
        />
        <button onClick={addGenre} type='button'>
          add genre
        </button>
      </div>
      <div>genres: {genres.join(' ')}</div>
      <button type='submit'>create book</button>
    </form>
  );
};

export default NewBook;
