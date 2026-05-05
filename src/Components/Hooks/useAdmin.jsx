import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        if (!loading && user?.email) {
            fetch(`https://ecomerce-server-kohl.vercel.app/users/admin/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.isAdmin);
                    setIsAdminLoading(false);
                });
        }
    }, [user, loading]);
    return [isAdmin, isAdminLoading];
};
export default useAdmin;