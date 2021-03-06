import React, { ReactElement } from 'react'
import { Alert, Linking, Text, TouchableHighlight, View } from 'react-native'
import { title, tagline, portalUri } from '../../config'
import styles from '../css/header'

export default function Header(): ReactElement {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableHighlight
        onPress={() =>
          Alert.alert(
            'Open Portal',
            'Leave the App and navigate to the MVG Portal?',
            [
              {
                text: 'Yes',
                onPress: () => Linking.openURL(portalUri)
              },
              { text: 'No' }
            ]
          )
        }
      >
        <Text style={styles.desc}>{tagline}</Text>
      </TouchableHighlight>
    </View>
  )
}
