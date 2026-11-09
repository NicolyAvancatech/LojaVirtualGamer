import React from "react";
import CartContext from "../../context/CartContext";

function CartItem({ item }) {
  const { increase, decrease, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />

      <div className="cart-item-info">
        <span>{item.category}</span>
        <h3>{item.name}</h3>

        <strong>
          {item.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
        </strong>

        <div className="quantity-controls">
          <button onClick={() => decrease(item.id)}>−</button>

          <span>{item.quantity}</span>

          <button onClick={() => increase(item.id)}>+</button>
        </div>
      </div>

      <button
        className="remove-button"
        onClick={() => removeFromCart(item.id)}
      >
        🗑 Remover
      </button>
    </div>
  );
}

export default CartItem;
