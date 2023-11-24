import {Link, Outlet} from "react-router-dom";

export function HomePermutation() {

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
                        <Link className="rounded-r-md bg-color4 w-1/2 h-16 flex justify-center items-center"
                              to="decrypt">
                            <span className="btm-nav-label">Decrypt</span>
                        </Link>
                    </div>
                    <div>
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Crypto System
                            Shift</h1>
                        <p className="mb-8 leading-relaxed">Permutation cryptosystems, a fundamental approach in the
                            realm of cryptography that plays a pivotal role in securing digital communications. Our
                            exploration is centered on how permutation, or the rearrangement of elements, can transform
                            plain text into unreadable ciphertext, and vice versa.</p>
                        <p className="mb-2 leading-relaxed">Permutation crypto-system works by rearranging the
                            characters or bits of the plaintext in a specific, predetermined order. This rearrangement
                            is governed by an encryption key, which dictates the pattern of permutation.</p>
                        <p className="mb-2 leading-relaxed"></p>

                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}