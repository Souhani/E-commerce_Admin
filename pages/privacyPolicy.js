import axios from "axios";
import Layout from "@/components/Layout";
import PrivacyPolicy from "@/components/privacyPolicy";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";

export default function PrivacyPolicyPage() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [data, setData] = useState(null);
  
    useEffect(() => {
      setIsLoaded(false)
      axios.get('/api/privacyPolicy').then(response => {
        setData(response.data);
        setIsLoaded(true)
      });
    }, [])
     return(
      <Layout>
        <h1>Privacy Policy:</h1>
       {
        data ? 
        <PrivacyPolicy data = {data} /> 
        : 
        <Spinner/>
       }
      </Layout>
     )
}
