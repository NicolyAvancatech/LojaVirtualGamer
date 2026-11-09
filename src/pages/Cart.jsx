import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../assets/components/CartItem";

function Cart() {
  const { cart, total } = useCart();

  const formatPrice = value =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

  return (
    <main className="cart-page">
      <div className="cart-title">
        <span className="section-label">SUA SELEÇÃO</span>
        <h1>Meu carrinho</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <span>🛒</span>
          <h2>Seu carrinho está vazio!</h2>
          <p>Adicione alguns produtos para começar.</p>

          <Link to="/" className="checkout-button">
            Voltar para a loja
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-products">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Resumo da compra</h2>

            <div className="summary-line">
              <span>Produtos</span>
              <span>{cart.reduce(
                (sum, item) => sum + item.quantity, 0
              )}</span>
            </div>

            <div className="summary-line">
              <span>Frete</span>
              <span className="free-shipping">Grátis</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <Link to="/checkout" className="checkout-button">
              Finalizar compra →
            </Link>

            <Link to="/" className="continue-shopping">
              Continuar comprando
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
