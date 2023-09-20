import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ShiftEncrypt} from "./pages/pagesshift/shiftencrypt.jsx";
import Header from "./components/HeaderComponent.jsx";
import Menu from "./components/MenuComponent.jsx";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header/>
                <div className="flex">
                    <Menu/>
                    <Routes>
                        <Route path="/" element={<Navigate to="/"/>}/>
                        <Route path="/shift/encrypt" element={<ShiftEncrypt/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;