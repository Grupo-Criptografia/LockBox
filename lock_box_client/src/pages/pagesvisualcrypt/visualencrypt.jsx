import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import {createVisualCrypt} from "../../api/lockbox.api.js";
import * as Yup from "yup";

export function VisualEncrypt() {

    const [data, setData] = useState(null);

    const initialValues = {
        image: null, // Este campo almacenará la imagen seleccionada
    };

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('plain_img', values.image);
            formData.append('share_img1', '');
            formData.append('share_img2', '');
            formData.append('method', 'encrypt');

            // Envía la imagen al servidor utilizando Axios
            const response = await createVisualCrypt(formData)
            setData(response)

            // Realiza cualquier acción adicional después de enviar la imagen
        } catch (error) {
            console.error('Error al enviar la imagen:', error);
        }
    };

    return (
        <section className=" flex flex-col bg-white h-full w-full text-charcoal body-font">

            <div className="container w-full px-5 py-16 mx-auto">
                {/* Guia de uso formulario */}
                <div>
                    <div className="text-center w-full mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                            User Guide for Visual Encrypt
                        </h1>
                    </div>
                    <div className="container px-5 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap justify-center w-full">
                            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-1 md:w-3/4 md:pr-10 md:py-6">
                                <div className="flex pb-6 col-span-2 md:col-span-1 w-full">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            1. Select the Image to encrypt:
                                        </h2>
                                        <p className="leading-relaxed">
                                            In the first field of the form, choose the image you wish to encrypt.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                        ¿How does it work?
                                        </h2>
                                        <p className="leading-relaxed mt-1"> Step by step guide overview</p>
                                        <ul className="ml-5 list-disc">
                                            <li>
                                                <p className="leading-relaxed mt-1"> The image is uploaded and converted to binary grayscale (black and white). </p>
                                            </li>
                                            <li>
                                                <p className="leading-relaxed mt-1"> Two matrices of the same dimension as the original image are generated. </p>
                                            </li>
                                            <li>
                                                <p className="leading-relaxed mt-1"> For each black pixel in the original image, random bits are generated and for each white pixel, bits are generated that, when overlapped, will maintain the integrity of the original pixel. </p>
                                            </li>
                                            <li>
                                                <p className="leading-relaxed mt-1"> Las matrices de transparencias se guardan como imágenes. </p>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                                <div className="flex col-span-2 pb-6">
                                    <div className="flex flex-col pl-4">
                                        <h2 className="font-medium title-font text-base text-color3 mb-1 tracking-wider">Note</h2>
                                        <p className="leading-relaxed">
                                            Remember save the shares generated in the process of encryption.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Formulario y resultado */}

                <div className="flex flex-col md:flex-row w-full mx-auto">
                    <div className="md:w-1/2 w-full h-1/2 flex justify-center">
                        <div
                            className="flex flex-col bg-color1 text-charcoal w-3/4  md:w-3/4 overflow-hidden rounded-lg h-auto shadow-lg items-center justify-center py-5">
                            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font mb-4">
                                Form Encrypt Image
                            </h1>

                            <Formik initialValues={initialValues}
                                    onSubmit={onSubmit}>
                                {({setFieldValue}) => (
                                    <Form className="w-10/12">
                                        <div className="grid grid-cols-1 gap-1 mt-4">
                                            <div className="grid grid-cols-1 gap-1 mt-4">
                                                <label className="font-medium">Image</label>
                                                <input className="rounded-md border-gray-300 bg-white"
                                                       type="file"
                                                       name="image"
                                                       onChange={(event) => {
                                                           setFieldValue('image', event.currentTarget.files[0]);
                                                       }}
                                                />
                                            </div>

                                        </div>

                                        <div className="flex justify-end mt-6">
                                            <button type="submit"
                                                    className="px-8 py-2.5 leading-5 text-ivory bg-color3 rounded-md">
                                                Encrypt
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div
                        className="md:w-1/2 w-full md:mt-0 mt-5 flex justify-center items-center">
                        <div className="flex flex-col w-10/12">
                            {data?.share_img1 ?
                                <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                                    <div className="flex items-center px-6 py-3 bg-color3">
                                        <h2 className="text-xl font-semibold text-white">Results</h2>
                                    </div>

                                    <div className="px-6 py-4">
                                        <ul className="ml-5">
                                            <li className="list-disc">
                                                <p className="mt-2 text-md font-bold">Share Image 1:</p>
                                                <img src={`data:image/png;base64,${data.share_img1}`}
                                                     alt="Share Image 1"
                                                     className="max-w-full max-h-60"/>
                                                <a href={`data:image/png;base64,${data.share_img1}`}
                                                   download="share_image1.png"
                                                   className="text-blue-500 hover:underline">
                                                    Download Share Image 1
                                                </a>
                                            </li>

                                            <li className="list-disc">
                                                <p className="mt-2 text-md font-bold">Share Imagen 2: </p>
                                                <img src={`data:image/png;base64,${data.share_img2}`}
                                                     alt="Share Image 2"
                                                     className="max-w-full max-h-60"/>
                                                <a href={`data:image/png;base64,${data.share_img2}`}
                                                   download="share_image2.png"
                                                   className="text-blue-500 hover:underline">
                                                    Download Share Image 2
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                :
                                <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                                    <div className="flex items-center px-6 py-3 bg-color3">
                                        <h2 className="text-xl font-semibold text-white">Results</h2>
                                    </div>

                                    <div className="px-6 py-4">
                                        <p className="py-2 text-charcoal">Please enter data in the form to obtain
                                            results!</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}