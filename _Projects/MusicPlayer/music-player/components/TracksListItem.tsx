import { View, StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { colors, fontSize } from '@/constants/tokens'

export type TracksListItemProps = {
  track: { title: string, image?: string }
}

const TracksListItem = ({ track }: TracksListItemProps) => {
  return (
    <TouchableHighlight>
      <View>
        <FastImage source={
          {
            uri: track.image ?? unknownTrackImageUri,
            priority: FastImage.priority.normal
          }
        } 
        style={{
            
        }}/>
      </View>
    </TouchableHighlight>
  )
}

export default TracksListItem

const styles = StyleSheet.create({
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
	trackPlayingIconIndicator: {
		position: 'absolute',
		top: 18,
		left: 16,
		width: 16,
		height: 16,
	},
	trackPausedIndicator: {
		position: 'absolute',
		top: 14,
		left: 14,
	},
	trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
})