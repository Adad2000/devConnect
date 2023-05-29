import {useState,useEffect} from 'react';
import axios from 'axios';

const useFetch = (endpoint,query)=>{
    const [data,setData]= useState([]);
    const [isLoading,setIsLoading]= useState(false);
    const [error,setError] = useState(null);

const options = {
  method: 'GET',
  url: `https://jsearch.p.rapidapi.com/${endpoint}`,
  params: {...query},
  headers: {
    'X-RapidAPI-Key':'5179b8f080msh7df6cb6fd4a4f21p1d8d15jsn845de66a222a',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
};

    const fetchData= async ()=>{
        setIsLoading(true);
        try{
            const response= await axios.request(options);
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