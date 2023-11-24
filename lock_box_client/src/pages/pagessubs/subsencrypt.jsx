import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {createSubstitution} from "../../api/lockbox.api.js";
import * as Yup from "yup";

export function SubsEncrypt() {

    const [data, setData] = useState({
        plain_text: "",
        cipher_text: "",
        k: "",
        list_attack: {}
    })

    const generateSubsKey = async () => {
        const alfabeto = 'abcdefghijklmnopqrstuvwxyz'.split('');
        for (let i = alfabeto.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [alfabeto[i], alfabeto[j]] = [alfabeto[j], alfabeto[i]];
        }
        return alfabeto.join('').toUpperCase();
    }

    const onSubmitHandler = async (data) => {
        data.method = "encrypt"
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
                            User Guide for Substitution Encryption
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
                                            1. Enter the Plain Text:
                                        </h2>
                                        <p className="leading-relaxed">
                                            In the first field of the form, enter the plain text that you want to
                                            encrypt.
                                            This can be a message or a phrase.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                            2. Enter the Encryption Key (k):
                                        </h2>
                                        <p className="leading-relaxed">In the second field, enter your encryption key.
                                            This key is a permutation of the 26-letter alphabet. Each letter in the
                                            alphabet is replaced by another letter; for instance, 'A' might be replaced
                                            by 'M', 'B' by 'Z', and so on. Ensure that every letter is used once and
                                            only once in your key</p>
                                    </div>
                                </div>
                                <div className="flex col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            3. Encrypt the Text:
                                        </h2>
                                        <p className="leading-relaxed">
                                            Once you've entered the plain text and the encryption key, click the
                                            "Encrypt" button.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            4. Decrypted Text:
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
                                            To decrypt the text, the recipient must use the same substitution key.
                                            Decryption involves replacing each letter of the ciphertext with the
                                            corresponding letter from the original alphabet.
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
                                Form Encrypt
                            </h1>
                            <Formik
                                initialValues={
                                    {
                                        plain_text: '',
                                        k: ''
                                    }
                                }

                                validationSchema={Yup.object({
                                    plain_text: Yup.string()
                                        .required("Plain text is required"),
                                    k: Yup.string()
                                        .required("Key is required")
                                        .test("no-repeat", "Plain text must not be a permutation of alphabet",
                                            value => {
                                                if (value.length !== 26) return false;

                                                const alphabet = 'abcdefghijklmnopqrstuvwxyz';
                                                const valueLowercase = value.toLowerCase();
                                                return alphabet.split('').every(letter => valueLowercase.includes(letter));
                                            })
                                })}

                                onSubmit={(values, {resetForm}) => {
                                    onSubmitHandler(values).then(() => {
                                        resetForm();
                                    }).catch(error => {
                                        console.error("Error to send: ", error)
                                    })
                                }}>
                                {({setFieldValue}) => (
                                    <Form className="w-10/12">
                                        <div className="grid grid-cols-1 gap-1 mt-4">
                                            <div>
                                                <label className="font-medium">Plain text</label>
                                                <Field placeholder="Enter plain text" as="textarea" name="plain_text"
                                                       className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 h-32 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                                <div className="text-red-600 text-xs font-semibold">
                                                    <ErrorMessage className="font-normal text-xs text-poppy"
                                                                  name="plain_text"/>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <label className="font-medium">Key</label>
                                                <Field placeholder="Enter key" type="text" name="k"
                                                       className="block w-full mt-2 placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                                <button type="button"
                                                        className="px-8 py-2.5 mt-2 leading-5 text-ivory bg-charcoal rounded-md"
                                                        onClick={async () => {
                                                            const key = await generateSubsKey();
                                                            setFieldValue('k', key);
                                                        }}
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
                            {data?.cipher_text ?
                                <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                                    <div className="flex items-center px-6 py-3 bg-color3">
                                        <h2 className="text-xl font-semibold text-white">Results</h2>
                                    </div>

                                    <div className="px-6 py-4">
                                        <ul className="ml-5">
                                            <li className="list-disc">
                                                <p className="mt-2 text-md break-all">
                                                    <span className="font-bold">Plain text:</span> {data.plain_text}</p>
                                            </li>
                                            <li className="list-disc">
                                                <p className="mt-2 text-md break-all">
                                                    <span className="font-bold">Key:</span> {data.k}</p>
                                            </li>
                                            <li className="list-disc">
                                                <p className="mt-2 text-md break-all">
                                                    <span className="font-bold">Cipher text:</span> {data.cipher_text}
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