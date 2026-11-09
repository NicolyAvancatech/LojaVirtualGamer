
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Header from "./assets/components/Header";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

        <footer className="footer">
          <h2>GAME<span>STORE</span></h2>
          <p>Seu universo gamer começa aqui.</p>
          <small>© 2026 GameStore. Projeto acadêmico.</small>
        </footer>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
