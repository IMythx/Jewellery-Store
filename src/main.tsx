import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { StableNavigateContextProvider } from "./hooks/hooks";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <StableNavigateContextProvider>
        <App />
      </StableNavigateContextProvider>
    </BrowserRouter>
  </Provider>
);
