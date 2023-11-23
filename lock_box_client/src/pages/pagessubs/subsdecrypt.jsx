import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {createSubstitution} from "../../api/lockbox.api.js";
import * as Yup from "yup";

export function SubsDecrypt() {

    const [data, setData] = useState({
        plain_text: "",
        cipher_text: "",
        k: "",
        list_attack: {}
    })

    const onSubmitHandler = async (data) => {
        data.method = "decrypt"
        try {
            const response = await createSubstitution(data)
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
                            User Guide for Substitution Decryption
                        </h1>
                        <p className="text-base leading-relaxed xl:w-2/4 md:w-3/4 mx-auto">Welcome to the Substitution
                            Cipher Encryption Tool. This tool enables you to encrypt plain text using a substitution
                            cipher, where each letter in the text is replaced with another letter from a scrambled
                            alphabet (the key). Here's how to use it effectively:</p>
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
                                            In the first field of the form, enter the cipher text you wish to decrypt.
                                            This text should be the result of a substitution encryption process.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                            2. Enter the Decryption Key (k):
                                        </h2>
                                        <p className="leading-relaxed">In the second field, input the decryption key.
                                            This key is a specific permutation of the 26 letters of the alphabet. It
                                            dictates how each letter in the cipher text will be substituted to reveal
                                            the plain text.</p>
                                    </div>
                                </div>
                                <div className="flex col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            3. Decrypt the Text:
                                        </h2>
                                        <p className="leading-relaxed">
                                            After entering the cipher text and the decryption key, click the "Decrypt"
                                            button.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            4. Show Results:
                                        </h2>
                                        <p className="leading-relaxed">
                                            On the side of the form, you will see the result: your cipher text, the
                                            decryption key used, and the plain text.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 pb-6">
                                    <div className="flex flex-col pl-4">
                                        <h2 className="font-medium title-font text-base text-color3 mb-1 tracking-wider">Note</h2>
                                        <p className="leading-relaxed">
                                            The accuracy of the decryption heavily relies on the correctness of the
                                            decryption key. If the key is incorrect or improperly formatted, the
                                            decrypted text will not match the original plain text.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario y resultado */}
                <div className="flex flex-col md:flex-row w-full mx-auto">
                    <div className="md:w-1/2 w-full flex justify-center h-auto">
                        <div
                            className="flex flex-col bg-color1 text-charcoal w-3/4  md:w-3/4 overflow-hidden rounded-lg h-auto shadow-lg items-center justify-center py-5">
                            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font mb-4">
                                Form Decrypt
                            </h1>
                            <Formik
                                initialValues={
                                    {
                                        cipher_text: '',
                                        k: ''
                                    }
                                }

                                validationSchema={Yup.object({
                                    cipher_text: Yup.string()
                                        .required("Plain text is required"),
                                    k: Yup.string()
                                        .min(26, "The permutation contain 26 letters")
                                        .max(26, "The permutation contain 26 letters")
                                        .required("Key is required")
                                        .test("no-repeat", "Plain text must not be a permutation of alphabet",
                                            value => {
                                                if (value.length !== 26) return false;

                                                const alphabet = 'abcdefghijklmnopqrstuvwxyz';
                                                const valueLowercase = value.toLowerCase();
                                                return alphabet.split('').every(letter => valueLowercase.includes(letter));
                                            })
                                })}

                                onSubmit={onSubmitHandler}>
                                <Form className="w-3/4">
                                    <div className="grid grid-cols-1 gap-1 mt-4">
                                        <div>
                                            <label className="font-medium">Cipher text</label>
                                            <Field placeholder="Enter cipher text" as="textarea" name="cipher_text"
                                                   className="block uppercase mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 h-32 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy"
                                                              name="cipher_text"/>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="font-medium">Key</label>
                                            <Field placeholder="Enter key" type="text" name="k"
                                                   className="block uppercase w-full mt-2 placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy" name="k"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <button type="submit"
                                                className="px-8 py-2.5 leading-5 text-ivory transition-colors duration-300 transform bg-color3 rounded-md hover:bg-charcoal focus:outline-none focus:bg-charcoal">
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