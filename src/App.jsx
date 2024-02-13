import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NotFound } from "./components/NotFound";
import AboutUs from "./pages/AboutUs";
import HomePage from "./pages/HomePage";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>

<Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
