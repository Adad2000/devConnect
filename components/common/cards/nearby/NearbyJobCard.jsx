import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './nearbyjobcard.style'
import {checkImageURL} from '../../../../utils'
import { urlFor } from '../../../../hook/sanity'

const NearbyJobCard = ({job,handleNavigate}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri:job.employer_logo  ? urlFor(job.employer_logo).width(900).height(900).url():'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzOSH.jpg'
          }}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType}>{job.job_type}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard