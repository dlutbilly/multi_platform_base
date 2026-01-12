'''
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import GridMenu, { MenuItem } from '../index'

const mockItems: MenuItem[] = [
  { id: '1', title: 'Food', icon: '🍴', color: '#ff6b6b' },
  { id: '2', title: 'Travel', icon: '✈️', color: '#4ecdc4' },
]

describe('GridMenu Component', () => {
  it('should render all menu items', () => {
    render(<GridMenu items={mockItems} />)
    expect(screen.getByText('Food')).toBeInTheDocument()
    expect(screen.getByText('Travel')).toBeInTheDocument()
  })

  it('should call onItemClick with the correct item when clicked', () => {
    const onItemClick = jest.fn()
    render(<GridMenu items={mockItems} onItemClick={onItemClick} />)
    
    fireEvent.click(screen.getByText('Food'))
    expect(onItemClick).toHaveBeenCalledWith(mockItems[0])
    
    fireEvent.click(screen.getByText('Travel'))
    expect(onItemClick).toHaveBeenCalledWith(mockItems[1])
  })

  it('should apply the correct number of columns', () => {
    const { container } = render(<GridMenu items={mockItems} columns={3} />)
    const gridMenu = container.querySelector('.grid-menu')
    expect(gridMenu).toHaveStyle('grid-template-columns: repeat(3, 1fr)')
  })
})
'''
