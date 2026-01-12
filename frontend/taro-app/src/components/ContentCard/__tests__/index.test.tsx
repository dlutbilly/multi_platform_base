'''
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ContentCard, { CardData } from '../index'

const mockData: CardData = {
  id: '1',
  title: 'Mountain Adventure',
  image: 'https://example.com/image.jpg',
  description: 'Explore the beauty of nature'
}

describe('ContentCard Component', () => {
  it('should render the card with title and image', () => {
    render(<ContentCard data={mockData} />)
    expect(screen.getByText('Mountain Adventure')).toBeInTheDocument()
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('should call onClick with the correct data when clicked', () => {
    const onClick = jest.fn()
    render(<ContentCard data={mockData} onClick={onClick} />)
    fireEvent.click(screen.getByText('Mountain Adventure'))
    expect(onClick).toHaveBeenCalledWith(mockData)
  })

  it('should not render description if not provided', () => {
    const dataWithoutDesc = { ...mockData, description: undefined }
    render(<ContentCard data={dataWithoutDesc} />)
    expect(screen.queryByText('Explore the beauty of nature')).not.toBeInTheDocument()
  })
})
'''
