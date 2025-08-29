import { MenuItem } from '@/type';
import cn from "clsx";
import { Image, Platform, Text, TouchableOpacity } from 'react-native';

const MenuCard = ({ item }: { item: MenuItem }) => {
    
  return (
    <TouchableOpacity className='menu-card' style={Platform.OS==='android'?{elevation:10, shadowColor:'#878787'}:{}}>
      <Image 
      source={{ uri: item.image_url }} 
      className="size-32 absolute -top-10" 
      resizeMode="contain"
      onError={(error) => console.log('Image error:', error.nativeEvent.error)}
      //onLoad={() => console.log('Image loaded:', item.name)}
      />
      <Text className='text-center base-bold text-dark-100 mb-2' numberOfLines={1}>{item.name}</Text>
      <Text className='body-regular text-gray-200 mb-4'>From ${item.price}</Text>
      <TouchableOpacity onPress={()=>{}} className={cn('bg-primary px-4 py-2 rounded-xl')}>
        <Text className='paragraph-bold text-white'>Add to Cart +</Text>
        
      </TouchableOpacity>
    </TouchableOpacity>
  )
  
}

export default MenuCard