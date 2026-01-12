
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Login from '../index';
import { useUserStore } from '@/store/userStore';
import * as UserAPI from '@/services/api/user';

// Mock the user API
jest.mock('@/services/api/user');
const mockedUserAPI = UserAPI as jest.Mocked<typeof UserAPI>;

describe('Login Page Integration Test', () => {
  beforeEach(() => {
    // Reset store and mocks before each test
    act(() => {
      useUserStore.setState({ user: null, token: null, isLoggedIn: false });
    });
    jest.clearAllMocks();
  });

  it('should allow a user to log in and update the user store', async () => {
    // Mock the login API response
    const mockLoginResponse = {
      token: 'fake-jwt-token',
      user: { id: '1', username: 'testuser', email: 'test@example.com' },
    };
    mockedUserAPI.login.mockResolvedValue({ code: 200, data: mockLoginResponse, message: 'Success' });

    render(<Login />);

    // Find form elements
    const usernameInput = screen.getByPlaceholderText('Email or Phone');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /Login/i });

    // Simulate user typing
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simulate form submission
    await act(async () => {
      fireEvent.click(loginButton);
    });

    // Assert that the login API was called with the correct credentials
    expect(mockedUserAPI.login).toHaveBeenCalledWith({ 
      username: 'testuser', 
      password: 'password123' 
    });

    // Assert that the user store has been updated
    const { user, token, isLoggedIn } = useUserStore.getState();
    expect(user).toEqual(mockLoginResponse.user);
    expect(token).toBe(mockLoginResponse.token);
    expect(isLoggedIn).toBe(true);
  });

  it('should show an error message on login failure', async () => {
    // Mock a failed login API response
    mockedUserAPI.login.mockRejectedValue(new Error('Invalid credentials'));

    render(<Login />);

    // Find form elements and submit
    const usernameInput = screen.getByPlaceholderText('Email or Phone');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    // Assert that the user store has not been updated
    const { user, isLoggedIn } = useUserStore.getState();
    expect(user).toBeNull();
    expect(isLoggedIn).toBe(false);
  });
});
