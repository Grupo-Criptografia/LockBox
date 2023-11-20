import {Link, Outlet} from "react-router-dom";

export function HomeAes() {

    {/* Retorna la vista */
    }
    return (
        <section className="text-charcoal w-4/5 bg-white body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center lg:w-2/3 w-full">
                    <div className="flex justify-items-center py-10 font-semibold text-black divide-x-1">
                        <Link to="encrypt"
                              className="flex justify-center items-center rounded-l-md bg-color3 w-1/2 h-16">
                            <span className="btm-nav-label">Encrypt Text</span>
                        </Link>
                        <Link className="bg-color4 w-1/2 h-16 rounded-r-md flex justify-center items-center"
                              to="decrypt">
                            <span className="btm-nav-label">Decrypt Text</span>
                        </Link></div>
                    <div>
                        <h1 className="title-font sm:text-4xl text-3xl mb-6 font-medium text-gray-900">Crypto System
                            Tdes</h1>
                        <p className="mb-4 leading-relaxed">The Advanced Encryption Standard (AES) is a widely used
                            encryption algorithm, established as an encryption standard by the U.S. National Institute
                            of Standards and Technology (NIST) in 2001. AES is a symmetric key encryption algorithm,
                            which means it uses the same key for both encrypting and decrypting data. This is in
                            contrast to asymmetric key algorithms, which use different keys for encryption and
                            decryption.</p>
                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}