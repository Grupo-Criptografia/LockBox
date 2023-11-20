import {Link, Outlet} from "react-router-dom";

export function HomeHill() {

    {/* Retorna la vista */
    }
    return (
        <section className="text-charcoal w-4/5 bg-white body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center lg:w-2/3 w-full">
                    <div className="flex justify-items-center py-10 font-semibold text-black divide-x-1">
                        <Link to="encrypttext"
                              className="flex justify-center items-center rounded-l-md bg-color3 w-1/4 h-16">
                            <span className="btm-nav-label">Encrypt Text</span>
                        </Link>
                        <Link className="bg-color4 w-1/4 h-16 flex justify-center items-center"
                              to="decrypttext">
                            <span className="btm-nav-label">Decrypt Text</span>
                        </Link>
                        <Link to="encryptimg"
                              className="flex justify-center items-center bg-color3 w-1/4 h-16">
                            <span className="btm-nav-label">Encrypt Image</span>
                        </Link>
                        <Link className="bg-color4 rounded-r-md w-1/4 h-16 flex justify-center items-center"
                              to="decryptimg">
                            <span className="btm-nav-label">Decrypt Image</span>
                        </Link>
                    </div>
                    <div>
                        <h1 className="title-font sm:text-4xl text-3xl mb-6 font-medium text-gray-900">Crypto System
                            Hill</h1>
                        <p className="mb-4 leading-relaxed">The Hill cipher is a classic cryptographic algorithm that
                            represents an advancement in the field of symmetric-key encryption. Developed by the
                            mathematician Lester S. Hill in 1929, this crypto-system uses linear algebra as its basis,
                            making it distinct from simpler substitution ciphers like the Caesar cipher.</p>
                        <p className="mb-1 leading-relaxed">
                            On this page, you will discover four tools dedicated to encrypting and decrypting text or
                            image using the Hill Cipher, a method of cryptography that employs linear algebra and matrix
                            operations. This sophisticated approach to encryption uses square matrices as keys,
                            transforming blocks of text through algebraic manipulations. To access these tools, simply
                            navigate to the encrypt and decrypt buttons, where detailed instructions on how to
                            effectively utilize this advanced cryptographic system are provided.
                        </p>
                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}