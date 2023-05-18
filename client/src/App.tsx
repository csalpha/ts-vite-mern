import "./App.css";
import { products } from "./data";

function App() {
  return (
    <div>
      <header>TS VITE MERN</header>
      <main>
        <ul>
          {products.map((product) => (
            <li key={product.slug}>
              <img
                src={product.image}
                alt={product.name}
                className='product-image'
              />
              <h2>{product.name}</h2>
              <p>{product.price}</p>
            </li>
          ))}
        </ul>
      </main>
      <footer>Carlos Serôdio - All rights reserved</footer>
    </div>
  );
}

export default App;
