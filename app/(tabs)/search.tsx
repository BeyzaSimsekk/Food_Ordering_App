import CartButton from '@/components/CartButton'
import MenuCard from '@/components/MenuCard'
import { getCategories, getMenu } from '@/lib/appwrite'
//import seed from '@/lib/seed'
import useAppwrite from '@/lib/useAppwrite'
import { MenuItem } from '@/type'
import cn from "clsx"
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Search = () => {

  //const [isSeeding, setIsSeeding] = useState(false);

  const {category, query} = useLocalSearchParams<{query: string, category: string }>()

  const {data, refetch, loading} = useAppwrite({
    fn: getMenu,
    params:{category,query,limit: 6}
  });

  const { data: categories } = useAppwrite({
    fn: getCategories
  });

  useEffect(()=>{
    refetch({category, query, limit: 6});
  },[category, query]) //parametreler değiştiğinde refetch yap


  // const handleSeed = async () => {
  //   try {
  //     setIsSeeding(true);
  //     console.log("🌱 Seeding başladı...");
  //     await seed();
  //     Alert.alert("Başarılı", "Database seeding tamamlandı!");
  //     // Verileri yeniden yükle
  //     refetch({category, query, limit: 6});
  //   } catch (error) {
  //     console.error("Seed error:", error);
  //     Alert.alert("Hata", "Seeding sırasında bir hata oluştu.");
  //   } finally {
  //     setIsSeeding(false);
  //   }
  // };


  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList 
      data={data} 
      renderItem={({item, index})=>{
        //console.log(data);

        const isFirstRightColItem = index % 2 === 0;

        return (
          <View className={cn('flex-1 max-w-[48%]', !isFirstRightColItem ? "mt-10" : "mt-0")}>
            <MenuCard item={item as unknown as MenuItem}/>
          </View>
        )
      }}
      keyExtractor={(item)=>item.$id}
      numColumns={2}
      columnWrapperClassName='gap-7'
      contentContainerClassName='gap-7 px-5 pb-32' 
      ListHeaderComponent={()=>(
        <View className='my-5 gap-5'>
          <View className='flex-between flex-row w-full'>
            <View className='flex-start'>
              <Text className='small-bold uppercase text-primary'>Search</Text>
              <View className='flex-start flex-row gap-x-1 mt-0.5'>
                <Text className='paragraph-semibold text-dark-100'>Find your favorite food</Text>
              </View>
            </View>
            
            <CartButton/>
          </View>

          {/* Seed Button
          <TouchableOpacity
            onPress={handleSeed}
            disabled={isSeeding}
            className={cn(
              'bg-primary px-4 py-2 rounded-lg',
              isSeeding && 'opacity-50'
            )}
          >
            <Text className='text-white font-semibold text-center'>
              {isSeeding ? '🌱 Seeding...' : '🌱 Seed Database'}
            </Text>
          </TouchableOpacity> */}
          <Text>Search Input</Text>
          <Text>Filter</Text>
        </View>
      )}
      ListEmptyComponent={()=>!loading &&<Text>No results</Text>}
      />

    </SafeAreaView>
  )
}

export default Search