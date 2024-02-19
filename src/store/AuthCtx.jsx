import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

function parseJwtTokenData(token) {
  if (!token) return {};

  //Parse token
  const tokenValues = jwtDecode(token);

  const dateNow = Date.now() / 1000;

  if (dateNow > tokenValues.exp) {
    localStorage.removeItem("bit_token");
    return {};
  }

  return { ...tokenValues, token };
}

const AuthContext = createContext({
  login() {},
  logout() {},
  addToCart() {},
  removeFromCart() {},
  isUserLoggedIn: false,
  token: null,
  userEmail: "",
  role: "",
  userId: "",
  userName: "",
  cart: {
    items: [],
    totalPrice: 0,
  },
});

function AuthCtxProvider({ children }) {
  let tokenData = parseJwtTokenData(localStorage.getItem("bit_token"));
  const localItems = JSON.parse(localStorage.getItem("cartItems"));

  const [token, setToken] = useState(tokenData?.token || "");
  const [userEmail, setUserEmail] = useState(tokenData?.email || "");
  const [role, setRole] = useState(tokenData?.role || "");
  const [userName, setUserName] = useState(tokenData?.userName || "");
  const [cart, setCart] = useState(localItems || { items: [], totalPrice: 0 });

  const isUserLoggedIn = !!token;
  let userId = tokenData?.sub || "";

  function login(token) {
    const { email, sub, role } = parseJwtTokenData(token);
    setToken(token);
    setUserEmail(email);
    setRole(role);
    userId = sub;
    localStorage.setItem("bit_token", token);
  }
  function logout() {
    setToken("");
    setUserEmail("");
    setRole("");

    localStorage.removeItem("bit_token");
    localStorage.removeItem("favorites");
  }

  function addToCart(item, qty = 1) {
    setCart((prev) => {
      const cartHasItem = prev.items.findIndex((cartItem) => cartItem.id === item.id);
      const totalPrice = prev.totalPrice + Number(item.price) * qty;
      let newCart = {};

      if (cartHasItem !== -1) {
        prev.items[cartHasItem].qty += +qty;
        const newCart = { items: [...prev.items], totalPrice };
        localStorage.setItem("cartItems", JSON.stringify(newCart));
        return newCart;
      } else {
        item.qty = +qty;
        const newCart = { items: [...prev.items, item], totalPrice };
        localStorage.setItem("cartItems", JSON.stringify(newCart));
        return newCart;
      }
    });
  }
  function removeFromCart(id) {
    setCart((prev) => {
      const newItems = prev.items.filter((cartItem) => cartItem.id !== id);
      const totalPrice = newItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      const newCart = { items: [...newItems], totalPrice };
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return newCart;
    });
  }

  const ctxValue = {
    login,
    logout,
    addToCart,
    removeFromCart,
    userName,
    token,
    isUserLoggedIn,
    userEmail,
    role,
    userId,
    cart,
  };

  return <AuthContext.Provider value={ctxValue}> {children} </AuthContext.Provider>;
}

export default AuthCtxProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
