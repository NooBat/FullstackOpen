const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Note = require('../models/note');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});
  await Note.insertMany(helper.initialNotes);
});

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');

    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');

    const contents = response.body.map((r) => r.content);

    expect(contents).toContain(
      'Browser can execute only Javascript',
    );
  });
});

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb();

    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    console.log(resultNote);
    console.log(noteToView);

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));
    console.log(processedNoteToView);

    expect(resultNote.body).toEqual(processedNoteToView);
  });
});

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8');

  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

  const contents = notesAtEnd.map((note) => note.content);
  expect(contents).toContain(
    'async/await simplifies making async calls',
  );
});

test('note without content is not added', async () => {
  const newNote = {
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

afterAll(() => {
  mongoose.connection.close();
});
