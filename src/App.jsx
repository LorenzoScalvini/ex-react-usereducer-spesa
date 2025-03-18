import React, { useReducer } from 'react';

// Definizione del reducer per gestire lo stato del carrello
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.findIndex(
        (item) => item.name === action.payload.name
      );
      if (existingItemIndex !== -1) {
        // Se il prodotto è già nel carrello, incrementa la quantità
        const updatedState = [...state];
        updatedState[existingItemIndex].quantity += 1;
        return updatedState;
      } else {
        // Se il prodotto non è nel carrello, lo aggiunge con quantità 1
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case 'REMOVE_ITEM':
      return state.filter((item) => item.name !== action.payload);

    case 'UPDATE_QUANTITY':
      return state.map((item) =>
        item.name === action.payload.name
          ? { ...item, quantity: Math.max(1, action.payload.quantity) } // Impedisce quantità negative o zero
          : item
      );

    default:
      return state;
  }
}

// Componente principale ShoppingCart
export default function ShoppingCart() {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  // Inizializzazione dello stato con useReducer
  const [addedProducts, dispatch] = useReducer(cartReducer, []);

  // Funzione per aggiungere un prodotto al carrello
  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  // Funzione per rimuovere un prodotto dal carrello
  const removeFromCart = (productName) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productName });
  };

  // Funzione per aggiornare la quantità di un prodotto nel carrello
  const updateProductQuantity = (productName, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity)) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { name: productName, quantity },
      });
    }
  };

  // Funzione per calcolare il totale del carrello
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
                </div>
                <div>
                  <label>
                    Quantità:
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateProductQuantity(item.name, e.target.value)
                      }
                    />
                  </label>
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
}
