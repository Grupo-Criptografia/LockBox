import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {createTdes} from "../../api/lockbox.api.js";
import * as Yup from "yup";

export function TdesEncrypt() {

    const [data, setData] = useState(null);

    const initialValues = {
        image: null, // Este campo almacenará la imagen seleccionada
        k: '',
        mode: 'ECB'
    };

    const generateTDESKey = () => {
        let key = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < 24; i++) {
            key += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return key;
    }

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('plain_img', values.image);
            formData.append('k', values.k);
            formData.append('cipher_img', '');
            formData.append('mode', values.mode);
            formData.append('method', 'encrypt');

            // Envía la imagen al servidor utilizando Axios
            const response = await createTdes(formData)
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
                            User Guide for TDES Encryption
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
                                            In the first field of the form, choose the image you wish to encrypt. It's
                                            important to ensure that the image is compatible with the block size used by
                                            TDES. TDES processes data in fixed-size blocks, so larger images may need to
                                            be segmented or resized.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                            2. Enter the Encryption Key (k):
                                        </h2>
                                        <p className="leading-relaxed">For TDES encryption, provide a 24-byte (192-bit)
                                            key. This is effectively three 8-byte (64-bit) keys concatenated together,
                                            each satisfying the 56-bit key requirement of DES, with parity bits. </p>
                                        <p className="leading-relaxed mt-1"> Example of TDES keys (in text format):</p>
                                        <ul className="ml-5 list-disc">
                                            <li>
                                                <p className="leading-relaxed mt-1"> Key 1: 1234567890ABCDEF12345678</p>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                                <div className="flex md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            3. Choose Encryption Mode:
                                        </h2>
                                        <p className="leading-relaxed">
                                            Select the mode of operation for the encryption (ECB, CBC, OFB, CFB, CTR).
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            4. Encrypt the Image:
                                        </h2>
                                        <p className="leading-relaxed">
                                            Once you've entered the image and the encryption key, click the
                                            "Encrypt" button.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            5. Obtain the results:
                                        </h2>
                                        <p className="leading-relaxed">
                                            On the side of the form, you will see the result: your origin image, the
                                            decryption key used, and the cipher image.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 pb-6">
                                    <div className="flex flex-col pl-4">
                                        <h2 className="font-medium title-font text-base text-color3 mb-1 tracking-wider">Note</h2>
                                        <p className="leading-relaxed">
                                            Remember save the cipher imagen and the key that you used to encrypt.
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
                                Form Encrypt Image
                            </h1>

                            <Formik initialValues={initialValues}

                                    validationSchema={Yup.object({
                                        k: Yup.string()
                                            .required("Key is required")
                                            .test("Valid key", "The key must not be whitespace.", function (value) {
                                                return value.split(" ").join("").length === value.length;
                                            })
                                    })}

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

                                            <div className="grid grid-cols-1 gap-1 mt-4">
                                                <label className="font-medium">Mode</label>
                                                <Field as="select" name="mode" className="rounded-md">
                                                    <option value="ECB">ECB</option>
                                                    <option value="CBC">CBC</option>
                                                    <option value="OFB">OFB</option>
                                                    <option value="CFB">CFB</option>
                                                    <option value="CTR">CTR</option>
                                                </Field>
                                            </div>

                                            <div className="mt-3">
                                                <label className="font-medium">Key</label>
                                                <Field placeholder="Enter key" type="text" name="k"
                                                       className="block w-full mt-2 placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                                <button type="button"
                                                        className="px-8 py-2.5 mt-2 leading-5 text-ivory bg-charcoal rounded-md"
                                                        onClick={() => setFieldValue('k', generateTDESKey())}
                                                >
                                                    Generate Key
                                                </button>
                                                <div className="text-red-600 text-xs font-semibold">
                                                    <ErrorMessage className="font-normal text-xs" name="k"/>
                                                </div>
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
                            {data?.cipher_img ?
                                <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                                    <div className="flex items-center px-6 py-3 bg-color3">
                                        <h2 className="text-xl font-semibold text-white">Results</h2>
                                    </div>

                                    <div className="px-6 py-4">
                                        <ul className="ml-5">
                                            <li className="list-disc">
                                                <p className="mt-2 text-md break-all">
                                                    <span className="font-bold">Key:</span> {data.k}</p>
                                            </li>

                                            <li className="list-disc">
                                                <p className="mt-2 text-md">
                                                    <span className="font-bold">Mode:</span> {data.mode}</p>
                                            </li>

                                            <li className="list-disc">
                                                <p className="mt-2 text-md font-bold">Plain Image:</p>
                                                <img src={`data:image/png;base64,${data.plain_img}`}
                                                     alt="Encrypted Image"
                                                     className="max-w-full max-h-60"/>
                                            </li>

                                            <li className="list-disc">
                                                <p className="mt-2 text-md font-bold">Cipher Image: </p>
                                                <img src={`data:image/png;base64,${data.cipher_img}`}
                                                     alt="Decrypted Image"
                                                     className="max-w-full max-h-60"/>
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
