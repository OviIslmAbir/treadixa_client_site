import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import SignIn from './Pages/SignIn/SignIn.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import GadgetsAndElectronics from './Pages/GadgetsAndElectronics/GadgetsAndElectronics.jsx';
import Roots from './Roots/Roots.jsx';
import GadgetsDetails from './Pages/GadgetsDetails/GadgetsDetails.jsx';
import Bags from './Pages/BagsPage/Bags/Bags.jsx';
import BagDetails from './Pages/BagsPage/BagDetails/BagDetails.jsx';
import BeautyProducts from './Pages/BeautyPage/BeautyProducts/BeautyProducts.jsx';
import BeautyProductDetails from './Pages/BeautyPage/BeautyProductDetails/BeautyProductDetails.jsx';
import Watches from './Pages/WatchPage/Watches/Watches.jsx';
import WatchDetails from './Pages/WatchPage/WatchDetails/WatchDetails.jsx';
import { Toaster } from 'react-hot-toast';
import CartPage from './Pages/CartPage/Cartpage.jsx';
import { CartProvider } from './Components/Hooks/CartContext.jsx';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage.jsx';
import AuthProvider from './Components/AuthProvider/AuthProvider.jsx';
import Dashboard from './Pages/Admin/Dashboard/Dashboard.jsx';
import AddProduct from './Pages/Admin/AddProduct/AddProduct.jsx';
import AllOrders from './Pages/Admin/AllOrder/AllOrders.jsx';
import ManageItems from './Pages/Admin/ManageItems/ManageItems.jsx';
import AllUsers from './Pages/Admin/AllUsers/AllUsers.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import MyOrders from './Pages/MyOrders/MyOrders.jsx';
import SearchPage from './Components/SearchPage/SearchPage.jsx';
import ErrorPage from './Pages/ErrorPage/ErrorPage.jsx';
import About from './Pages/AboutUs/AboutUs.jsx';
import ContactUs from './Pages/CountactUs/CountactUs.jsx';
import UpdateProduct from './Pages/Admin/UpdateProduct/UpdateProduct.jsx';


const queryClient = new QueryClient()


const router = createBrowserRouter([
{
    path: "/",
    Component: Roots,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        Component: Home
      },
      {
        path: "/search", 
        element: <SearchPage />,
      },
      {
        path: "/cart",
        Component: CartPage
      },
      {
        path: "/checkout",
        Component: CheckoutPage 
      },
      {
        path: "/electronics",
        Component: GadgetsAndElectronics,
        loader: () => fetch('https://ecomerce-server-kohl.vercel.app/products?category=electronics')
      },
      {
        path: "/electronics/:id",
        Component: GadgetsDetails,
        loader: ({ params }) => fetch(`https://ecomerce-server-kohl.vercel.app/product/${params.id}`)
      },
      {
        path: "/bags",
        Component: Bags,
        loader: () => fetch('https://ecomerce-server-kohl.vercel.app/products?category=bags')
      },
      {
        path: "/bags/:id",
        Component: BagDetails,
        loader: ({params}) => fetch(`https://ecomerce-server-kohl.vercel.app/product/${params.id}`)
      },
      {
        path: "/beauty",
        Component: BeautyProducts,
        loader: () => fetch('https://ecomerce-server-kohl.vercel.app/products?category=beauty')
      },
      {
        path: "/beauty/:id",
        Component: BeautyProductDetails,
        loader: ({params}) => fetch(`https://ecomerce-server-kohl.vercel.app/product/${params.id}`)
      },
      {
        path: "/watch",
        Component: Watches,
        loader: () => fetch('https://ecomerce-server-kohl.vercel.app/products?category=wellness')
      },
      {
        path: "/watch/:id",
        Component: WatchDetails,
        loader: ({params}) => fetch(`https://ecomerce-server-kohl.vercel.app/product/${params.id}`)
      },
      {
        path: "/my-order",
        Component: MyOrders,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: ContactUs,
      },
    ]
  },
  { path: "/signIn", Component: SignIn },
  { path: "/signUp", Component: SignUp },
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage/>,
    children: [
      {  path: "all-orders", element: <AllOrders /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "manage-items", element: <ManageItems /> },
      { path: "all-users", element: <AllUsers /> },
      { path: "editProduct/:id", element: <UpdateProduct /> },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <CartProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <RouterProvider router={router} />
          </CartProvider>
      </AuthProvider>
      </QueryClientProvider>
  </StrictMode>,
)