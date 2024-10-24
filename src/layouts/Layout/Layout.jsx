import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import './Layout.css'

function Layout({products, carts, setToken}) {
    return ( 
        <div>
            <Header />
            <Navbar products={products} carts={carts} setToken={setToken}/>
            <Outlet />
            <Footer />
        </div>
     );
}

export default Layout