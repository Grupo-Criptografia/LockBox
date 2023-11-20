import {useEffect, useState} from "react";
import {createRsa} from '../../api/lockbox.api.js'
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

export function RsaDecrypt() {

    const [data, setData] = useState(null)

    useEffect(() => {
        console.log(data)
    }, [data]);


    const onSubmitHandler = async (data) => {
        data.method = "decrypt"
        try {
            const response = await createRsa(data)
            setData(response)
        } catch (error) {
            console.log('Error: ', error)
        }
    }


    return (
        <section className=" flex flex-col bg-white w-full text-charcoal body-font">
            <div className="container w-full px-5 py-16 mx-auto">
                {/* Guia de uso formulario */}
                <div>
                    <div className="text-center w-full mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                            User Guide for RSA Decryption
                        </h1>
                    </div>
                    <div className="container px-5 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap justify-center w-full">
                            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-1 md:w-3/4 md:pr-10 md:py-6">
                                <div className="flex pb-6 col-span-2 md:col-span-1 w-full">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            1. Enter the Cipher Text:
                                        </h2>
                                        <p className="leading-relaxed">
                                            In the first field of the form, input the cipher text (encrypted text) that
                                            you wish to decrypt. This is usually a string of what appears to be random
                                            characters.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                            2. Enter the Encryption Key (k):
                                        </h2>
                                        <p className="leading-relaxed">In the second field, input your RSA private key.
                                            This key is usually a long string of characters and includes 5 numbers:
                                            the modulus (n) and the private exponent (d).
                                        </p>
                                        <p className="leading-relaxed pt-2">Remember, the private key is used for
                                            decryption and must be kept confidential. It should never be shared or
                                            exposed to others.</p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            3. Encrypt the Text:
                                        </h2>
                                        <p className="leading-relaxed">
                                            Once you've entered the cipher text and the private key, click the
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
                                            On the side of the form, you will see the results: your plain text, the
                                            private key used, and the cipher text.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 pb-6">
                                    <div className="flex flex-col pl-4">
                                        <h2 className="font-medium title-font text-base text-color3 mb-1 tracking-wider">Note</h2>
                                        <p className="leading-relaxed">
                                            The private key used for decryption must correspond exactly to the public
                                            key used for encryption. If the wrong private key is used, the decryption
                                            process will not yield the original plain text.
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
                            className="flex flex-col bg-color1 text-charcoal w-3/4 rounded-lg shadow-lg items-center justify-center py-5">
                            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font mb-4">
                                Form Encrypt
                            </h1>
                            <Formik
                                initialValues={{
                                    cipher_text: '',
                                    private_key: ''
                                }}

                                validationSchema={Yup.object({
                                    cipher_text: Yup.string()
                                        .required("Plain text is required"),
                                    private_key: Yup.string()
                                        .required("Private key is required")
                                        .matches(/^\(\d+,\s*\d+,\s*\d+,\s*\d+,\s*\d+\)$/, "Private key must be a tuple of 5 elements")
                                })}

                                onSubmit={(values, {resetForm}) => {
                                    onSubmitHandler(values).then(() => {
                                        resetForm();
                                    }).catch(error => {
                                        console.error("Error en el envio", error);
                                    })
                                }}>
                                <Form className="w-3/4">
                                    <div className="grid grid-cols-1 gap-1 mt-4">
                                        <div>
                                            <label className="font-medium">Cipher text</label>
                                            <Field placeholder="Enter cipher text" as="textarea" name="cipher_text"
                                                   className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 h-32 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy"
                                                              name="cipher_text"/>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <label className="font-medium">Private Key</label>
                                            <Field placeholder="Enter key" as="textarea" name="private_key"
                                                   className="block w-full mt-2 placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy"
                                                              name="private_key"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <button type="submit"
                                                className="px-8 py-2.5 leading-5 text-ivory bg-color3 rounded-md">
                                            Decrypt
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>

                    <div
                        className="md:w-1/2 w-full md:mt-0 mt-5 flex justify-center items-center">
                        <div className="flex flex-col pl-12 w-full">
                            {data?.plain_text ?
                                <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg">
                                    <div className="flex items-center px-6 py-3 bg-color3">
                                        <h2 className="text-xl font-semibold text-white">Results</h2>
                                    </div>

                                    <div className="px-6 py-4">
                                        <ul className="ml-5">
                                            <li className="list-disc">
                                                <p className="mt-2 text-md">
                                                    Cipher text: {data.cipher_text}</p>
                                            </li>
                                            <li className="list-disc">
                                                <p className="mt-2 text-md">
                                                    Key: {data.k}</p>
                                            </li>
                                            <li className="list-disc">
                                                <p className="mt-2 text-md">
                                                    Plain text: {data.plain_text}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                :
                                <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg">
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
    )
}