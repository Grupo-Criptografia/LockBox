import {useEffect, useState} from "react";
import {createElgamal} from '../../api/lockbox.api.js'
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

export function ElgamalDecrypt() {

    const [data, setData] = useState(null)

    useEffect(() => {
        console.log(data)
    }, [data]);


    const onSubmitHandler = async (data) => {
        data.method = "decrypt"
        try {
            const response = await createElgamal(data)
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
                            User Guide for ElGamal Decryption
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
                                            In the decryption tool or form, input the ciphertext you received. This is
                                            typically a tuple of numbers (let's call them ) representing the encrypted
                                            data.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                            2. Enter Your Private Key:
                                        </h2>
                                        <p className="leading-relaxed">Input your private key. Unlike the public key
                                            used for encryption, the private key is only known to you and is used to
                                            decrypt the received message. It's crucial to keep this key secure.
                                        </p>
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
                                            On the side of the form, the results will be displayed: the encrypted text,
                                            your private key, and the plain text (decrypted message).
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 pb-6">
                                    <div className="flex flex-col pl-4">
                                        <h2 className="font-medium title-font text-base text-color3 mb-1 tracking-wider">Note</h2>
                                        <p className="leading-relaxed">
                                            Like most public-key cryptosystems, ElGamal is typically used for encrypting
                                            small amounts of data, such as keys for symmetric encryption algorithms,
                                            rather than large datasets directly, due to computational efficiency.
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
                                Form Decrypt
                            </h1>
                            <Formik
                                initialValues={{
                                    cipher_text: '',
                                    private_key: ''
                                }}

                                validationSchema={Yup.object({
                                    cipher_text: Yup.string()
                                        .required("Cipher text is required"),
                                    private_key: Yup.string()
                                        .required("Private key is required")
                                        .matches(/^\(\d+,\s*\d+,\s*\d+\)$/, "Private key must be a tuple of 5 elements")
                                })}

                                onSubmit={(values, {resetForm}) => {
                                    onSubmitHandler(values).then(() => {
                                        resetForm();
                                    }).catch(error => {
                                        console.error("Error en el envio", error);
                                    })
                                }}>
                                <Form className="w-10/12">
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
                        <div className="flex flex-col w-10/12">
                            {data?.plain_text ?
                                <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                                    <div className="flex items-center px-6 py-3 bg-color3">
                                        <h2 className="text-xl font-semibold text-white">Results</h2>
                                    </div>

                                    <div className="px-6 py-4">
                                        <ul className="ml-5">
                                            <li className="list-disc">
                                                <p className="mt-2 text-md break-all">
                                                    <span className="font-bold">Cipher text:</span> {data.cipher_text}
                                                </p>
                                            </li>
                                            <li className="list-disc">
                                                <p className="mt-2 text-md break-all">
                                                    <span className="font-bold">Private Key:</span> {data.private_key}
                                                </p>
                                            </li>
                                            <li className="list-disc">
                                                <p className="mt-2 text-md break-all">
                                                    <span className="font-bold">Plain text:</span> {data.plain_text}</p>
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
    )
}