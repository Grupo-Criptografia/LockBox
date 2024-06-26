import {Component} from "react";
import {Link} from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <aside className="flex flex-col w-1/5 h-auto px-4 py-8 bg-white border-r rtl:border-r-0 rtl:border-l">
                <img src="/lockbox_logo-2.png" alt="logo"/>
                <ul className="menu bg-white text-base h-auto py-8 px-0">
                    <li><Link class="font-semibold text-black" to="/">Home</Link></li>
                    <li>
                        {/*Establecemos el menu desplegable para los cifrados clasicos*/}
                        <details>
                            <summary className="font-semibold text-black">Classic ciphers</summary>
                            <ul>
                                <li><Link class="font-semibold text-black" to="shift">Shift
                                    cipher</Link></li>
                                <li><Link className="font-semibold text-black" to="affine">Affine cipher</Link></li>
                                {/*Consideramos que el cifrado Vigenere es cifrado y analisis */}
                                <li><Link className="font-semibold text-black" to="vigenere">Vigenère
                                    cipher</Link></li>
                                <li><Link className="font-semibold text-black" to="permutation">Permutation
                                    cipher</Link>
                                </li>
                                {/*Debe haber cifrado de texto e imagen */}
                                <li><Link className="font-semibold text-black dark:text-white" to="hill">Hill
                                    cipher</Link></li>
                                {/*Consideramos el cifrado y el analisis de frecuencia*/}
                                <li><Link className="font-semibold text-black dark:text-white" to="substitution">Substitution
                                    cipher</Link>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        {/*Establecemos el menu desplegable para los cifrados en bloque*/}
                        <details>
                            <summary className="font-semibold text-black dark:text-white">Blocks ciphers</summary>
                            <ul>
                                <li><Link className="font-semibold text-black dark:text-white" to="tdes">TDES
                                    cipher</Link></li>
                                <li><Link className="font-semibold text-black dark:text-white" to="aes">AES
                                    cipher</Link></li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        {/*Establecemos el menu desplegable para los cifrados de clave pública*/}
                        <details>
                            <summary className="font-semibold text-black dark:text-white">Public key ciphers
                            </summary>
                            <ul>
                                <li><Link className="font-semibold text-black dark:text-white" to="rsa">RSA
                                    cipher</Link></li>
                                <li><Link className="font-semibold text-black dark:text-white" to="rabin">Rabin
                                    cipher</Link></li>
                                <li><Link className="font-semibold text-black dark:text-white" to="elgamal">ElGamal
                                    cipher</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li><Link className="font-semibold text-black dark:text-white" to="digsignature">Digital
                        Signature</Link></li>
                    <li><Link className="font-semibold text-black dark:text-white" to="visualcrypt">Visual
                        Cryptography</Link></li>
                    <li><Link className="font-semibold text-black dark:text-white" to="watermark">Watermark Image</Link></li>
                </ul>
            </aside>
        )
    }
}

export default Menu