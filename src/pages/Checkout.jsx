
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  function finishPurchase() {
    if (cart.length === 0) return;

    clearCart();
    setFinished(true);
  }

  if (finished) {
    return (
      <main className="checkout-page">
        <div className="success-box">
          <span>✓</span>
          <h1>Compra realizada!</h1>
          <p>
            Parabéns! Seu pedido foi finalizado com sucesso.
          </p>
          <p className="simulation-note">
            Esta foi uma compra simulada para demonstração.
          </p>

          <Link to="/" className="checkout-button">
            Voltar para a loja
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-cart">
          <h2>Não existem produtos no carrinho.</h2>
          <Link to="/" className="checkout-button">
            Voltar para a loja
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-card">
        <span className="section-label">ÚLTIMA ETAPA</span>
        <h1>Finalizar pedido</h1>

        <p>Confira o resumo da sua compra.</p>

        {cart.map(item => (
          <div className="checkout-product" key={item.id}>
            <span>
              {item.name} x {item.quantity}
            </span>

            <strong>
              {(item.price * item.quantity).toLocaleString(
                "pt-BR",
                { style: "currency", currency: "BRL" }
              )}
            </strong>
          </div>
        ))}

        <div className="summary-total">
          <span>Total da compra</span>

          <strong>
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </strong>
        </div>

        <button
          className="checkout-button"
          onClick={finishPurchase}
        >
          Confirmar compra
        </button>

        <button
          className="continue-shopping"
          onClick={() => navigate("/carrinho")}
        >
          Voltar ao carrinho
        </button>
      </div>
    </main>
  );
}

export default Checkout;
