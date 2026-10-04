
import { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 25,
    image: "👕",
    category: "Clothing",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 60,
    image: "👟",
    category: "Shoes",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 45,
    image: "🎧",
    category: "Electronics",
  },
];
const addToCart = (product) => {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    setCart(
      cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } else {
    setCart([...cart, { ...product, quantity: 1 }]);
  }
};

const removeFromCart = (id) => {
  setCart(cart.filter((item) => item.id !== id));
};
const decreaseQuantity = (id) => {
  setCart(
    cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};
const increaseQuantity = (id) => {
  setCart(
    cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};
const handleCheckout = () => {
  alert("Thank you for your order!");
};
const handleSubmit = (e) => {
  e.preventDefault();
  alert("Thank you for contacting us!");
};
  return (
    
    
    <div className="App">

      <header className="navbar">
        <div className="logo">ShopEase</div>

        <nav>
          <a href="#">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
       🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
      </button>
      {showCart && (
  <div className="cart-box">
    <h2>Your Cart</h2>
     <button
  className="close-cart"
  onClick={() => setShowCart(false)}
>
  Close
</button>
    {cart.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <>
       {cart.map((item) => (
        <div className="cart-item" key={item.id}>
  <span>{item.image}</span>
  <span>
  {item.name} × {item.quantity}
 
    <button
  className="quantity-btn"
  onClick={() => decreaseQuantity(item.id)}
>
  −
</button>

<button
  className="quantity-btn"
  onClick={() => increaseQuantity(item.id)}
>
  +
</button>
</span>
  <span>${item.price * item.quantity}</span>
  <button onClick={() => removeFromCart(item.id)}>
    Remove
  </button>
    </div>
      ))}
      <p className="cart-total">
       Total: ${cart.reduce(
         (total, item) => total + item.price * item.quantity,
            0
           )}
      </p>
      
      <button className="checkout-btn" onClick={handleCheckout}>
       Proceed to Checkout
       </button>
       </>
         )}
      </div>
          )}
      </header>

      <section className="hero">
        <div className="hero-content">
          <p>WELCOME TO SHOPEASE</p>

          <h1>
            Discover Products
            <span> You Will Love</span>
          </h1>

          <p>
            Explore our collection of quality products at affordable prices.
          </p>

          <a href="#products" className="shop-btn">
            Shop Now
          </a>
        </div>
      </section>

      <section className="products" id="products">
        <h2>Our <span>Products</span></h2>
       
         <input
           type="text"
           placeholder="Search products..."
           className="search-input"
           value={search}
          onChange={(e) => setSearch(e.target.value)}
           />
           
           <div className="category-buttons">
            <button onClick={() => setCategory("All")}>All</button>
           <button onClick={() => setCategory("Clothing")}>Clothing</button>
           <button onClick={() => setCategory("Shoes")}>Shoes</button>
           <button onClick={() => setCategory("Electronics")}>Electronics</button>
           </div>
        <div className="product-container">

               {products
               .filter((product) =>
               product.name.toLowerCase().includes(search.toLowerCase())
                 )
                .filter((product) =>
                 category === "All" || product.category === category
                  )
                 .map((product) => (
             <div className="product-card" key={product.id}>
             <div className="product-image">{product.image}</div>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>
             Add to Cart
            </button>
           
           <button
              className="details-btn"
              onClick={() => setSelectedProduct(product)}
                 >
                 View Details
             </button>
            </div>
             ))}
         
        </div>
        {selectedProduct && (
  <div className="product-details">
    <div className="product-details-content">
      <button
        className="close-details"
        onClick={() => setSelectedProduct(null)}
      >
        ×
      </button>

      <div className="product-details-image">
        {selectedProduct.image}
      </div>

      <h2>{selectedProduct.name}</h2>

      <p className="details-price">
        ${selectedProduct.price}
      </p>

      <p>
        Category: {selectedProduct.category}
      </p>

      <p>
        This is a quality product available at ShopEase.
      </p>

      <button
        className="checkout-btn"
        onClick={() => addToCart(selectedProduct)}
      >
        Add to Cart
      </button>
    </div>
  </div>
)}
      </section>

      <section className="about" id="about">
        <h2>About <span>ShopEase</span></h2>

        <p>
          ShopEase is a modern online shopping website where customers
          can discover quality products in a simple and convenient way.
        </p>
      </section>

      <section className="contact" id="contact">
        <h2>Contact <span>Us</span></h2>

        <p>
          
          Have a question? Feel free to get in touch with us.
           </p>
         <form className="contact-form" onSubmit={handleSubmit}>
           <input
              type="text"
             placeholder="Your Name"
              required
               />  

        <input
             type="email"
             placeholder="Your Email"
              required
               />

              <textarea
             placeholder="Your Message"
              rows="5"
            required
               ></textarea>

            <button type="submit">
              Send Message
              </button>
            </form>
              </section>
        <footer className="footer">

  <div className="footer-content">

    <div className="footer-brand">
      <h2>ShopEase</h2>
      <p>
        Quality products at affordable prices.
        Shop easily and enjoy a simple online shopping experience.
      </p>
    </div>

    <div className="footer-links">
      <h3>Quick Links</h3>
      <a href="#">Home</a>
      <a href="#products">Products</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </div>

  </div>

  <div className="footer-bottom">
    <p>© 2026 ShopEase. All rights reserved.</p>
  </div>

</footer>
<div class="project">
    <h3>ShopEase E-Commerce Website</h3>
    <p>
        A modern e-commerce website built with React.js featuring
        product search, category filtering, shopping cart,
        product details and responsive design.
    </p>
    <a href="#" class="project-btn">View Project</a>
      </div>
              </div>
                );
                 }

export default App;