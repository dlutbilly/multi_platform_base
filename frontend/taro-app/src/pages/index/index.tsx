import { View, ScrollView } from '@tarojs/components'
import { useState } from 'react'
import Header from '../../components/Layout/Header'
import GridMenu, { MenuItem } from '../../components/GridMenu'
import ContentCard, { CardData } from '../../components/ContentCard'
import './index.scss'

const menuItems: MenuItem[] = [
  { id: '1', title: 'Food', icon: '🍴', color: '#ff6b6b', path: '/modules/food' },
  { id: '2', title: 'Travel', icon: '✈️', color: '#4ecdc4', path: '/modules/travel' },
  { id: '3', title: 'Fitness', icon: '💪', color: '#ffd93d', path: '/modules/fitness' },
  { id: '4', title: 'Events', icon: '📅', color: '#ff8787', path: '/modules/events' }
]

const contentCards: CardData[] = [
  {
    id: '1',
    title: 'Mountain Adventure',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    description: 'Explore the beauty of nature'
  },
  {
    id: '2',
    title: 'Delicious Food',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    description: 'Taste the world cuisine'
  },
  {
    id: '3',
    title: 'Fitness Journey',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    description: 'Start your healthy lifestyle'
  },
  {
    id: '4',
    title: 'City Exploration',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
    description: 'Discover urban culture'
  }
]

const Index = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('')

  const handleMenuClick = (item: MenuItem) => {
    setSelectedMenu(item.id)
    console.log('Menu clicked:', item)
  }

  const handleCardClick = (card: CardData) => {
    console.log('Card clicked:', card)
  }

  return (
    <View className="index-page">
      <Header showSearch onSearchClick={() => console.log('Search clicked')} />
      
      <ScrollView scrollY className="index-content">
        <GridMenu items={menuItems} columns={4} onItemClick={handleMenuClick} />
        
        <View className="content-section">
          <View className="section-title">Discover</View>
          <View className="content-grid">
            {contentCards.map((card) => (
              <View key={card.id} className="grid-item">
                <ContentCard data={card} onClick={handleCardClick} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Index
