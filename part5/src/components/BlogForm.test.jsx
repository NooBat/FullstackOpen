import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('when created a new blog, the event handler createBlog is called once', async () => {
    const mockCreateBlog = jest.fn();
    const { container } = render(<BlogForm createBlog={mockCreateBlog} />);

    const user = userEvent.setup();

    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const urlInput = container.querySelector('#url');
    const button = container.querySelector('button');

    user.type(titleInput, 'testing react <BlogForm /> component...');
    user.type(authorInput, 'daniel nguyen');
    user.type(urlInput, 'https://www.google.com');

    await user.click(button);

    expect(mockCreateBlog.mock.calls).toHaveLength(1);
  });
});
