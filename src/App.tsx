import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes/AppRouter";
import { client } from "./lib/react-query/client";
import { Provider } from "react-redux";
import { store } from "./store";
import AuthProvider from "./providers/AuthProvider";
import { lazy } from "react";

const ToastProvider = lazy(() => import("./providers/toast/ToastProvider"));
const ToastListener = lazy(() => import("./providers/toast/ToastListener"));

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <ToastListener />
          <ToastProvider />
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
