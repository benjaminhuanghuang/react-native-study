import { FlatList, View, Text } from 'react-native'
import React from 'react'

const TracksList = () => {
  return (
    <FlatList data={[]} renderItem={()=>null}>
      <Text>TracksList</Text>
    </FlatList>
  )
}

export default TracksList