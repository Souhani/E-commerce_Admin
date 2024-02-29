import axios from "axios";
import Layout from "@/components/Layout";
import About from "@/components/about";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";

export default function AboutPage() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [aboutPage, setAboutPage] = useState(null);
  
    useEffect(() => {
      setIsLoaded(false)
      axios.get('/api/about').then(response => {
        setAboutPage(response.data);
        setIsLoaded(true)
      });
    }, [])
     return(
      <Layout>
        <h1>About Us:</h1>
       {
        aboutPage ? 
        <About data = {aboutPage} /> 
        : 
        <Spinner/>
       }
      </Layout>
     )
}
