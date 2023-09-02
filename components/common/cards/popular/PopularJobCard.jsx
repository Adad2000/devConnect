import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './popularjobcard.style'
import {checkImageURL} from '../../../../utils'
import { urlFor } from '../../../../hook/sanity'

const PopularJobCard = ({item,selectedJob,handleCardPress}) => {
  return (
    <TouchableOpacity 
      style={styles.container(selectedJob,item)}
      onPress={()=> handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob,item)}>
        <Image
          source={{
            uri:item.employer_logo  ? urlFor(item.employer_logo).width(900).height(900).url():'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzOSH.jpg'
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
          {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob,item)}>
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_location}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PopularJobCard