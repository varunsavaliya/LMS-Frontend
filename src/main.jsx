import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          iconTheme: {
            primary: "#6a5103",
            secondary: "#ffd308",
          },
        }}
      />
    </BrowserRouter>
  </Provider>
);
