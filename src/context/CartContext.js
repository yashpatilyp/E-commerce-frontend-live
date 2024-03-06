import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Step 1: Define the initial state
const initialState = {
  cartItems: [],
};

// Step 2: Define the actions
const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  INCREMENT_COUNTER: 'INCREMENT_COUNTER',
  DECREMENT_COUNTER: 'DECREMENT_COUNTER',
 
};

// Step 3: Define the reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      const newItem = action.payload;
    
      // Ensure that state.cartItems is an array or initialize it as an empty array
      const cartItemsArray = Array.isArray(state.cartItems) ? state.cartItems : [];
    
      const existingItemIndex = cartItemsArray.findIndex(item => item._id === newItem._id);
    
      if (existingItemIndex !== -1) {
        // If item already exists in the cart, update quantity and increment counter
        const updatedCartItems = [...cartItemsArray];
        const existingItem = updatedCartItems[existingItemIndex];
        existingItem.quantity += newItem.quantity;
        existingItem.counter += 1;
    
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // If item is not in the cart, add it with counter set to 1
        newItem.counter = 1;
        return {
          ...state,
          cartItems: [...cartItemsArray, newItem],
        };
      }

      
    case ACTIONS.REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, cartItems: updatedCartItems };
     
       case ACTIONS.UPDATE_QUANTITY:
      const { id, quantity } = action.payload;
      const updatedItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      
      return { ...state, cartItems: updatedItems };

      case ACTIONS.INCREMENT_COUNTER:
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item._id === action.payload ? { ...item, counter: item.counter + 1 } : item
          ),
        };
  
        case ACTIONS.DECREMENT_COUNTER:
          return {
            ...state,
            cartItems: state.cartItems.map(item =>
              item._id === action.payload ? { ...item, counter: Math.max(0, item.counter - 1) } : item
            ),
          };

        
    default:
      return state;
  }
}

// Step 4: Create the context object
const CartContext = createContext();

// Step 5: Create the provider component
export function CartProvider({ children }) {
  // Load cart data from localStorage on component mount
  const storedCartData = JSON.parse(localStorage.getItem('cartData')) || [];

  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: storedCartData,
  });

  // Use useEffect to update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}



// Step 6: Create a custom hook for using the context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
