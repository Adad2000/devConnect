import { View, Text, TouchableOpacity,ActivityIndicator } from 'react-native'
import {useRouter} from 'expo-router';
import {COLORS} from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hook/useFetch';

import styles from './nearbyjobs.style'

const Nearbyjobs = () => {
  const router= useRouter()

  const {data, isLoading,error,sanityData}= useFetch(`*[_type == 'job']`)
  
  return (
    <View style= {styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' colors={COLORS.primary}/>
        )
        : error ?(
          <Text>Something went wrong</Text>
        )
        :(
          sanityData?.map((job)=>(
            <NearbyJobCard
              job={job}
              key={job._id}
              handleNavigate={()=> router.push(`/job-details/${job._id}`)}
            />
          ))
        )}

      </View>
    </View>
  )
}

export default Nearbyjobs