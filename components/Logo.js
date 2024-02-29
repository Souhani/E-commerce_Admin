import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";

export default function Logo() {
    return(
        <Link href={'/'} className="flex gap-3 items-center font-semibold">
               <LuLayoutDashboard  className="sm:text-[20px] text-[18px]"/> 
            <span className="sm:text-[20px] ">
                Admin Dashboard
            </span> 
        </Link>
    )
}