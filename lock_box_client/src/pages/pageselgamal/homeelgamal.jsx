import {Link, Outlet} from "react-router-dom";

export function HomeElGamal() {

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
                        <Link className="bg-color4 w-1/2 h-16 rounded-r-md flex justify-center items-center"
                              to="decrypt">
                            <span className="btm-nav-label">Decrypt</span>
                        </Link></div>
                    <div>
                        <h1 className="title-font sm:text-4xl text-3xl mb-6 font-medium text-gray-900">Crypto System
                            ElGamal</h1>
                        <p className="mb-4 leading-relaxed">The ElGamal crypto-system is a public-key encryption system
                            that provides an alternative to the widely known RSA encryption. Developed by Taher Elgamal
                            in 1984, it's based on the Diffie-Hellman key exchange principle and operates within the
                            domain of discrete logarithms, a fundamental concept in number theory and cryptography.</p>
                        <p className="mb-1 leading-relaxed">
                            ElGamal's significance lies in its contribution to the field of asymmetric cryptography,
                            providing a secure and reliable method for digital communication in an increasingly
                            connected world. Its mathematical foundation and adaptability make it a staple topic in the
                            study of cryptography.
                        </p>
                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}