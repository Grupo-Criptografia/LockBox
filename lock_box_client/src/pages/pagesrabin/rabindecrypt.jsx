import {useEffect, useState} from "react";
import {createRabin, getShift} from '../../api/lockbox.api.js'
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

export function RabinDecrypt() {

    const [data, setData] = useState({
        plain_text: "",
        cipher_text: "",
        n: 0,
        p: 0,
        q: 0
    })

    useEffect(() => {
        console.log(data)
    }, [data]);


    const onSubmitHandler = async (data) => {
        data.method = "decrypt"
        try {
            const response = await createRabin(data)
            setData(response)
        } catch (error) {
            console.log('Error: ', error)
        }
    }


    return (
        <section className=" flex flex-col bg-ivory h-full w-full text-charcoal body-font">

            <div className="container w-full px-5 py-16 mx-auto">
                {/* Guia de uso formulario */}
                <div className="text-center w-full mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                        User Guide for Shift Encryption
                    </h1>
                    <p className="text-base leading-relaxed xl:w-2/4 md:w-3/4 mx-auto">Welcome to the Shift Cipher
                        Encryption Tool. This tool allows you to encrypt plain text using a Shift cipher, where each
                        letter in the text is shifted by a fixed number of positions (the key). Below, we explain how to
                        use it effectively.</p>
                </div>
                <div className="container px-5 mx-auto flex flex-wrap">
                    <div className="flex flex-wrap justify-center w-full">
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-1 md:w-3/4 md:pr-10 md:py-6">
                            <div className="flex pb-6 col-span-2 md:col-span-1 w-full">
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                        1. Enter the Encrypted Text:
                                    </h2>
                                    <p className="leading-relaxed">
                                        In the first field of the form, enter the plain text that you want to encrypt.
                                        This can be a message or a phrase.
                                    </p>
                                </div>
                            </div>
                            <div className="flex col-span-2 md:col-span-1 pb-6">
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                        2. Enter the Encryption Key (k):
                                    </h2>
                                    <p className="leading-relaxed">In the second field, enter the encryption key (k)
                                        from the range of 1 to 26. This key determines the number of positions each
                                        letter will be shifted in the alphabet during encryption.For example, if you
                                        choose k = 3, the letter 'a' will be encrypted as 'd','b' as 'e', and so on</p>
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
                                    <h2 className="font-medium title-font text-base text-poppy mb-1 tracking-wider">Note</h2>
                                    <p className="leading-relaxed">
                                        Shift cipher decryption is a straightforward process, but it's important to use
                                        the correct key. If you suspect the ciphertext uses a different encryption
                                        method or an incorrect key, decryption may not yield the desired result.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario y resultado */}
                <div className="flex flex-col md:flex-row w-full mx-auto">
                    <div className="md:w-1/2 w-full flex justify-center h-auto">
                        <div
                            className="flex flex-col bg-white text-charcoal w-3/4  md:w-3/4 overflow-hidden rounded-lg h-auto shadow-lg items-center justify-center py-5">
                            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font mb-4">
                                Form Decrypt
                            </h1>
                            <Formik
                                initialValues={{
                                    cipher_text: '',
                                    p: '',
                                    q: ''
                                }}

                                validationSchema={Yup.object({
                                    cipher_text: Yup.string()
                                        .required("Cipher text is required"),
                                    p: Yup.number().required("Key p is required"),
                                    q: Yup.number().required("Key q is required")
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
                                            <Field placeholder="Enter plain text" as="textarea" name="cipher_text"
                                                   className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 h-32 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy"
                                                              name="plain_text"/>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="font-medium">Key p</label>
                                            <Field placeholder="Enter key p" as="textarea" name="p"
                                                   className="block w-full mt-2 placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy" name="p"/>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="font-medium">Key q</label>
                                            <Field placeholder="Enter key q" as="textarea" name="q"
                                                   className="block w-full mt-2 placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy" name="q"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <button type="submit"
                                                className="px-8 py-2.5 leading-5 text-ivory transition-colors duration-300 transform bg-poppy rounded-md hover:bg-charcoal focus:outline-none focus:bg-charcoal">
                                            Encrypt
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>

                    <div
                        className="md:w-1/2 w-full md:mt-0 mt-5 md:border-l md:border-charcoal flex justify-center items-center">
                        <div className="flex flex-col pl-12 w-full bg-ivory">
                            <h2 className="text-2xl font-semibold">
                                Information Data
                            </h2>

                            {data?.plain_text ?
                                <div>


                                    <p className="mt-2 text-xl">
                                        Posible plain text: {data.plain_text}
                                    </p>
                                    <p className="mt-2 text-xl">
                                        Key p: {data.p}
                                    </p>
                                    <p className="mt-2 text-xl">
                                        Key q: {data.q}
                                    </p>
                                    <p className="mt-2 text-xl">
                                        Cipher text: {data.cipher_text}
                                    </p>
                                </div>
                                :
                                <p
                                    className="mt-2 text-xl">
                                    Please enter a plaint text and key for show a cipher text.
                                </p>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}