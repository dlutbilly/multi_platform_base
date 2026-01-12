'''
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../index'

describe('Header Component', () => {
  it('should render title when provided', () => {
    render(<Header title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should render search bar by default', () => {
    render(<Header />)
    expect(screen.getByText('Search services & products')).toBeInTheDocument()
  })

  it('should not render search bar when showSearch is false', () => {
    render(<Header showSearch={false} />)
    expect(screen.queryByText('Search services & products')).not.toBeInTheDocument()
  })

  it('should call onSearchClick when search bar is clicked', () => {
    const onSearchClick = jest.fn()
    render(<Header onSearchClick={onSearchClick} />)
    fireEvent.click(screen.getByText('Search services & products'))
    expect(onSearchClick).toHaveBeenCalledTimes(1)
  })
})
'''
