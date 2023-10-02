import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function SettingsPage({swal}) {
    const [products, setProducts] = useState([]);
    const [featruedProduct, setFeatruedProduct] = useState('');
    const [shippingFee, setSheppingFee] = useState('');
    const [isLoading, setisLoading] = useState(false);
    useEffect(() => {
        fetchData();
    },[])
    async function saveSttings() {
        setisLoading(true)
        await axios.put('/api/settings', {
            name: 'featuredProduct',
            value: featruedProduct,
        });
        await axios.put('/api/settings', {
            name: 'shippingFee',
            value: shippingFee,
        });
        setisLoading(false);
        await swal.fire({
            title: 'saved',
            icon: "success",
        });
    };
    async function fetchData() {
       setisLoading(true)
       await axios.get('api/products')
       .then(response => setProducts(response.data));
       await axios.get('/api/settings/?name=featuredProduct')
       .then(response => setFeatruedProduct(response.data.value));
       await axios.get('/api/settings/?name=shippingFee')
       .then(response => setSheppingFee(response.data?.value || ''));
       await
        setisLoading(false);
    }
    return(
        <Layout>
            <h1>Settings</h1>
            {isLoading && <Spinner />}
            {!isLoading && products.length>0 &&
            <>
                <label>Featured product</label>
                <select value={featruedProduct} onChange={(ev) => setFeatruedProduct(ev.target.value)}>
                    {products.length>0 && products.map(product => {
                        return(
                            <option key={product._id} value={product._id}>{product.title}</option>
                        )
                    })}
                </select>
                <label>shipping price (in usd)</label>
                <input type='number' value={shippingFee} onChange={ev => setSheppingFee(ev.target.value)}/>
                <div>
                <button onClick={saveSttings} className="btn-primary">Save settings</button>
                </div>
            </>}
        </Layout>
    )
};

export default withSwal(({swal}) => {
    return(
        <SettingsPage  swal={swal}/>
    )
})