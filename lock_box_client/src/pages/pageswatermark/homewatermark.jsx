import {Link, Outlet} from "react-router-dom";

export function HomeWatermark() {

    {/* Retorna la vista */
    }
    return (
        <section className="text-charcoal w-4/5 bg-white body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center lg:w-2/3 w-full">
                    <div className="flex justify-items-center py-10 font-semibold text-black divide-x-1">
                        <Link to="insert"
                              className="flex justify-center items-center rounded-l-md bg-color3 w-1/2 h-16">
                            <span className="btm-nav-label">Insert</span>
                        </Link>
                        <Link className="bg-color4 w-1/2 h-16 rounded-r-md flex justify-center items-center"
                              to="extract">
                            <span className="btm-nav-label">Extract</span>
                        </Link></div>
                    <div>
                        <h1 className="title-font sm:text-4xl text-3xl mb-6 font-medium text-gray-900">Water Mark in Images</h1>
                        <p className="mb-4 leading-relaxed">
                            Implementation of an algorithm for the insertion of robust digital watermarks in images in 
                            the frequency domain using the discrete Wavelet transform so that it is difficult to detect 
                            and remove without affecting the visual quality of the image, the Wavelet method allows 
                            dispersing the information through different levels of image detail.
                        </p>
                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}