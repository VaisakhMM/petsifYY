import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            // Check if the item is already in the cart
            const itemExists = prevItems.some(cartItem => cartItem._id === item._id);
            if (itemExists) {
                // If the item is already in the cart, return the previous state without changes
                return prevItems;
            } else {
                // Otherwise, add the item to the cart
                return [...prevItems, item];
            }
        });
    };

    const removeFromCart = (idToRemove) => {
        console.log('Current cart items before removal:', cartItems); // Debugging log
        const updatedCartItems = cartItems.filter((item) => item._id !== idToRemove);
        console.log('Updated cart items after removal:', updatedCartItems); // Debugging log
        setCartItems(updatedCartItems);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
