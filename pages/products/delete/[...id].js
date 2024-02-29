import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage (){
    const router = useRouter();
    const [productInfo, setProductInfo] = useState();
    const {id} = router.query;

    useEffect( () => {
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data)

        })
        
    }, [id]);


    function goBack(){
        router.push('/products')
    }

    async function deleteProduct() {
        await axios.delete('/api/products?id='+id);
        goBack()
    }
    return(
        <Layout>
            {productInfo ? 
            <div>
                <h1 className="text-center">Do you really want to delete
                 &nbsp; &quot;{productInfo?.title}&quot;?
            </h1>
            <div className="flex gap-2 justify-center ">
                <button onClick = {deleteProduct}
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