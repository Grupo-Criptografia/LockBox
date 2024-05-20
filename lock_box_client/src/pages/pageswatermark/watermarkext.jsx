import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import {createWatermark} from "../../api/lockbox.api.js";

export function WatermarkExt() {

    const [data, setData] = useState(null);

    const initialValues = {
        image: null, // Este campo almacenará la imagen seleccionada
    };

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('original_img', '');
            formData.append('watermark_img', values.image);
            formData.append('method', 'extract');

            // Envía la imagen al servidor utilizando Axios
            const response = await createWatermark(formData)
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
                            User Guide for Extract Watermark
                        </h1>
                    </div>
                    <div className="container px-5 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap justify-center w-full">
                            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-1 md:w-3/4 md:pr-10 md:py-6">
                                <div className="flex pb-6 col-span-2 md:col-span-1 w-full">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            1. Select the image from wich you want to extract the watermark:
                                        </h2>
                                        <p className="leading-relaxed">
                                            In the first field of the form, choose the image that contain the watermark.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                            2. Reconstruction of the marked image:
                                        </h2>
                                        <p className="leading-relaxed">
                                            Application of the inverse Wavelet transformation to the modified coefficients to reconstruct the marked image in the Wavelet domain.
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
                                Form Extract Watermark
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
                                                Extract
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
                            {data?.ext_watermark_img ?
                                <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                                    <div className="flex items-center px-6 py-3 bg-color3">
                                        <h2 className="text-xl font-semibold text-white">Results</h2>
                                    </div>

                                    <div className="px-6 py-4">
                                        <ul className="ml-5">
                                            <li className="list-disc">
                                                <p className="mt-2 text-md font-bold">Extract Watermark:</p>
                                                <img src={`data:image/png;base64,${data.ext_watermark_img}`}
                                                     alt="Watermrk Ext"
                                                     className="max-w-full max-h-60"/>
                                                <a href={`data:image/png;base64,${data.ext_watermark_img}`}
                                                   download="extracted_watermark.png"
                                                   className="text-blue-500 hover:underline">
                                                    Download Extracted Watermark
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