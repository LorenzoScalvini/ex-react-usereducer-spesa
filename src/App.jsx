import React, { useReducer } from "react";

function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      // Controlla se il prodotto è già nel carrello
      const itemIndex = state.findIndex(
        (item) => item.name === action.product.name
      );
      if (itemIndex >= 0) {
        // Se c'è già, aumenta la quantità
        const newState = [...state];
        newState[itemIndex].quantity += 1;
        return newState;
      } else {
        // Se non c'è, aggiungilo
        return [...state, { ...action.product, quantity: 1 }];
      }

    case "remove":
      // Rimuovi il prodotto
      return state.filter((item) => item.name !== action.productName);

    case "update":
      // Aggiorna la quantità
      return state.map((item) => {
        if (item.name === action.productName) {
          return { ...item, quantity: Math.max(1, action.newQuantity) };
        }
        return item;
      });

    default:
      return state;
  }
}

export default function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  // Funzioni per modificare il carrello
  const addToCart = (product) => {
    dispatch({ type: "add", product });
  };

  const removeFromCart = (productName) => {
    dispatch({ type: "remove", productName });
  };

  const updateQuantity = (productName, newQuantity) => {
    const quantity = Number(newQuantity);
    if (!isNaN(quantity)) {
      dispatch({ type: "update", productName, newQuantity: quantity });
    }
  };

  // Calcola il totale
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Negozio</h1>

      <div>
        <h2>Prodotti</h2>
        <ul>
          {products.map((product, i) => (
            <li key={i}>
              {product.name} - €{product.price.toFixed(2)}
              <button onClick={() => addToCart(product)}>Aggiungi</button>
            </li>
          ))}
        </ul>
      </div>

      {cart.length > 0 && (
        <div>
          <h2>Carrello</h2>
          <ul>
            {cart.map((item, i) => (
              <li key={i}>
                {item.name} - €{item.price.toFixed(2)}
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.name, e.target.value)}
                />
                <button onClick={() => removeFromCart(item.name)}>
                  Rimuovi
                </button>
              </li>
            ))}
          </ul>
          <p>Totale: €{total.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
