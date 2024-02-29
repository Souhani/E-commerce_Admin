import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage (){
    const router = useRouter();
    const [supportInfo, setSupportInfo] = useState();
    const {id} = router.query;

    useEffect( () => {
        if(!id){
            return;
        }
        axios.get('/api/support?id='+id).then(response => {
            setSupportInfo(response.data)

        })
        
    }, [id]);

    function goBack(){
        router.push('/support')
    }

    async function deleteSupport() {
        await axios.delete('/api/support?id='+id);
        goBack()
    }
    return(
        <Layout>
            {supportInfo ? 
            <div>
                <h1 className="text-center">Do you really want to delete&nbsp;&quot;{supportInfo?.name}&quot; message?
            </h1>
            <div className="flex gap-2 justify-center ">
                <button onClick = {deleteSupport}
                        className="btn-red">Yes</button>
                <button className="btn-default"
                        onClick = {goBack}>No</button>
            </div>
            
            </div> :
             <div className="w-full flex justify-center mt-5">
             <Spinner /> 
         </div>}
        </Layout>
    )
}