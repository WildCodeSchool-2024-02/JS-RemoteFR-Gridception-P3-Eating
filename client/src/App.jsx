import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
