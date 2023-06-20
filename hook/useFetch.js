import {useState,useEffect} from 'react';
import axios from 'axios';

const useFetch = (endpoint,query)=>{
    const [data,setData]= useState([]);
    const [isLoading,setIsLoading]= useState(false);
    const [error,setError] = useState(null);



    const fetchData= async ()=>{
        setIsLoading(true);
        try{
            const response= await axios.request();
            setData(response.data.data);
            setIsLoading(false);
        }catch(error){
            console.log(error)
            setError(error);
            alert('There was an error')
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        fetchData();
    },[]);
    const refectch=()=>{
        setIsLoading(true);
        fetchData();
    }

    return {data,isLoading,error,refectch}
}

export default useFetch;