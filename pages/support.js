import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

export default function Products() {
  const [support, setSupport] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      setIsLoaded(false);
      axios.get("/api/support").then((response) => {
        setSupport(response.data);
        setIsLoaded(true);
      });
    }
  }, [session]);
  return (
    <Layout>
      {support.length>0 ? support.map((item, index) => (
        <div
          key={index}
          className="border p-5 rounded-lg shadow-md bg-white my-5"
        >
          <div className="p-2 flex gap-2 items-center">
            <label>Name:</label> <div className="font-semibold">{item.name}</div>
          </div>
          <div className="p-2 flex gap-2 items-center">
            <label>Email:</label> <div className="font-semibold">{item.email}</div>
          </div>
          <div className="p-2 flex gap-2 items-center">
            <label>Message:</label><div className="font-semibold"> 
            {item.message} </div>
          </div>
          <div className="w-full flex justify-end gap-10">
            <Link href={`/support/delete/${item._id}`} className=" p-2 flex gap-2 items-center cursor-pointer" >
              <FaCheck size={15}/>
              Mark as read
            </Link>
            <div>
            <a href={`mailto:${item?.email}`} className="p-2 flex gap-2 items-center cursor-pointer">
              <MdOutlineMailOutline size={15}/>
              send mail
              </a>
            </div>
          </div>
        </div>
      )): <h1>Currently, there are no messages to display.</h1>}
    </Layout>
  );
}
