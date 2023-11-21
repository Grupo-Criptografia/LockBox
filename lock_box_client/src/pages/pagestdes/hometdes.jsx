import {Link, Outlet} from "react-router-dom";

export function HomeTdes() {

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
                            TDES</h1>
                        <p className="mb-4 leading-relaxed">Triple Data Encryption Standard (TDES), also known as Triple
                            DES, 3DES, or TDEA (Triple Data Encryption Algorithm), is an advanced form of the Data
                            Encryption Standard (DES), a symmetric-key block cipher.</p>
                        <p className="mb-1 leading-relaxed">
                            TDES served as an important bridge in cryptography, offering enhanced security over DES
                            until more advanced algorithms like AES became standard. It's a testament to the evolving
                            nature of cryptographic practices and the continuous quest for more secure encryption
                            methods.
                        </p>
                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}