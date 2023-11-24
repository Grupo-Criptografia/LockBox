/* eslint-disable react/no-unescaped-entities */
import React, {useEffect, useState} from "react";
import {createPermutation} from '../../api/lockbox.api.js'
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

export function PermutationDecrypt() {

    const [data, setData] = useState({
        plain_text: "",
        cipher_text: "",
        k: "",
    })

    const onSubmitHandler = async (data) => {
        data.method = "decrypt"
        console.log(data)
        try {
            const response = await createPermutation(data)
            const k_string = response.k.join(", ")
            setData({
                plain_text: response.plain_text,
                cipher_text: response.cipher_text,
                k: k_string
            })
        } catch (error) {
            console.log('Error: ', error)
        }
    }


    return (
        <section className=" flex flex-col bg-white h-full w-full text-charcoal body-font">
            <div className="container w-full px-5 py-16 mx-auto">

                {/* Guia de uso formulario */}
                <div>
                    <div className="text-center w-full mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                            User Guide for Permutation Decryption
                        </h1>
                        <p className="text-base leading-relaxed xl:w-2/4 md:w-3/4 mx-auto">Welcome to the Permutation
                            Cipher Decryption Tool! This tool is designed to help you decrypt text that has been
                            encrypted using a permutation cipher. Below are the steps on how to use this tool
                            effectively to decrypt your text.</p>
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
                                            In the first field of the form, enter the cipher text that you want to
                                            decrypt.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                            2. Enter the Decryption Key (k):
                                        </h2>
                                        <p className="leading-relaxed">In the second field, you need to input the
                                            decryption key. This key should represent the original order of characters
                                            or groups of characters in the plaintext before they were permuted.</p>
                                        <p className="leading-relaxed">The decryption key is usually a sequence of
                                            numbers indicating the positions of characters in the original text. For
                                            example, if the key is "3-1-2", it means that the third character in the
                                            encrypted text was originally first, the first character was second, and the
                                            second character was third</p>
                                    </div>
                                </div>
                                <div className="flex col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            3. Decrypt the Text:
                                        </h2>
                                        <p className="leading-relaxed">
                                            Once you've entered the cipher text and the decryption key, click the
                                            "Decrypt" button.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            4. Show Results:
                                        </h2>
                                        <p className="leading-relaxed">
                                            On the side of the form, you will see the result: your plain text, the
                                            encryption key used, and the encrypted text.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex col-span-2 pb-6">
                                <div className="flex flex-col pl-4">
                                    <h2 className="font-medium title-font text-base text-color3 mb-1 tracking-wider">Note</h2>
                                    <p className="leading-relaxed">
                                        Decryption of permutation ciphers requires the correct decryption key. Without
                                        it, decrypting the text accurately is challenging.
                                    </p>
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
                                Form Decrypt
                            </h1>
                            <Formik
                                initialValues={{
                                    cipher_text: '',
                                    k: ''
                                }}

                                validationSchema={Yup.object({
                                    cipher_text: Yup.string()
                                        .uppercase()
                                        .strict()
                                        .required("Cipher text is required"),
                                    k: Yup.string()
                                        .required("Key is required")
                                        .test("Key valida", "List size does not partition the plain text", function (value) {
                                            const {cipher_text} = this.parent;
                                            const keysArray = value.split(",").map((key) => Number(key.trim()));
                                            return cipher_text.length % keysArray.length === 0;
                                        })
                                        .test("Key valida", "Do not repeat numbers", function (value) {
                                            const keysArray = value.split(",").map((key) => Number(key.trim()));
                                            const uniqueKeys = new Set(keysArray);
                                            return uniqueKeys.size === keysArray.length
                                        })
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
                                            <label className="font-medium">Cipher Text</label>
                                            <Field placeholder="Enter cipher text" as="textarea" name="cipher_text"
                                                   className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 h-32 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy"
                                                              name="cipher_text"/>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="font-medium">Key</label>
                                            <Field placeholder="Enter key" type="text" name="k"
                                                   className="block w-full mt-2 placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy" name="k"/>
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
                        <div className="flex flex-col pl-12 w-10/12">
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
                                                    <span className="font-bold">Key:</span> {data.k}</p>
                                            </li>
                                            <li className="list-disc">
                                                <p className="mt-2 text-md break-all">
                                                    <span className="font-bold">Plain text: </span> {data.plain_text}
                                                </p>
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