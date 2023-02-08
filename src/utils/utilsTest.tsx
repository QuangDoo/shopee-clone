import { render, screen, waitFor, type waitForOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from 'src/App';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';

const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {};
  await waitFor(
    async () => {
      expect(await delay(timeout - 100)).toBe(true);
    },
    {
      ...options,
      timeout
    }
  );
  screen.debug(body, 99999999);
};

export const renderWithRoute = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(<App />, { wrapper: BrowserRouter })
  };
};
