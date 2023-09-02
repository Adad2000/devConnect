import { Text, View, SafeAreaView,ActivityIndicator,RefreshControl, ScrollView } from "react-native"
import {Stack, useRouter,useSearchParams} from 'expo-router';
import {useCallback,useState} from 'react';

import { Company,JobAbout,JobFooter,JobTabs,ScreenHeaderBtn,Specifics } from "../../components";
import { COLORS,SIZES,icons } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs =["About","Qualifications", "Responsibilities"]

const JobDetails =()=>{
    const params= useSearchParams();
    const router= useRouter();
    const {data,isLoading,error,refetch,sanityData}= useFetch(`*[_type == 'job' && _id=='${params.id}']`)

    const [refreshing,setRefreshing]= useState(false);
    const [activeTab,setActiveTab]= useState(tabs[0])
    const onRefresh= useCallback(()=>{
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    },[])
    // console.log('sanity',sanityData[0].qualifications)
    const displayTabContent=()=>{
        switch (activeTab){
            case "Qualifications":
                return <Specifics
                    title="Qualifications"
                    points={sanityData[0].qualifications ?? ['N/A']}
                />
            case "About":
                return <JobAbout
                    info={sanityData[0].job_description ?? "No data provided"}
                />
            case "Responsibilities":
                return <Specifics
                    title="Responsibilities"
                    points={sanityData[0].responsibilities ?? ['N/A']}
                /> 
            default:
            break;
        }
    }

    return (
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor:COLORS.lightWhite},
                    headerShadowVisible:false,
                    headerBackVisible:false,
                    headerLeft:()=>(
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={()=>router.back()}
                        />),
                    headerRight:()=>(
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                        />
                    ),
                    headerTitle:''
                }}
            />
            <>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                    {isLoading?(
                        <ActivityIndicator size={'large'} color={COLORS.primary}/>
                    )
                    // : error ? (
                    //     <Text>Something went wrong</Text>
                    // )
                    : sanityData.length ===0 ?(
                        <Text>No data</Text>
                    ):(
                        <View style={{padding:SIZES.medium,paddingBottom:100}}>
                            <Company
                                companyLogo={sanityData[0].employer_logo}
                                jobTitle={sanityData[0].job_title}
                                companyName={sanityData[0].employer_name}
                                location={sanityData[0].job_location}
                            />
                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}   
                            />
                            {displayTabContent()}
                        </View>
                    )}
                </ScrollView>
                <JobFooter url={sanityData[0]?.job_link ?? 'https://careers.google.com/jobs/results'}/>
            </>
            
        </SafeAreaView>
    )
}

export default JobDetails