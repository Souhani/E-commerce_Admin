import Layout from "@/components/Layout";
import Faq from "@/components/faq";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [faq, setFaq] = useState(null);

  useEffect(() => {
    setIsLoaded(false)
    axios.get('/api/faq').then(response => {
      setFaq(response.data);
      setIsLoaded(true)
    });
  }, [])
     return(
      <Layout>
         {!faq ? 
         <Spinner />
         :
        <Faq data={faq}/>
         }
      </Layout>
     )
}
