import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes/AppRouter";
import { client } from "./react-query/client";
import { Provider } from "react-redux";
import { store } from "./store";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <Provider store={store()}>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
