import {Link, Outlet} from "react-router-dom";

export function HomeRsa() {

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
                            RSA</h1>
                        <p className="mb-4 leading-relaxed">The RSA crypto-system is a foundational algorithm in the
                            field of public-key cryptography, named after its inventors Ron Rivest, Adi Shamir, and
                            Leonard Adleman who first publicly described it in 1978.</p>
                        <p className="mb-1 leading-relaxed">
                            RSA uses a pair of keys: a public key for encryption and a private key for decryption. The
                            public key can be shared openly, while the private key must be kept secret.
                        </p>
                        <p className="mb-1 leading-relaxed">
                            RSA crypto-system is a cornerstone of modern cryptographic applications, enabling secure
                            communication in an increasingly digital world. Its significance lies in its solid
                            mathematical foundation and its widespread adoption in ensuring the confidentiality and
                            integrity of digital data.
                        </p>
                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}