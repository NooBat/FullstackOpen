import { useState } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from '../queries';
import { uniqByAttributes } from '../utils';

const NewBook = ({ show, handleNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      console.log(error);
      handleNotification({
        message:
          error.graphQLErrors[0]?.message ||
          error.clientErrors[0]?.message ||
          'Unknown error',
        severity: 'error',
      });
    },
    update: (cache, { data }) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => ({
        allBooks: uniqByAttributes(
          allBooks.concat(data?.addBook?.book),
          'title'
        ),
      }));
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => ({
        allAuthors: uniqByAttributes(
          allAuthors.concat(data?.addBook?.book?.author),
          'id'
        ),
      }));
      cache.updateQuery({ query: ALL_GENRES }, ({ allGenres }) => ({
        allGenres: uniqByAttributes(
          allGenres.concat(...data.addBook.book.genres)
        ),
      }));
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
