import {Link, Outlet, Route, Routes} from "react-router-dom";

export function HomeVigenere() {

    {/* Retorna la vista */
    }
    return (
        <section className="text-charcoal w-4/5 bg-white body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center lg:w-2/3 w-full">
                    <div className="flex justify-items-center py-10 font-semibold text-black divide-x-1">
                        <Link to="encrypt"
                              className="flex justify-center items-center rounded-l-md bg-color3 w-1/2 h-16">
                            <span className="btm-nav-label">Encrypt</span>
                        </Link>
                        <Link className="bg-color4 rounded-r-md w-1/2 h-16 flex justify-center items-center"
                              to="decrypt">
                            <span className="btm-nav-label">Decrypt</span>
                        </Link>
                    </div>
                    <div>
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Crypto System
                            Vigenere</h1>
                        <p className="mb-8 leading-relaxed">The Vigenère Crypto-system is a method of encrypting
                            alphabetic text through a simple form of poly alphabetic substitution, which is a
                            significant step forward from simpler crypto-systems like the Caesar cipher. It was widely
                            regarded as unbreakable for many years and is named after Blaise de Vigenère, although it
                            was first described by Giovan Battista Bellaso.</p>
                        <p className="mb-2 leading-relaxed">
                            On this page you will find two tools to encrypt and decrypt using the Vigenère cipher, an
                            alphabetic text encryption method that uses a series of interlocking Caesar ciphers based on
                            the letters of a keyword. You can access them through the encrypt and decrypt buttons, where
                            we explain how to use this tool effectively.
                        </p>
                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}