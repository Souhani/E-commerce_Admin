import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    useEffect(()=>{
        setIsLoaded(false)
        axios.get('/api/orders')
        .then(response=> {
            setOrders(response.data);
            setIsLoaded(true)
        });
    },[]);
    return(
        <Layout>
            <h1>Orders</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>PAID</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoaded &&
                    <tr>
                        <td colspan="4">
                            <div className='py-4'>
                                <Spinner fullWidth={true}/>
                            </div>
                        </td>
                    </tr>
                    }
                    {
                        orders.length>0 && orders.map(order=> {
                            return(
                                <tr key={order._id}>
                                    <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                                    <td className={order.paid ? "text-green-400" : "text-red-400"}>
                                        {order.paid ? "YES" : "NO"}
                                    </td>
                                    <td>
                                        {order.name} {order.email}<br />
                                        {order.city} {order.postalCode} {order.country}<br />
                                        {order.streetAddress}
                                    </td>
                                    <td>
                                        {order.line_items.map(l => (
                                            <>
                                              {l.price_data.product_data.name} x {l.quantity} <br />
                                            </>
                                        ))}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </Layout>
    )
}