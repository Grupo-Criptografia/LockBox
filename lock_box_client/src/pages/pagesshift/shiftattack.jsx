/* eslint-disable react/no-unescaped-entities */
import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {getShift} from "../../api/lockbox.api.js";
import * as Yup from "yup";

export function ShiftAttack() {

    const [data, setData] = useState({
        cipher_text: "",
        k: 0,
        list_plain_text: []
    });

    const listRender = data.list_plain_text.map((plain_text, index) => (
        <p className=" text-center text-base text-charcoal" key={index}>{index + 1}. {plain_text}</p>
    ));

    async function onSubmitHandler(values) {
        values.method = "attack";
        try {
            const response = await getShift(values)
            setData(response)
        } catch (error) {
            console.log("Error", error)
        }
    }

    return (
        <section className=" flex flex-col bg-white h-full w-full text-charcoal body-font">

            <div className="container w-full px-5 py-16 mx-auto">
                {/* Guia de uso formulario */}
                <div className="text-center w-full mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                        User Guide for Shift Decryption Attack
                    </h1>
                    <p className="text-base leading-relaxed xl:w-2/4 md:w-3/4 mx-auto">
                        Welcome to Lock Box Shift Decryption Attack Tool. This tool allows you to decrypt
                        messages that have been encrypted using a Caesar cipher. In this guide, we will explain how
                        to use it to explore all 94 possible shifts and reveal the decrypted text.
                    </p>
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
                                        decrypt. This can be a message or a phrase.
                                    </p>
                                </div>
                            </div>
                            <div className="flex col-span-1 pb-6">
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                        2. Initiate the Attack:
                                    </h2>
                                    <p className="leading-relaxed">
                                        Click the "Attack" button form to begin the decryption attack process.
                                    </p>
                                </div>
                            </div>
                            <div className="flex md:col-span-2 pb-6">
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                        3. Encrypted Text:
                                    </h2>
                                    <p className="leading-relaxed">
                                        On the side of the form, you will find a list of all 26 possible shifts
                                        along with the corresponding decrypted text for each shift. Each shift
                                        represents an attempt to decrypt the message using a different shift value.
                                    </p>
                                </div>
                            </div>
                            <div className="flex col-span-2 pb-6">
                                <div className="flex flex-col pl-4">
                                    <h2 className="font-medium title-font text-base text-color2 mb-1 tracking-wider">Note</h2>
                                    <p className="leading-relaxed">
                                        Please remember that this attack assumes that the text has been encrypted
                                        using a Shift Cipher. It may not be effective if another encryption method
                                        is used or if the language of the message is unknown.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario y resultado */}
                <div className="flex flex-col w-full justify-center items-center mx-auto">
                    <div className="w-2/3 flex justify-center h-auto">
                        <div
                            className="flex flex-col bg-color1 text-charcoal h-auto md:w-3/4 overflow-hidden rounded-lg shadow-lg items-center justify-center py-5">
                            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font mb-4">
                                Form Attack
                            </h1>
                            <Formik
                                initialValues={{
                                    cipher_text: '',
                                }}

                                validationSchema={Yup.object({
                                    cipher_text: Yup.string()
                                        .required("Plain text is required"),
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
                                                   className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 h-40 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs "
                                                              name="cipher_text"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <button type="submit"
                                                className="px-8 py-2.5 leading-5 text-ivory transition-colors duration-300 transform bg-color3 rounded-md hover:bg-charcoal focus:outline-none focus:bg-charcoal">
                                            Attack
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    <div
                        className="w-full mt-10 md:border-l flex justify-center items-center">
                            {data.list_plain_text?.length ?
                            <div className="w-3/5 overflow-hidden bg-white rounded-lg shadow-lg">
                                <div className="flex items-center px-6 py-3 bg-color3">
                                    <h2 className="text-xl font-semibold text-white">Results</h2>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-1 ml-1 mr-1 p-2">
                                    {listRender}
                                </div>
                            </div>
                                :                                
                            <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg">
                                <div className="flex items-center px-6 py-3 bg-color3">
                                    <h2 className="text-xl font-semibold text-white">Results</h2>
                                </div>

                                <div className="px-6 py-4">
                                    <p className="py-2 text-charcoal">Please enter a cipher text to show a list of possible plain text.</p>
                                </div>
                            </div>
                            }
                    </div>
                </div>
            </div>
        </section>

    )
}