import React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const existing = state.find(
        item => item.id === action.product.id
      );

      if (existing) {
        return state.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...action.product, quantity: 1 }];

    case "REMOVE":
      return state.filter(item => item.id !== action.id);

    case "INCREASE":
      return state.map(item =>
        item.id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE":
      return state
        .map(item =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      return JSON.parse(localStorage.getItem("gamestore-cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("gamestore-cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    dispatch({ type: "ADD", product });
  }

  function removeFromCart(id) {
    dispatch({ type: "REMOVE", id });
  }

  function increase(id) {
    dispatch({ type: "INCREASE", id });
  }

  function decrease(id) {
    dispatch({ type: "DECREASE", id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR" });
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartCount,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartContext;