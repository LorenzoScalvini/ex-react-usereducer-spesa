import React, { useState } from 'react';

const ShoppingCart = () => {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);

  // Aggiunge un prodotto al carrello o incrementa la quantità se già presente
  const addToCart = (product) => {
    const productIndex = addedProducts.findIndex(
      (item) => item.name === product.name
    );

    if (productIndex === -1) {
      // Se il prodotto non è nel carrello, lo aggiunge con quantità 1
      setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
    } else {
      // Se il prodotto è già nel carrello, incrementa la quantità
      const updatedProducts = [...addedProducts];
      updatedProducts[productIndex].quantity += 1;
      setAddedProducts(updatedProducts);
    }
  };

  // Rimuove un prodotto dal carrello
  const removeFromCart = (productName) => {
    const updatedProducts = addedProducts.filter(
      (item) => item.name !== productName
    );
    setAddedProducts(updatedProducts);
  };

  // Calcola il totale del carrello
  const calculateTotal = () => {
    return addedProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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
                  <span>Quantità: {item.quantity}</span>
                </div>
                <button onClick={() => removeFromCart(item.name)}>
                  Rimuovi dal carrello
                </button>
              </li>
            ))}
          </ul>
          <div>
            <strong>Totale da pagare: €{calculateTotal().toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
