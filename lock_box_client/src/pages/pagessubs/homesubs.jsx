import {Link, Outlet, Route, Routes} from "react-router-dom";

export function HomeSubstitution() {

    {/* Retorna la vista */
    }
    return (
        <section className="text-charcoal w-4/5 bg-white body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center lg:w-2/3 w-full">
                    <div className="flex justify-items-center py-10 font-semibold text-black divide-x-1">
                        <Link to="encrypt"
                              className="flex justify-center items-center rounded-l-md bg-color3 w-1/3 h-16">
                            <span className="btm-nav-label">Encrypt</span>
                        </Link>
                        <Link className="bg-color1 w-1/3 h-16 flex justify-center items-center" to="decrypt">
                            <span className="btm-nav-label">Decrypt</span>
                        </Link>
                        <Link className="rounded-r-md bg-color4 w-1/3 h-16 flex justify-center items-center"
                              to="attack">
                            <span className="btm-nav-label">Attack</span>
                        </Link>
                    </div>
                    <div>
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Crypto System
                            Substitution</h1>
                        <p className="mb-8 leading-relaxed">Substitution crypto-system is a fundamental concept in
                            cryptography, involving the replacement of elements of plaintext (usually letters) with
                            other elements to encrypt a message.</p>
                        <p className="mb-2 leading-relaxed">While basic substitution ciphers are not secure for serious
                            use in the digital age, understanding them is crucial for learning the foundations of
                            encryption and cryptography. They also have educational value in demonstrating the evolution
                            of cryptographic techniques.</p>

                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}