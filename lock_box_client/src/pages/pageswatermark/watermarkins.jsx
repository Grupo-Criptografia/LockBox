import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import {createWatermark} from "../../api/lockbox.api.js";

export function WatermarkIns() {

    const [data, setData] = useState(null);

    const initialValues = {
        image1: null,
        image2: null// Este campo almacenará la imagen seleccionada
    };


    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('original_img', values.image1);
            formData.append('watermark_img', values.image2);
            formData.append('method', 'insert');

            // Envía la imagen al servidor utilizando Axios
            const response = await createWatermark(formData)
            setData(response)

            // Realiza cualquier acción adicional después de enviar la imagen
        } catch (error) {
            console.error('Error al enviar las imágenes:', error);
        }
    };

    return (
        <section className=" flex flex-col bg-white h-full w-full text-charcoal body-font">

            <div className="container w-full px-5 py-16 mx-auto">
                {/* Guia de uso formulario */}
                <div>
                    <div className="text-center w-full mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                            User Guide for inserting the Watermark in an Image
                        </h1>
                    </div>
                    <div className="container px-5 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap justify-center w-full">
                            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-1 md:w-3/4 md:pr-10 md:py-6">
                                <div className="flex pb-6 col-span-2 md:col-span-1 w-full">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            1. Decomposition of images in the wavelet domain
                                        </h2>
                                        <ul className="ml-5 list-disc">
                                            <li>
                                                <p className="leading-relaxed mt-1">The discrete wavelet transform is applied to the original image to obtain the wavelet coefficients, 
                                                    this are segregate in LL, LH, HL or HH.</p>                        
                                            </li>
                                            <li>
                                                <p className="leading-relaxed mt-1">The discrete wavelet transform is applied to the watermark to obtain its wavelet coefficients.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                            2. Dip the watermark into the original image:
                                        </h2>
                                        <p className="leading-relaxed">
                                        The category of Wavelet coefficients (LL, LH, HL or HH) of the original image are selected, the selected coefficients are combined with the corresponding coefficients of the watermark using a weighted sum.
                                        </p>
                                    </div>
                                </div>                        
                                <div className="flex col-span-2 pb-6">
                                    <div className="flex flex-col pl-4">
                                        <h2 className="font-medium title-font text-base text-color3 mb-1 tracking-wider">Note</h2>
                                        <p className="leading-relaxed">
                                            Remember save the image return by the program so you can extract the original image.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Formulario y resultado */}

                <div className="flex flex-col md:flex-row w-full mx-auto">
                    <div className="md:w-1/2 w-full flex justify-center">
                        <div
                            className="flex flex-col bg-color1 text-charcoal w-3/4  md:w-3/4 overflow-hidden rounded-lg h-auto shadow-lg items-center justify-center py-5">
                            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font mb-4">
                                Form to insert Watermark
                            </h1>

                            <Formik initialValues={initialValues}

                                    onSubmit={onSubmit}>
                                {({setFieldValue}) => (
                                    <Form className="w-10/12">
                                        <div className="grid grid-cols-1 gap-1 mt-4">
                                            <div className="grid grid-cols-1 gap-1 mt-4">
                                                <label className="font-medium">Share Image 1</label>
                                                <input className="rounded-md border-gray-300 bg-white"
                                                       type="file"
                                                       name="image1"
                                                       onChange={(event) => {
                                                           setFieldValue('image1', event.currentTarget.files[0]);
                                                       }}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 gap-1 mt-4">
                                                <label className="font-medium">Share Image 2</label>
                                                <input className="rounded-md border-gray-300 bg-white"
                                                       type="file"
                                                       name="image2"
                                                       onChange={(event) => {
                                                           setFieldValue('image2', event.currentTarget.files[0]);
                                                       }}
                                                />
                                            </div>

                                        </div>

                                        <div className="flex justify-end mt-6">
                                            <button type="submit"
                                                    className="px-8 py-2.5 leading-5 text-ivory bg-color3 rounded-md">
                                                Insert
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
                            {data?.watermarked_img ?
                                <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                                    <div className="flex items-center px-6 py-3 bg-color3">
                                        <h2 className="text-xl font-semibold text-white">Results</h2>
                                    </div>

                                    <div className="px-6 py-4">
                                        <ul className="ml-5">
                                            <li className="list-disc">
                                                <p className="mt-2 text-md font-bold">Image with watermark:</p>
                                                <img src={`data:image/png;base64,${data.watermarked_img}`}
                                                     alt="Image with watermark"
                                                     className="max-w-full max-h-60"/>
                                                <a href={`data:image/png;base64,${data.watermarked_img}`}
                                                   download="img_watermark.png"
                                                   className="text-blue-500 hover:underline">
                                                    Download Image
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
