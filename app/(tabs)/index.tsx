import { View }from 'react-native'
import React, { useMemo, useState } from 'react'
import {  Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import listingData from '@/assets/data/airbnb-listings.json'
import listingDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingsMap from '@/components/ListingsMap'
import ListingBottomSheet from '@/components/ListingBottomSheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Page = () => {
  const [category, setCategory] = useState('Tiny homes');
  const items = useMemo(() => listingData as any, []);
  const geoItems = useMemo(() => listingDataGeo, []);
  const onDataChanged = (category: string) => {
    setCategory(category);
  }

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1, marginTop: 80 }}>
        <Stack.Screen options={{
            header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
          }} 
        />

        {/* <Listings listings={items} category={category} /> */}
        <ListingsMap listings={geoItems} />
        <ListingBottomSheet listings={items} category={category} />
      </View>
    </GestureHandlerRootView>
  )
}

export default Page