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
import {AffineEncrypt} from "../pages/pagesaffine/affineencrypt.jsx";
import {AffineDecrypt} from "../pages/pagesaffine/affinedecrypt.jsx";
import {AffineAttack} from "../pages/pagesaffine/affineattack.jsx";
import {PermutationEncrypt} from "../pages/pagespermutation/permutationencrypt.jsx";
import {PermutationDecrypt} from "../pages/pagespermutation/permutationdecrypt.jsx";
import {VigenereEncrypt} from "../pages/pagesvigenere/vigenereencrypt.jsx";
import {VigenereDecrypt} from "../pages/pagesvigenere/vigeneredecrypt.jsx";
import {VigenereAttack} from "../pages/pagesvigenere/vigenereattack.jsx";
import Home from "./HomeComponent.jsx";

class Main extends Component {

    render() {
        return (
            <div className="flex flex-col">
                <Header/>
                <div className="flex flex-row">
                    <Menu/>
                    <Routes>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                        <Route path="/" element={<Home/>}/>
                        {/*Pages Shift*/}
                        <Route path="/shift/encrypt" element={<ShiftEncrypt/>}/>
                        <Route path="/shift/decrypt" element={<ShiftDecrypt/>}/>
                        <Route path="/shift/attack" element={<ShiftAttack/>}/>
                        {/*Pages Substitution*/}
                        <Route path="/subs/encrypt" element={<SubsEncrypt/>}/>
                        <Route path="/subs/decrypt" element={<SubsDecrypt/>}/>
                        <Route path="/subs/attack" element={<SubsAttack/>}/>
                        {/*Pages Affine*/}
                        <Route path="/affine/encrypt" element={<AffineEncrypt/>}/>
                        <Route path="/affine/decrypt" element={<AffineDecrypt/>}/>
                        <Route path="/affine/attack" element={<AffineAttack/>}/>
                        {/*Pages Permutation*/}
                        <Route path="/permutation/encrypt" element={<PermutationEncrypt/>}/>
                        <Route path="/permutation/decrypt" element={<PermutationDecrypt/>}/>
                        {/*Pages Permutation*/}
                        <Route path="/vigenere/encrypt" element={<VigenereEncrypt/>}/>
                        <Route path="/vigenere/decrypt" element={<VigenereDecrypt/>}/>
                        <Route path="/vigenere/attack" element={<VigenereAttack/>}/>
                    </Routes>
                </div>
            </div>
        )
    }

}

export default Main;