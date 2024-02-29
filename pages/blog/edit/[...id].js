import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import BlogForm from "@/components/blogForm";
export default function EditBlogPage() {
    const [blogInfo, setBlogInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if (!id){
          return;
        }
        setIsLoading(false);
        axios.get('/api/blog?id='+id).then(response => {
            setBlogInfo(response.data);
            setIsLoading(true);
        });
    }, [id])
    return(
        <Layout>
            <h1>Edit Blog</h1>
            {!isLoading && <Spinner/>}
            {blogInfo && <BlogForm {...blogInfo}/>}
            
        </Layout>
    )
};