import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./AppRouter";
import { client } from "./react-query/client";

function App() {
  return (
    <QueryClientProvider client={client}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
