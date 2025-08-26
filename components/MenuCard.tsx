import { MenuItem } from '@/type';
import { Image, TouchableOpacity } from 'react-native';

const MenuCard = ({ item }: { item: MenuItem }) => {
    
  return (
    <TouchableOpacity>
      <Image 
      source={{ uri: item.image_url }} 
      className="size-32 absolute -top-10" 
      resizeMode="contain"
      onError={(error) => console.log('Image error:', error.nativeEvent.error)}
      onLoad={() => console.log('Image loaded:', item.name)}
      />
    </TouchableOpacity>
  )
  
}

export default MenuCard