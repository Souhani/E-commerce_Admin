import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage (){
    const router = useRouter();
    const [blogInfo, setBlogInfo] = useState();
    const {id} = router.query;

    useEffect( () => {
        if(!id){
            return;
        }
        axios.get('/api/blog?id='+id).then(response => {
            setBlogInfo(response.data)

        })
        
    }, [id]);


    function goBack(){
        router.push('/blog')
    }

    async function deleteBlog() {
        await axios.delete('/api/blog?id='+id);
        goBack()
    }
    return(
        <Layout>
            {
                blogInfo ?
                
                <div>
                    <h1 className="text-center">Do you really want to delete
                 &nbsp; &quot;{blogInfo?.title}&quot;?
            </h1>
            <div className="flex gap-2 justify-center ">
                <button onClick = {deleteBlog}
                        className="btn-red">Yes</button>
                <button className="btn-default"
                        onClick = {goBack}>No</button>
            </div>
                </div>:
                <div className="w-full flex justify-center mt-5">
                <Spinner /> 
            </div>
            }
            
        </Layout>
    )
}