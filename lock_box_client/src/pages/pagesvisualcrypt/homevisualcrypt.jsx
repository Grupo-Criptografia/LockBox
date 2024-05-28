import {Link, Outlet} from "react-router-dom";

export function HomeVisualCrypt() {

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
                        <h1 className="title-font sm:text-4xl text-3xl mb-6 font-medium text-gray-900">Visual Cryptography</h1>
                        <p className="mb-4 leading-relaxed">
                        Image encryption scheme based on a method known as visual cryptography, 
                        ideal for encrypting binary images. Its central idea is based on dividing 
                        an image into several "transparencies" -known as shares-  such that by superimposing these 
                        transparencies the original image is revealed. 
                        It is important to emphasize that each transparency by itself does not reveal 
                        information about the original image, ensuring confidentiality.
                        </p>
                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}