import React, { useState } from 'react';

const ShoppingCart = () => {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);

  const addToCart = (product) => {
    const isAlreadyInCart = addedProducts.some(
      (item) => item.name === product.name
    );

    if (!isAlreadyInCart) {
      const productWithQuantity = { ...product, quantity: 1 };
      setAddedProducts([...addedProducts, productWithQuantity]);
    }
  };

  return (
    <div>
      <h1>Lista Prodotti</h1>

      <div>
        <h2>Prodotti disponibili</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <div>
                <span>{product.name}</span>
                <span>€{product.price.toFixed(2)}</span>
              </div>
              <button onClick={() => addToCart(product)}>
                Aggiungi al carrello
              </button>
            </li>
          ))}
        </ul>
      </div>

      {addedProducts.length > 0 && (
        <div>
          <h2>Carrello</h2>
          <ul>
            {addedProducts.map((item, index) => (
              <li key={index}>
                <div>
                  <span>{item.name}</span>
                  <span>€{item.price.toFixed(2)}</span>
                </div>
                <span>Quantità: {item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
