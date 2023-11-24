import {Link, Outlet, Route, Routes} from "react-router-dom";

export function HomeShift() {

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
                            Shift</h1>
                        <p className="mb-8 leading-relaxed">The Shift Cryptosystem, also known as the Caesar Cipher, is
                            one of the simplest and most widely known encryption techniques. Its history dates back to
                            Julius Caesar, who used it in his private correspondence</p>
                        <p className="mb-2 leading-relaxed"></p>

                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}