import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../AuthProvider/AuthProvider';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);


    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('trendixa_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [deliveryCharge, setDeliveryCharge] = useState(0);


    useEffect(() => {
        localStorage.setItem('trendixa_cart', JSON.stringify(cart));
    }, [cart]);



    const addToCart = (product, quantity, isOrderNow = false) => {
        setCart((prevCart) => {
            const productId = product._id || product.id;
            const isExist = prevCart.find(item => (item._id || item.id) === productId);

            if (isExist) {
                if (isOrderNow) {
                    return prevCart; 
                }
                
                toast.error("Already in cart!", { id: 'cart-toast' });
                return prevCart;
            }

            toast.success(`${product.name} added to cart!`, { id: 'cart-toast' });
            return [...prevCart, { ...product, quantity }];
        });
    };


    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => (item._id !== id && item.id !== id)));
        toast.success("Removed from cart");
    };


    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('trendixa_cart');
        setDeliveryCharge(0);
    };

    const totalPrice = cart.reduce((total, item) => {
        const price = Number(item.discount_price) || Number(item.price) || 0;
        return total + (price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            clearCart, 
            totalPrice, 
            deliveryCharge, 
            setDeliveryCharge 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);