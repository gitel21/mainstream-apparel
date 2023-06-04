import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
   //To find if cartItems includes productToAdd
   const existingCartItem = cartItems.find (
      (cartItem) => cartItem.id === productToAdd.id
   )

   //If productToAdd is in Cart, increment the quantity
   if (existingCartItem) {
      return (
         cartItems.map((cartItem) => {
            return (
               cartItem.id === productToAdd.id 
               ? {...cartItem, quantity: cartItem.quantity+1}
               : cartItem
            )
         })
      )
   }

   // if productToAdd is not in Cart, return a new array with updated cartItems
   return [...cartItems, {...productToAdd, quantity:1}];

}

const removeCartItem = (cartItems, cartItemToRemove) => {
   // find the cart item to be removed
   const existingCartItem = cartItems.find (
      (cartItem) => cartItem.id === cartItemToRemove.id
   )

   // check if quantity is equal to 1, if it is, remove the item
   if(existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => 
               cartItem.id !== cartItemToRemove.id
         )
   } 

   // return back cart items with matching cart item with reduced quantity
   return (
      cartItems.map((cartItem) => {
         return (
            cartItem.id === cartItemToRemove.id 
            ? {...cartItem, quantity: cartItem.quantity-1}
            : cartItem
         )
      })
   )
}

const removeCartItem_2 = (cartItems, cartItemToRemove) => {
   
   return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)

}

export const CartContext = createContext({
   isCartOpen: false,
   setIsCartOpen: () => {},
   cartItems: [],
   addItemToCart: () => {},
   removeItemFromCart: () => {},
   removeItemFromCheckout: () => {},
   cartCount: 0,
   total: 0
});

export const CartProvider = ({children}) => {
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [cartCount, setCartCount] = useState(0);
   const [cartTotal, setCartTotal] = useState(0);

   useEffect(()=>{
      const newCartCount = cartItems.reduce(
         (total, cartItem) => (total + cartItem.quantity)
         , 0)
      setCartCount(newCartCount)
   }, [cartItems])

   useEffect(()=>{
      const cartTotal = cartItems.reduce((total, cartItem) => (
         total + cartItem.quantity * cartItem.price)
         , 0)
      setCartTotal(cartTotal)
   }, [cartItems])

   const addItemToCart = (productToAdd) => {
      setCartItems(addCartItem(cartItems, productToAdd))
   }

   const removeItemFromCart = (cartItemToRemove) => {
      setCartItems(removeCartItem(cartItems, cartItemToRemove))
   }

   const removeItemFromCheckout = (cartItemToRemove) => {
      setCartItems(removeCartItem_2(cartItems, cartItemToRemove))
   }

   const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount,cartTotal, removeItemFromCart, removeItemFromCheckout};

   return (
      <CartContext.Provider value={value}>
         {children}
      </CartContext.Provider>
   )
}