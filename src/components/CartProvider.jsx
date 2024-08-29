export const CartProvider = ({ children }) => {
    // Context logic here
    return (
        <CartContext.Provider value={1}>
            {children}
        </CartContext.Provider>
    );
};
