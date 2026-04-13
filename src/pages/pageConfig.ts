const PAGE = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    VERIFY_EMAIL: "/verify-email",
    VERIFY_SUCCESS: "/verify-success",
  },

  PUBLIC: {
    BASE: "/",
    SHOP: "/shop",
    PRODUCT: "/shop/:mainCategory/:category/:productId",
    SEARCH: "/shop/search",
    SEARCH_RESULTS: "/shop/search/:searchVal",
    CATEGORY: "/shop/category/:categoryName",
  },

  USER: {
    PROFILE: "/profile",
    ORDERS: "/orders",
    WISHLIST: "/wishlist",
    CART: "/cart",
    SETTINGS: "/settings",
  },

  ADMIN: {
    BASE: "/admin",
  },

  SOCIAL: {
    LINKDIN: "https://www.linkedin.com/in/levan-bulatsashvili-b7b33831a/",
    GITHUB: "https://github.com/LevaniBulatsashvili",
  },

  NOT_FOUND: "*",
};

export { PAGE };
