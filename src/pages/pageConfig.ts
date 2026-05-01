const PAGE = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    VERIFY_EMAIL: "/verify-email",
    VERIFY_SUCCESS: "/verify-success",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
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
    PRODUCTS: "/admin/products",
    MAIN_CATEGORIES: "/admin/main-categories",
    CATEGORIES: "/admin/categories",
    BRANDS: "/admin/brands",
    PRODUCT_SPECS: "/admin/product-specs",
    PRODUCT_FAQS: "/admin/product-faqs",
  },

  SOCIAL: {
    LINKDIN: "https://www.linkedin.com/in/levan-bulatsashvili-b7b33831a/",
    GITHUB: "https://github.com/LevaniBulatsashvili",
  },

  NOT_FOUND: "/404",
};

export { PAGE };
