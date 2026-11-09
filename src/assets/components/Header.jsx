import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Header() {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <Link to="/" className="logo">
        GAME<span>STORE</span>
      </Link>

      <nav>
        <Link to="/">Início</Link>

        <Link to="/carrinho">
          🛒 Carrinho ({cartCount})
        </Link>
      </nav>
    </header>
  );
}

export default Header;