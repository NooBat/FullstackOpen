import { useState } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from '../queries';

const NewBook = ({ show, handleNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      handleNotification({
        message:
          error.graphQLErrors[0]?.message ||
          error.clientErrors[0]?.message ||
          'Unknown error',
        severity: 'error',
      });
    },
    onCompleted: (data) => {
      handleNotification({
        message: data.addBook.message,
        severity: 'success',
      });
    },
    refetchQueries: [{ query: ALL_BOOKS }],
    update: (cache, { data }) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        if (allAuthors.find((a) => a.id === data?.addBook?.book?.author.id)) {
          return { allAuthors };
        }

        return {
          allAuthors: allAuthors.concat(data?.addBook?.author),
        };
      });
      cache.updateQuery({ query: ALL_GENRES }, ({ allGenres }) => {
        data?.addBook?.book?.genres.forEach((g) => {
          if (!allGenres.find((cachedGenre) => g === cachedGenre)) {
            allGenres.push(g);
          }
        });

        return { allGenres };
      });
    },
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
