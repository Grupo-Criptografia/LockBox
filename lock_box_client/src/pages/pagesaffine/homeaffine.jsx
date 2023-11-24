import {Link, Outlet} from "react-router-dom";

export function HomeAffine() {

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
                        <Link className="bg-color1 w-1/2 h-16 flex justify-center items-center"
                              to="decrypt">
                            <span className="btm-nav-label">Decrypt</span>
                        </Link>
                        <Link className="bg-color4 rounded-r-md w-1/2 h-16 flex justify-center items-center"
                              to="attack">
                            <span className="btm-nav-label">Attack</span>
                        </Link>
                    </div>
                    <div>
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Crypto System
                            Affine</h1>
                        <p className="mb-8 leading-relaxed">
                            The Affine cipher is a type of substitution cipher where each letter is transformed using a simple
                            mathematical function. It uses the formula E(x) = (a(x) + b) mod m , where a and b are key values.
                            The choice of a and b determines the encryption. While it adds complexity compared to
                            basic substitution ciphers, its security relies on keeping the key values secret. Although 
                            historically used, it has vulnerabilities, and its usage in modern cryptography is limited.
                        </p>
                        <p className="mb-2 leading-relaxed">
                            Operates on individual letters, making it suitable for encrypting messages 
                            composed solely of letters, while leaving non-letter characters unchanged. While it's a historical 
                            cipher with known vulnerabilities, it serves as an illustrative example of the principles behind more
                            complex encryption techniques.
                        </p>
                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}