import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Shift} from "./pages/pageshift.jsx";
import Header from "./components/HeaderComponent.jsx";

function App() {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Lock Box
            </h1>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Navigate to="/"/>}/>
                    <Route path="/shift" element={<Shift/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;