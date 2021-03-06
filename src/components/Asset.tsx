import React, { ReactElement } from 'react'
import { Text, View, Linking, TouchableHighlight, Alert } from 'react-native'
import { portalUri } from '../../config'
import { DDO } from '../utils/aquarius'
import removeMarkdown from 'remove-markdown'

import styles from '../css/asset'
import { formatDistance } from 'date-fns'

interface Metadata {
  attributes: {
    main: {
      dateCreated: string
      type: string
      author: string
      name: string
    }
    additionalInformation: {
      description: string
    }
  }
}

export default function Asset(asset: DDO): ReactElement {
  const metadata: Metadata = asset.service.find(
    (service) => service.type === 'metadata'
  )

  const { dateCreated, author, name } = metadata.attributes.main
  const { description } = metadata.attributes.additionalInformation

  return (
    <TouchableHighlight
      onPress={() =>
        Alert.alert(
          'Open Portal',
          `You are about to leave the app and view the asset "${name}" in the MVG portal.`,
          [
            {
              text: 'Proceed',
              onPress: () => Linking.openURL(`${portalUri}/asset/${asset.id}`)
            },
            { text: 'Stay' }
          ]
        )
      }
    >
      <View style={styles.asset}>
        <Text style={styles.headline}>{name}</Text>
        <Text style={styles.created}>
          Created{' '}
          {formatDistance(new Date(dateCreated), new Date(), {
            addSuffix: true
          })}{' '}
          by <Text style={styles.author}>{author}</Text>
        </Text>
        <Text style={styles.description} numberOfLines={5}>
          {removeMarkdown(description)}
        </Text>
      </View>
    </TouchableHighlight>
  )
}
