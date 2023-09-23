import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ShiftEncrypt} from "./pages/pagesshift/shiftencrypt.jsx";
import Header from "./components/HeaderComponent.jsx";
import Menu from "./components/MenuComponent.jsx";
import {ShiftDecrypt} from "./pages/pagesshift/shiftdecrypt.jsx";
import {ShiftAttack} from "./pages/pagesshift/shiftattack.jsx";
import {SubsEncrypt} from "./pages/pagessubs/subsencrypt.jsx";
import Main from "./components/MainComponent.jsx";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Main/>
            </div>
        </BrowserRouter>
    )
}

export default App;