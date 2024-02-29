import axios from "axios";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import TermsOfUse from "@/components/termsOfUse";

export default function TermsOfUsePage() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [termsPage, setTermsPage] = useState(null);
  
    useEffect(() => {
      setIsLoaded(false)
      axios.get('/api/termsOfUse').then(response => {
        setTermsPage(response.data);
        setIsLoaded(true)
      });
    }, [])
     return(
      <Layout>
        <h1>Terms of use:</h1>
       {
        termsPage ? 
        <TermsOfUse data = {termsPage} /> 
        : 
        <Spinner/>
       }
      </Layout>
     )
}
