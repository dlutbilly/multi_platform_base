import { View, Image } from '@tarojs/components'
import { Search } from '@nutui/icons-react-taro'
import './index.scss'

interface HeaderProps {
  title?: string
  showSearch?: boolean
  onSearchClick?: () => void
}

const Header: React.FC<HeaderProps> = ({ title, showSearch = true, onSearchClick }) => {
  return (
    <View className="header">
      <View className="header-content">
        {title && <View className="header-title">{title}</View>}
        {showSearch && (
          <View className="header-search" onClick={onSearchClick}>
            <Search size={20} color="#8c8c8c" />
            <View className="search-placeholder">Search services & products</View>
          </View>
        )}
      </View>
    </View>
  )
}

export default Header
