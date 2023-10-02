import { useSession } from "next-auth/react";

export  default function HomeHeader() {
    const {data: session} = useSession();
   return(
    <div className="flex justify-between text-blue-900">
     <h2 className="mt-0">
      <div className="flex gap-2 items-center">
        <div className="sm:hidden">
          <img src={session?.user?.image} alt="" className="w-6 h-6 rounded-md"/>
        </div>
        <div>
            Hello, <b>{session?.user?.name}</b>
        </div>
      </div>
      </h2>
          <div className="hidden sm:block">
            <div className="flex text-black gap-1 bg-gray-300 rounded-lg overflow-hidden">
              <img src={session?.user?.image} alt="" className="w-6 h-6"/>
              <span className="px-2">{session?.user?.name}</span>
            </div>
          </div>
     </div>
   )
}