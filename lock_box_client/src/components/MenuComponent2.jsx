import {Component} from "react";
import {Link} from "react-router-dom";

class Menu2 extends Component {
    render() {
        return (
            <aside class="flex flex-col w-1/5 px-4 py-8 bg-white border-r rtl:border-r-0 rtl:border-l">
                <img src="./src/assets/img/lockbox_logo-2.png" className="w-auto h-auto" alt="logo"/>

                <ul className="menu py-8 px-0">
                    <li><Link class="font-semibold text-black dark:text-white" to="/">Home</Link></li>
                    <li>
                        {/*Establecemos el menu desplegable para los cifrados clasicos*/}
                        <details open>
                            <summary className="font-semibold text-black dark:text-white">Classic ciphers</summary>
                            <ul>
                                <li><Link class="font-semibold text-black dark:text-white" to="/home/shift">Shift
                                    cipher</Link></li>
                                <li><a className="font-semibold text-black dark:text-white">Affine cipher</a></li>
                                {/*Consideramos que el cifrado Vigenere es cifrado y analisis */}
                                <li><Link className="font-semibold text-black dark:text-white" to="/home/vigenere">Vigenère
                                    cipher</Link></li>
                                <li><a className="font-semibold text-black dark:text-white">Permutation cipher</a></li>
                                {/*Debe haber cifrado de texto e imagen */}
                                <li><a className="font-semibold text-black dark:text-white">Hill cipher</a></li>
                                {/*Consideramos el cifrado y el analisis de frecuencia*/}
                                <li><a className="font-semibold text-black dark:text-white">Substitution cipher</a></li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        {/*Establecemos el menu desplegable para los cifrados en bloque*/}
                        <details>
                            <summary className="font-semibold text-black dark:text-white">Blocks ciphers</summary>
                            <ul>
                                <li><a className="font-semibold text-black dark:text-white">SDES cipher</a></li>
                                <li><a className="font-semibold text-black dark:text-white">TDES cipher</a></li>
                                <li><a className="font-semibold text-black dark:text-white">AES cipher</a></li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        {/*Establecemos el menu desplegable para los cifrados de clave publica*/}
                        <details>
                            <summary className="font-semibold text-black dark:text-white">Public key ciphers</summary>
                            <ul>
                                <li><a className="font-semibold text-black dark:text-white">RSA cipher</a></li>
                                <li><a className="font-semibold text-black dark:text-white">Rabin cipher</a></li>
                                <li><a className="font-semibold text-black dark:text-white">El Gamal cipher</a></li>
                                <li><a className="font-semibold text-black dark:text-white">Menezes-Vaston cipher</a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li><a className="font-semibold text-black dark:text-white">Digital signature</a></li>
                </ul>
            </aside>
        )
    }
}

export default Menu2