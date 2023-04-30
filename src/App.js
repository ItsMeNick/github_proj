import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchEngine from "./SearchEngine";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<SearchEngine />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
