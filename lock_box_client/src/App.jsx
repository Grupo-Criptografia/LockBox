import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ShiftEncrypt} from "./pages/pagesshift/shiftencrypt.jsx";
import Header from "./components/HeaderComponent.jsx";
import Menu from "./components/MenuComponent.jsx";
import {ShiftDecrypt} from "./pages/pagesshift/shiftdecrypt.jsx";
import {ShiftAttack} from "./pages/pagesshift/shiftattack.jsx";

function App() {
    return (
        <div className="">
            <BrowserRouter>
                <Header/>
                <div className="flex h-screen">
                    <Menu/>
                    <Routes>
                        <Route path="/" element={<Navigate to="/"/>}/>
                        <Route path="/shift/encrypt" element={<ShiftEncrypt/>}/>
                        <Route path="/shift/decrypt" element={<ShiftDecrypt/>}/>
                        <Route path="/shift/attack" element={<ShiftAttack/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;