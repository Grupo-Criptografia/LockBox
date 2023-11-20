import {Component} from "react";
import Header from "./HeaderComponent.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {ShiftEncrypt} from "../pages/pagesshift/shiftencrypt.jsx";
import {ShiftDecrypt} from "../pages/pagesshift/shiftdecrypt.jsx";
import {ShiftAttack} from "../pages/pagesshift/shiftattack.jsx";
import {SubsEncrypt} from "../pages/pagessubs/subsencrypt.jsx";

import Menu2 from "./MenuComponent2.jsx";
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
import {HillEncrypt} from "../pages/pageshill/hillencrypt.jsx";
import {HillDecrypt} from "../pages/pageshill/hilldecrypt.jsx";
import {TdesEncrypt} from "../pages/pagestdes/tdesencrypt.jsx";
import {TdesDecrypt} from "../pages/pagestdes/tdesdecrypt.jsx";
import {AesEncrypt} from "../pages/pagesaes/aesencrypt.jsx";
import {AesDecrypt} from "../pages/pagesaes/aesdecrypt.jsx";
import {RabinEncrypt} from "../pages/pagesrabin/rabinencrypt.jsx";
import {RabinDecrypt} from "../pages/pagesrabin/rabindecrypt.jsx";
import {HillImgEncrypt} from "../pages/pageshill/hillimgencrypt.jsx";
import {HillImgDecrypt} from "../pages/pageshill/hillimgdecrypt.jsx";
import {HomeShift} from "../pages/pagesshift/homeshift.jsx";
import {HomeVigenere} from "../pages/pagesvigenere/homevigenere.jsx";
import {HomeHill} from "../pages/pageshill/homehill.jsx";
import {HomeTdes} from "../pages/pagestdes/hometdes.jsx";
import {HomeAes} from "../pages/pagesaes/homeaes.jsx";
import {RsaEncrypt} from "../pages/pagesrsa/rsaencrypt.jsx";
import {RsaDecrypt} from "../pages/pagesrsa/rsadecrypt.jsx";
import {ElgamalEncrypt} from "../pages/pageselgamal/elgamalencrypt.jsx";
import {ElgamalDecrypt} from "../pages/pageselgamal/elgamaldecrypt.jsx";


class Main extends Component {

    render() {
        return (
            <div className="flex flex-row-2">
                <Menu2/>
                <Routes>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                    <Route path="/" element={<Home/>}/>
                    {/*Pages Shift*/}
                    <Route path="/shift" element={<HomeShift/>}>
                        <Route path="encrypt" element={<ShiftEncrypt/>}/>
                        <Route path="decrypt" element={<ShiftDecrypt/>}/>
                        <Route path="attack" element={<ShiftAttack/>}/>
                    </Route>
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
                    {/*Pages Vigenere*/}
                    <Route path="/vigenere" element={<HomeVigenere/>}>
                        <Route path="encrypt" element={<VigenereEncrypt/>}/>
                        <Route path="decrypt" element={<VigenereDecrypt/>}/>
                        <Route path="attack" element={<VigenereAttack/>}/>
                    </Route>
                    {/*Pages Hill*/}
                    <Route path="/hill" element={<HomeHill/>}>
                        <Route path="encrypttext" element={<HillEncrypt/>}/>
                        <Route path="decrypttext" element={<HillDecrypt/>}/>
                        <Route path="encryptimg" element={<HillImgEncrypt/>}/>
                        <Route path="decryptimg" element={<HillImgDecrypt/>}/>
                    </Route>
                    {/*Pages Tdes*/}
                    <Route path="/tdes" element={<HomeTdes/>}>
                        <Route path={"encrypt"} element={<TdesEncrypt/>}/>
                        <Route path={"decrypt"} element={<TdesDecrypt/>}/>
                    </Route>
                    {/*Pages AES*/}
                    <Route path="/aes" element={<HomeAes/>}>
                        <Route path={"encrypt"} element={<AesEncrypt/>}/>
                        <Route path={"decrypt"} element={<AesDecrypt/>}/>
                    </Route>
                    {/*Pages Rabin*/}
                    <Route path={"/rabin/encrypt"} element={<RabinEncrypt/>}/>
                    <Route path={"/rabin/decrypt"} element={<RabinDecrypt/>}/>
                </Routes>
            </div>
        )
    }

}

export default Main;