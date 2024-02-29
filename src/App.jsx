import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { SinglePage } from "./pages/single-page";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos/:id" element={<SinglePage />} />
      </Routes>
    </div>
  );
}

export default App;
