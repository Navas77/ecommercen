import { createContext, useEffect, useState } from "react";
// import {products} from '../assets/assets'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


//here we can use export  so this is use in any component
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  //variables
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("")
    const navigate = useNavigate()
    const [userData, setUserData] = useState(false);
    // const [isLoading, setIsLoading] = useState(true)
    


    const loadUserProfileData = async () => {
        try {
          const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
            headers: { token} }
          );
          if (data.success) {
            setUserData(data.userData);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Failed to fetch user profile data:", error);
          toast.error(error.message);
        }
      };




    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error("select product size");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }

        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);



        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } })


            } catch (error) {
                console.log(error);
                toast.error(error.message)

            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {

                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }


    // useEffect(() => {
    //     console.log(cartItems);

    // }, [cartItems])

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {

                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } })

            } catch (error) {
                 console.log(error);
                 toast.error(error.message)
                 
            }
        }
    }


    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {

            const response = await axios.get(`${backendUrl}/api/product/list`)
            console.log(response.data);
            
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }
         
    const getUserCart = async (token) => {
        try {
           const response = await axios.post(`${backendUrl}/api/cart/get`,{},{headers:{token}}) 

           if(response.data.success){
                setCartItems(response.data.cartData)   
           }
        } catch (error) {
            console.log(error)
            toast.error(error.message) 
        }
    }

   useEffect(() => {
    if(token){
        loadUserProfileData()
    }else {
        setUserData(false)
    }
    
   }, [token])


    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(!token && localStorage.getItem("token"))
            getUserCart( localStorage.getItem("token"))
        }
    }, [])


    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl,
        setToken, token, setCartItems,loadUserProfileData,userData,setUserData}

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider