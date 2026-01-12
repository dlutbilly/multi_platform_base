import { View, Image } from '@tarojs/components'
import './index.scss'

export interface CardData {
  id: string
  title: string
  image: string
  description?: string
}

interface ContentCardProps {
  data: CardData
  onClick?: (data: CardData) => void
}

const ContentCard: React.FC<ContentCardProps> = ({ data, onClick }) => {
  return (
    <View className="content-card" onClick={() => onClick?.(data)}>
      <Image src={data.image} className="card-image" mode="aspectFill" />
      {data.description && (
        <View className="card-overlay">
          <View className="card-title">{data.title}</View>
        </View>
      )}
    </View>
  )
}

export default ContentCard
