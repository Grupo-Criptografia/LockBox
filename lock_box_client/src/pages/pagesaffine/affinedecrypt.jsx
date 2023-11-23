import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {createAffine} from "../../api/lockbox.api.js";
import * as Yup from "yup";

export function AffineDecrypt() {

    const [data, setData] = useState({
        plain_text: "",
        cipher_text: "",
        k: [],
    })

    const onSubmitHandler = async (data) => {
        data.method = "decrypt";
        data.k = [data.a, data.b];
        try {
            const response = await createAffine(data)
            console.log("Response data: ", response)
            setData(response)
        } catch (error) {
            console.log('Error: ', error)
        }
    }


    return (
        <div className="flex flex-col bg-white w-full text-charcoal body-font">
            <div className="container w-full h-auto py-10 px-5 mx-auto"></div>
                {/* Guia de uso formulario */}
                <div>
                    <div className="text-center w-full mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                            User Guide for the Affine Decryption
                        </h1>
                        <p className="text-base leading-relaxed xl:w-2/4 md:w-3/4 mx-auto">
                        Welcome to Lock Box Affine Decryption Tool. This tool allows you to Decrypt
                        messages that have been encrypted using the Affine cipher. In this guide, we will explain how to use it so you can start yout journy with the Affine decrypt tool.
                        </p>
                    </div>
                    <div className="container px-5 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap justify-center w-full">
                            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-1 md:w-3/4 md:pr-10 md:py-6">
                                <div className="flex pb-6 col-span-2 md:col-span-1 w-full">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            1. Enter the Plain Text:
                                        </h2>
                                        <p className="leading-relaxed">
                                            In the first field of the form, enter the cipher text that you want to
                                            decrypt.
                                            This can be a message or a phrase.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                            2. Enter the Decryption Key (k):
                                        </h2>
                                        <p className="leading-relaxed">the decryption key for the Affine cipher involves two numerical keys, denoted as 'a' and 'b.' 
                                        These keys are integral to reversing the encryption transformation and revealing the original message.</p>
                                        <p className="leading-relaxed pt-2">For the key 'a' and 'b' this should be the multiplicative modular inverse of the 'a' and 'b' values used during encryption.  </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            3. Decrypt the Text:
                                        </h2>
                                        <p className="leading-relaxed">
                                            Once you've entered the cipher text and the encryption key, click the
                                            "Decrypt" button.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            4. Obtain the results:
                                        </h2>
                                        <p className="leading-relaxed">
                                            On the side of the form, you will see the results: your cipher text, the
                                            decryption key used, and the plain text.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 pb-6">
                                    <div className="flex flex-col pl-4">
                                        <h2 className="font-medium title-font text-base text-color3 mb-1 tracking-wider">Note</h2>
                                        <p className="leading-relaxed">
                                            It's important to use the correct key. If an incorrect key is used or if the
                                            ciphertext was encrypted using a different method, the decryption will not
                                            yield
                                            the original plain text.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <section className="text-charcoal w-full body-font">
                <div
                    className="flex flex-col w-3/4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:flex-row md:h-50">
                    <div className="md:flex md:w-1/2 md:items-center bg-charcoal">
                        <div className="px-4 py-4 ml-8">

                            <h2 className="text-2xl font-semibold text-ivory md:text-ivory"> Information Data
                            </h2>

                            <p className="mt-2 text-base text-ivory md:text-ivory">
                                Cipher text: {data.cipher_text}
                            </p>

                            <p className="mt-2 text-base text-ivory md:text-ivory">
                                Key: {data.k}
                            </p>

                            {data.plain_text !== "" && (
                                <p
                                    className="mt-2 text-base text-ivory md:text-ivory">
                                    Plain text : {data.plain_text} </p>
                            )}

                        </div>
                    </div>
                    <div className="flex md:w-1/2 items-center justify-center pb-6 md:py-0">
                        <Formik
                            initialValues={
                                {
                                    cipher_text: '',
                                    a: '',
                                    b: ''
                                }
                            }

                            validationSchema={Yup.object({
                                cipher_text: Yup.string()
                                    .uppercase()
                                    .strict()
                                    .required("Cipher text is required"),
                                a: Yup.number()
                                    .required("Key a is required")
                                    .test("inverse_mod_26", "Key 'a' is not an inverse mod 26", function (value) {
                                        if (value < 0 || value >= 26) {
                                            return true;
                                        }

                                        for (let i = 0; i < 26; i++) {
                                            if ((value * i) % 26 === 1) {
                                                return true;
                                            }
                                        }

                                        return false;
                                    }),
                                b: Yup.number()
                                    .required("Key b is required")
                            })}

                            onSubmit={(values, {resetForm}) => {
                                onSubmitHandler(values).then(() => {
                                    resetForm();
                                }).catch(error => {
                                    console.error("Error en el envio", error);
                                })
                            }}>

                            <Form className="w-5/6">
                                <div className="flex flex-col px-6 py-6 my-5 overflow-hidden rounded-lg">
                                    <div className="relative flex items-center">
                                        <div className="flex w-full flex-col">
                                            <div>
                                            <span className="absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     fill="currentColor"
                                                     className="w-6 h-6 mx-3 my-3 text-charcoal">
                                                    <path
                                                        d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"/>
                                                </svg>
                                            </span>
                                                <Field type="text" name="cipher_text"
                                                       className="block w-full py-3 text-charcoal bg-white border rounded-lg px-11 focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                       placeholder="Enter cipher text"/>
                                            </div>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy"
                                                              name="cipher_text"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex">
                                        <span className="absolute mt-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                 fill="currentColor"
                                                 className="w-6 h-6 mx-3 text-charcoal">
                                                <path fillRule="evenodd"
                                                      d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </span>
                                        <div className="flex w-full flex-col">
                                            <div>
                                                <Field type="number" name="a"
                                                       className="block w-full py-3 text-charcoal bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                       placeholder="Enter key a"/>
                                            </div>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className=" font-normal text-xs text-red-500"
                                                              name="a"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex">
                                        <span className="absolute mt-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                 fill="currentColor"
                                                 className="w-6 h-6 mx-3 text-charcoal">
                                                <path fillRule="evenodd"
                                                      d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </span>
                                        <div className="flex w-full flex-col">
                                            <div>
                                                <Field type="number" name="b"
                                                       className="block w-full py-3 text-charcoal bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                       placeholder="Enter key b"/>
                                            </div>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className=" font-normal text-xs text-red-500"
                                                              name="b"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full justify-end mt-4">
                                        <button type="submit"
                                                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-poppy rounded-md hover:bg-charcoal focus:outline-none focus:bg-charcoal">Decrypt
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>

            </section>
        </div>
    )
}