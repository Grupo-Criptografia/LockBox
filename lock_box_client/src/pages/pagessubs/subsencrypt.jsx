import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {getSubstitution} from "../../api/lockbox.api.js";
import * as Yup from "yup";

export function SubsEncrypt() {

    const [data, setData] = useState({
        plain_text: "",
        cipher_text: "",
        k: "",
        list_attack: {}
    })

    const onSubmitHandler = async (data) => {
        data.method = "encrypt"
        try {
            const response = await getSubstitution(data)
            setData(response.data)
        } catch (error) {
            console.log('Error: ', error)
        }
    }


    return (
        <div className="w-full h-screen bg-ivory flex flex-col items-center justify-center">
            <section className="text-charcoal w-full body-font">
                <div className="flex flex-col w-3/4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:flex-row md:h-50">
                    <div className="md:flex md:w-1/2 md:items-center bg-charcoal">
                        <div className="px-4 py-4 ml-8">

                            <h2 className="text-2xl font-semibold text-ivory md:text-ivory"> Information Data
                            </h2>

                            <p className="mt-2 text-base text-ivory md:text-ivory">
                                Plain text: {data.plain_text}
                            </p>

                            <p className="mt-2 text-base text-ivory md:text-ivory">
                                Key: {data.k}
                            </p>

                            {data.cipher_text !== "" && (
                                <p
                                    className="mt-2 text-base text-ivory md:text-ivory">Cipher text
                                    : {data.cipher_text} </p>
                            )}

                        </div>
                    </div>
                    <div className="flex md:w-1/2 items-center justify-center pb-6 md:py-0">
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
                                    .min(26, "The permutation contain 26 letters")
                                    .max(26, "The permutation contain 26 letters")
                                    .uppercase("The permutation is in UPPERCASE")
                                    .strict()
                                    .required("Key is required")
                            })}

                            onSubmit={onSubmitHandler}>
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
                                                <Field type="text" name="plain_text"
                                                       className="block w-full py-3 text-charcoal bg-white border rounded-lg px-11 focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                       placeholder="Enter plain text"/>
                                            </div>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy"
                                                              name="plain_text"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex">
                                    <span className="absolute mt-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-6 h-6 mx-3 text-charcoal">
                                            <path fillRule="evenodd"
                                                  d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </span>
                                        <div className="flex w-full flex-col">
                                            <div>
                                                <Field type="text" name="k"
                                                       className="block w-full py-3 text-charcoal bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                       placeholder="Enter key"/>
                                            </div>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className=" font-normal text-xs text-red-500"
                                                              name="k"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full justify-end mt-4">
                                        <button type="submit"
                                                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-poppy rounded-md hover:bg-charcoal focus:outline-none focus:bg-charcoal">Encrypt
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