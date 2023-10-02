import axios from "axios"
import { useEffect, useState } from "react"
import Spinner from "./Spinner";
import { subHours } from "date-fns";

export default function HomeStats() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function fetchOrders() {
    setIsLoading(true)
    await axios.get('/api/orders')
    .then(res =>{ 
      setOrders(res.data);
  });
  setIsLoading(false);
 
}
  useEffect(() => {
    fetchOrders();
    },[]);
    if(isLoading) {
      return(
        <div className="my-4">
            <Spinner  fullWidth={true}/>
        </div>
      )
    }
  const ordersToday = orders.filter(order => new Date(order.createdAt) > subHours(new Date, 24));
  const ordersWeek = orders.filter(order => new Date(order.createdAt) > subHours(new Date, 24 * 7));
  const ordersMonth = orders.filter(order => new Date(order.createdAt) > subHours(new Date, 24 * 30));
  function calculeRevenue(totalOrders) {
    let sum = 0;
    totalOrders.forEach(order => {
      order.line_items.forEach(item => {
        sum += item.quantity * (item.price_data.unit_amount / 100);
      })
    })
    return '$'+Intl.NumberFormat('en-US').format(parseInt(sum));
  }
    return(
        <div className='mt-5'>
          <div className='mb-5'>
            <h1>Orders</h1>
            <div className="tiles-grid ">
                <div className="tile">
                  <h3 className='tile-title '>today</h3>
                  <div className="tile-value">{ordersToday.length}</div>
                  <div className="tile-desc">{ordersToday.length} orders today</div>
                </div>
                <div className="tile">
                  <h3 className='tile-title'>this week</h3>
                  <div className="tile-value">{ordersWeek.length}</div>
                  <div className="tile-desc">{ordersWeek.length} orders this week </div>
                </div>
                <div className="tile">
                  <h3 className='tile-title'>this month</h3>
                  <div className="tile-value">{ordersMonth.length}</div>
                  <div className="tile-desc">{ordersMonth.length} orders this month</div>
                </div>
            </div>
          </div>
          <div className='mb-5'>
           <h1>Revenue</h1>
           <div className="tiles-grid">
              <div className="tile">
                <h3 className='tile-title '>today</h3>
                <div className="tile-value">{calculeRevenue(ordersToday)}</div>
                <div className="tile-desc">{calculeRevenue(ordersToday)} revenue today</div>
               </div>
              <div className="tile">
                <h3 className='tile-title'>this week</h3>
                <div className="tile-value">{calculeRevenue(ordersWeek)}</div>
                <div className="tile-desc">{calculeRevenue(ordersWeek)} revenue this week</div>
              </div>
              <div className="tile">
                <h3 className='tile-title'>this month</h3>
                <div className="tile-value">{calculeRevenue(ordersMonth)}</div>
                <div className="tile-desc">{calculeRevenue(ordersMonth)} revenue this month</div>
              </div>
           </div>
          </div>
        </div>
    )
}