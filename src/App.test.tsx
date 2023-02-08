import { describe, test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';
import { logScreen, renderWithRoute } from './utils/utilsTest';
import { path } from './constants';

expect.extend(matchers);

describe('App', () => {
  test('App render and navigate', async () => {
    const { user } = renderWithRoute();

    // waitFor sẽ run callback một vài lần
    // cho đến khi hết timeout
    // số lần run phụ thuộc vào timeout và interval
    // mặc định: timeout = 1000ms và interval = 50ms
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone');
    });

    //   verify chuyển sang trang login
    await user.click(screen.getByText(/Đăng nhập/i));
    await waitFor(() => {
      expect(screen.getByText('Bạn chưa có tài khoản?')).toBeInTheDocument();
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone');
    });
  });
  // Test về trang not found
  test('Test về trang not found', async () => {
    const badRoute = '/some/bad/route';
    renderWithRoute({ route: badRoute });

    await waitFor(() => {
      expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    });

    // await logScreen();
  });

  // Test về trang register
  test('Test về trang register', async () => {
    renderWithRoute({ route: path.register });

    await waitFor(() => {
      expect(screen.getByText('Bạn đã biết đến Shopee fake?')).toBeInTheDocument();
    });
  });
});
