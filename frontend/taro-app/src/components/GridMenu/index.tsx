import { View } from '@tarojs/components'
import './index.scss'

export interface MenuItem {
  id: string
  title: string
  icon: string
  color: string
  path?: string
}

interface GridMenuProps {
  items: MenuItem[]
  columns?: number
  onItemClick?: (item: MenuItem) => void
}

const GridMenu: React.FC<GridMenuProps> = ({ items, columns = 4, onItemClick }) => {
  return (
    <View className="grid-menu" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {items.map((item) => (
        <View
          key={item.id}
          className="grid-menu-item"
          onClick={() => onItemClick?.(item)}
        >
          <View className="item-icon" style={{ backgroundColor: item.color }}>
            <View className="icon-text">{item.icon}</View>
          </View>
          <View className="item-title">{item.title}</View>
        </View>
      ))}
    </View>
  )
}

export default GridMenu
