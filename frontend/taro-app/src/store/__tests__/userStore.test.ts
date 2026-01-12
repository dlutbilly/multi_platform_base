'''
import { useUserStore } from '../userStore'
import { act } from '@testing-library/react'

describe('useUserStore', () => {
  beforeEach(() => {
    // Reset store before each test
    act(() => {
      useUserStore.setState({
        user: null,
        token: null,
        isLoggedIn: false,
      })
    })
  })

  it('should have correct initial state', () => {
    const { user, token, isLoggedIn } = useUserStore.getState()
    expect(user).toBeNull()
    expect(token).toBeNull()
    expect(isLoggedIn).toBe(false)
  })

  it('should set user and update isLoggedIn status', () => {
    const newUser = { id: '1', username: 'testuser', email: 'test@example.com' }
    act(() => {
      useUserStore.getState().setUser(newUser)
    })
    const { user, isLoggedIn } = useUserStore.getState()
    expect(user).toEqual(newUser)
    expect(isLoggedIn).toBe(true)
  })

  it('should set token', () => {
    const newToken = 'fake-token'
    act(() => {
      useUserStore.getState().setToken(newToken)
    })
    expect(useUserStore.getState().token).toBe(newToken)
  })

  it('should clear user, token and isLoggedIn status on logout', () => {
    // First, set a user and token
    const newUser = { id: '1', username: 'testuser', email: 'test@example.com' }
    act(() => {
      useUserStore.getState().setUser(newUser)
      useUserStore.getState().setToken('fake-token')
    })

    // Then, logout
    act(() => {
      useUserStore.getState().logout()
    })

    const { user, token, isLoggedIn } = useUserStore.getState()
    expect(user).toBeNull()
    expect(token).toBeNull()
    expect(isLoggedIn).toBe(false)
  })
})
'''
