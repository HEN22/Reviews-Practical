import { BrowserRouter, Routes, Route } from "react-router-dom";
import Review from "./components/Review";
import HomePage from "./views/HomePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/new" exact element={<Review />} />
          <Route path="/:id" exact element={<Review />} />
          <Route path="/" exact element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
