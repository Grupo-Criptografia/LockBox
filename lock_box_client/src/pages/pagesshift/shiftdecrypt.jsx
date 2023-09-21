import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {getShift} from "../../api/lockbox.api.js";
import * as Yup from 'yup';


export function ShiftDecrypt() {

    const [data, setData] = useState({
        plain_text: "",
        cipher_text: "",
        k: 0,
        list_plain_text: [],
    });

    async function onSubmitHandler(values) {
        values.method = "decrypt";
        console.log("Values", values)
        try {
            const response = await getShift(values)
            console.log("Response", response)
            setData(response.data)
        } catch (error) {
            console.log("Error", error)
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div>
                <section
                    className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:flex-row md:h-50">
                    <div
                        className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-charcoal">
                        <div className="max-h-1/2 px-6 py-6 md:px-8 md:py-0">

                            <h2 className="text-2xl font-semibold text-ivory md:text-ivory">
                                Information Data
                            </h2>

                            <p className="mt-2 text-base text-ivory md:text-ivory">
                                Cipher text: {data.cipher_text}
                            </p>

                            <p className="mt-2 text-base text-ivory md:text-ivory">
                                Key: {data.k}
                            </p>

                            {data.plain_text !== "" && (
                                <p
                                    className="mt-2 text-base text-ivory md:text-ivory">Plain text
                                    : {data.plain_text} </p>
                            )}

                        </div>
                    </div>

                    <div className="flex w-full items-center justify-center pb-6 md:py-0 md:w-1/2">

                        <Formik
                            initialValues={
                                {
                                    cipher_text: '',
                                    k: ''
                                }
                            }

                            validationSchema={Yup.object({
                                cipher_text: Yup.string()
                                    .required("Cipher text is required"),
                                k: Yup.number()
                                    .min(1, "The min number of key is 1")
                                    .max(26, "The max number key is 26")
                                    .required("Key is required")
                            })}

                            onSubmit={onSubmitHandler}>
                            <Form>
                                <div className="flex flex-col px-6 py-6 my-5 overflow-hidden rounded-lg">
                                    <div className="relative flex items-center">
                                        <div className="flex flex-col">
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
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-6 h-6 mx-3 text-charcoal">
                                            <path fillRule="evenodd"
                                                  d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </span>
                                        <div className="flex flex-col">
                                            <div>
                                                <Field type="number" name="k"
                                                       className="block w-full py-3 text-charcoal bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                       placeholder="Enter key"/>
                                            </div>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className=" font-normal text-xs text-red-500" name="k"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-4">
                                        <button type="submit"
                                                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-poppy rounded-md hover:bg-charcoal focus:outline-none focus:bg-charcoal">Encrypt
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </section>
            </div>
        </div>
    )


}