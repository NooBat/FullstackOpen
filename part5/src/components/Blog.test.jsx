import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Blog from './Blog';

describe('<Blog /> is rendered correctly and updated correctly', () => {
  test("initially only blog's title and author are rendered", () => {
    const blog = {
      title: 'Testing React Component',
      author: 'Daniel Nguyen',
      url: 'https://www.google.com',
      likes: 1,
    };

    const { container } = render(<Blog blog={blog} />);

    const defaultView = container.querySelector('.defaultView');
    const toggledView = container.querySelector('.toggledView');

    expect(defaultView).not.toHaveStyle('display: none');
    expect(toggledView).toHaveStyle('display: none');
  });

  test("when clicked 'view' button, blog's likes, url is shown", async () => {
    const blog = {
      title: 'Testing React Component',
      author: 'Daniel Nguyen',
      url: 'https://www.google.com',
      likes: 1,
    };

    const { container } = render(<Blog blog={blog} />);

    const defaultView = container.querySelector('.defaultView');
    const toggledView = container.querySelector('.toggledView');
    const button = screen.getByText('view');

    const user = userEvent.setup();
    await user.click(button);

    expect(defaultView).not.toHaveStyle('display: none');
    expect(toggledView).not.toHaveStyle('display: none');
  });

  test("when clicked the 'like' button twice, the event handler is called twice", async () => {
    const blog = {
      title: 'Testing React Component',
      author: 'Daniel Nguyen',
      url: 'https://www.google.com',
      likes: 1,
    };

    const mockHandler = jest.fn();

    render(<Blog blog={blog} updateLikes={mockHandler} />);

    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    const likeButton = screen.getByText('like');

    await user.click(viewButton);
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
