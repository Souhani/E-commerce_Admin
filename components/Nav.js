import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./Logo";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineContactPage } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { BsCardText } from "react-icons/bs";


export default function Nav ({show}) {

    const inactiveLink = "flex gap-1 p-1 py-2";
    const activeLink = inactiveLink + " py-2 text-primary bg-gray-100 text-black rounded-sm";
    const inactiveIcon = "w-6 h-6";
    const activeIcon = inactiveIcon + " text-primary"
    const router = useRouter();

    async function logout() {
        await router.push('/');
        signOut();
    }
    return (
        <aside className={(show? "left-0 ": "-left-full ") + "text-blue-950 min-h-screen p-4 fixed bg-white w-full top-0 md:static md:w-auto transition-all"}>
            <div className= 'mb-4 mr-4'>
                <Logo />
            </div>
            <nav className="flex flex-col gap-2">
                <Link href={'/'} className={ (router.pathname==="/" || router.pathname.includes("/product")  ) ? activeLink : inactiveLink}>
                    <svg className={router.pathname === "/" ? activeIcon : inactiveIcon}
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>

                        Products
                </Link>

                <Link href={'/blog'} className={ router.pathname.includes("/blog") ? activeLink : inactiveLink}>
                    <div >
                   <BsCardText size={25} className={router.pathname === "/blog" ? activeIcon : inactiveIcon}/>
                   </div>

                        Blog
                </Link>

                <Link href={'/faq'} className={ router.pathname.includes("/faq") ? activeLink : inactiveLink}>
                   <div >
                   <IoIosHelpCircleOutline size={25} className={router.pathname === "/faq" ? activeIcon : inactiveIcon}/>
                   </div>

                        FAQ
                </Link>
                <Link href={'/about'} className={ router.pathname.includes("/about") ? activeLink : inactiveLink}>
                   <div >
                   <MdOutlineContactPage size={25} className={router.pathname === "/about" ? activeIcon : inactiveIcon}/>
                   </div>

                        About Page
                </Link>
                <Link href={'/privacyPolicy'} className={ router.pathname.includes("/privacyPolicy") ? activeLink : inactiveLink}>
                   <div >
                   <MdOutlinePrivacyTip size={25} className={router.pathname === "/privacyPolicy" ? activeIcon : inactiveIcon}/>
                   </div>

                        Privacy Policy Page
                </Link>
                <Link href={'/termsOfUse'} className={ router.pathname.includes("/termsOfUse") ? activeLink : inactiveLink}>
                   <div >
                   <LuClipboardList size={25} className={router.pathname === "/termsOfUse" ? activeIcon : inactiveIcon}/>
                   </div>

                        Terms Of Use Page
                </Link>
                <Link href={'/support'} className={ router.pathname.includes("/support") ? activeLink : inactiveLink}>
                   <div >
                   <LuClipboardList size={25} className={router.pathname === "/support" ? activeIcon : inactiveIcon}/>
                   </div>

                        Support
                </Link>
                <Link href={'/admins'} className={ router.pathname.includes("/admins") ? activeLink : inactiveLink}>
                    <svg className={router.pathname === "/admins" ? activeIcon : inactiveIcon}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                        Admins
                </Link>
                <button  className={inactiveLink}
                          onClick={logout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                        Logout
                </button>
                
            </nav>
            

        </aside>
    )
}
