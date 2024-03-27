import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import necessary components
import Home from "./Home";
import Page2 from "./Page2";
import Login from "./Login";

function App() {
    return (
        <div className="App">
            <BrowserRouter> {/* Use BrowserRouter */}
                <Routes> {/* Use Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/Home" element={<Home />} /> 
                    <Route path="/Page2" element={<Page2 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;