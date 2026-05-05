import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DynamicTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        
        if (path === "/") {
            document.title = "Trendixa BD | Home";
        } else {
            const pageName = path.split("/")[1]; 
            if (pageName) {
                const title = pageName.charAt(0).toUpperCase() + pageName.slice(1);
                document.title = `${title} | Trendixa BD`;
            }
        }
    }, [location]);

    return null; 
};

export default DynamicTitle;