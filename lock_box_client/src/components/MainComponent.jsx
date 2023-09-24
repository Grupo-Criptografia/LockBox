import {Component} from "react";
import Header from "./HeaderComponent.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {ShiftEncrypt} from "../pages/pagesshift/shiftencrypt.jsx";
import {ShiftDecrypt} from "../pages/pagesshift/shiftdecrypt.jsx";
import {ShiftAttack} from "../pages/pagesshift/shiftattack.jsx";
import {SubsEncrypt} from "../pages/pagessubs/subsencrypt.jsx";
import Menu from "./MenuComponent.jsx";
import {SubsDecrypt} from "../pages/pagessubs/subsdecrypt.jsx";
import {SubsAttack} from "../pages/pagessubs/subsattack.jsx";

class Main extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div className="flex flex-row max-h-screen">
                    <Menu/>
                    <Routes>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                        <Route path="/shift/encrypt" element={<ShiftEncrypt/>}/>
                        <Route path="/shift/decrypt" element={<ShiftDecrypt/>}/>
                        <Route path="/shift/attack" element={<ShiftAttack/>}/>
                        <Route path="/subs/encrypt" element={<SubsEncrypt/>}/>
                        <Route path="/subs/decrypt" element={<SubsDecrypt/>}/>
                        <Route path="/subs/attack" element={<SubsAttack/>}/>
                    </Routes>
                </div>
            </div>
        )
    }

}

export default Main;