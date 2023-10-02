import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { DateFormat } from "@/lib/dateFormat";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function AdminsPage({swal}) {
    const [email, setEmail] = useState('');
    const [admins, setAdmins] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    
    async function addAdmin(ev) {
        ev.preventDefault()
        await axios.post('api/admins', {email})
        .then(response => {
            swal.fire({
                title: `Admin created!`,
                icon: 'success',
             });
             setEmail('');
             fetchAdmins()
        }).catch(
            err => {
                swal.fire({
                    title: `Error!`,
                    text: `${err.response.data.message}`,
                    icon: 'error',
                 }); 
            }
        );
    };
    async function deleteAdmin(admin) {
        await swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete admin ${admin.email}`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#5542F6',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
         }).then(async (result) => {
            if(result.isConfirmed){
                await axios.delete('api/admins/?id='+admin._id)
                .then(response => {
                    swal.fire({
                        title: `Admin deleted!`,
                        icon: 'success',
                     });
                     fetchAdmins();
                    })
            }
         })

    };
    async function fetchAdmins() {
        setIsLoaded(false)
        await axios.get('/api/admins')
        .then(response => {
            setAdmins(response.data);
            setIsLoaded(true);
        });
    };
    useEffect(() => { 
        fetchAdmins();
    },[]);

    return(
       <Layout>
          <h1>Admins</h1>
          <h2>Add new admin</h2>
          <form onSubmit={(ev) => addAdmin(ev)}>
            <div className="flex gap-2 ">
                <input type="email" 
                       className="mb-0" 
                       placeholder="google email"
                       value={email}
                       onChange={ev => setEmail(ev.target.value)}
                       >
                </input>
                <button type='submit' className='btn-primary whitespace-nowrap'>Add admin</button>
            </div>
          </form>
          <h2>Existing admins</h2>
          <table className="basic">
            <thead>
                <tr>
                    <th className="text-left">Admin Google Email</th>
                </tr>
            </thead>
            <tbody>
                {!isLoaded && 
                <tr>
                    <td colSpan={2}>
                        <div className="py-4">
                           <Spinner fullWidth={true} />
                        </div>
                    </td>
                </tr>}
                {admins.length>0 && admins.map(admin => {
                    return(
                        <tr>
                           <td>{admin.email}</td>
                           <td>{admin.createdAt && DateFormat(admin.createdAt)}</td>
                           <td><button className="btn-red" onClick={() => deleteAdmin(admin)}>Delete</button></td>
                        </tr>    
                    )
                })}
            </tbody>
          </table>
       </Layout>
    )
};

export default withSwal(({swal}) => {
    return (
    <AdminsPage swal={swal} />
    );
});