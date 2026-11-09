
import { useState } from "react";
import products from "../data/products";
import ProductCard from "../assets/components/ProductCard";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const categories = [
    "Todos",
    "Teclados",
    "Mouses",
    "Headsets",
    "Monitores"
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "Todos" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">LEVEL UP YOUR GAME</span>

          <h1>
            SEU SETUP.
            <br />
            <span>SEU UNIVERSO.</span>
          </h1>

          <p>
            Os melhores equipamentos gamers para elevar
            sua experiência de jogo.
          </p>

          <a href="#produtos" className="hero-button">
            Explorar produtos →
          </a>
        </div>
      </section>

      <section className="products-section" id="produtos">
        <div className="section-heading">
          <div>
            <span className="section-label">NOSSA LOJA</span>
            <h2>Explore os produtos</h2>
          </div>

          <span className="product-quantity">
            {filteredProducts.length} produtos
          </span>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="🔍 Pesquisar produto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="category-filters">
            {categories.map(item => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <p className="empty-message">
              Nenhum produto encontrado.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
