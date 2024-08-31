import { FlatList, View, Text } from 'react-native'
import React from 'react'
//
import library from '@/assets/data/library.json';

const TracksList = () => {
  return (
    <FlatList data={library} renderItem={()=>null}>
      <Text>TracksList</Text>
    </FlatList>
  )
}

export default TracksList