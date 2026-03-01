import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./AppRouter";
import { client } from "./react-query/client";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store()}>
      <QueryClientProvider client={client}>
        <AppRouter />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
