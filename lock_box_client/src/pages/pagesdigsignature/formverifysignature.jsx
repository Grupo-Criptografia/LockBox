import {useEffect, useState} from "react";
import {createRabin, createSignature, getShift} from '../../api/lockbox.api.js'
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast, ToastContainer} from "react-toastify";

export function FormVerifySignature() {

    const [data, setData] = useState(null)

    const onSubmitHandler = async (values) => {
        try {
            const formData = new FormData();
            formData.append('signature', values.signature);
            formData.append('message', values.message);
            formData.append('pk', '');
            formData.append('vk', values.vk);
            formData.append('method', 'verify');
            const response = await createSignature(formData)
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
                            User Guide for Verify Signature
                        </h1>
                    </div>
                    <div className="container px-5 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap justify-center w-full">
                            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-1 md:w-3/4 md:pr-10 md:py-6">
                                <div className="flex pb-6 col-span-2 md:col-span-1 w-full">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            1. Enter the Message Text:
                                        </h2>
                                        <p className="leading-relaxed">
                                            In the first field of the form, enter the message with which it was made the
                                            signature.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                            2. Enter the Signature.
                                        </h2>
                                        <p className="leading-relaxed">In the second field, enter your signature
                                            created.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            3. Enter the public:
                                        </h2>
                                        <p className="leading-relaxed">
                                            In the third field, enter the public key that was created when the digital
                                            signature was made.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            4. Verify Signature:
                                        </h2>
                                        <p className="leading-relaxed">
                                            Once you've entered the message, signature and the public key, click the
                                            "verify" button.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex md:col-span-2 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            5. Obtain Results:
                                        </h2>
                                        <p className="leading-relaxed">
                                            On the side of the form, the results will be displayed: the message,
                                            signature, the public key and a verification message.
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
                                Form Verification
                            </h1>
                            <Formik
                                initialValues={{
                                    message: '',
                                    signature: '',
                                    vk: ''
                                }}

                                validationSchema={Yup.object({
                                    message: Yup.string()
                                        .required("Message is required"),
                                    signature: Yup.string()
                                        .required("Signature is required"),
                                    vk: Yup.string()
                                        .required("Public Key is required")
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
                                            <label className="font-medium">Message</label>
                                            <Field placeholder="Enter message" as="textarea" name="message"
                                                   className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 h-40 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs"
                                                              name="message"/>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="font-medium">Signature</label>
                                            <Field placeholder="Enter signature" as="textarea" name="signature"
                                                   className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 h-32 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs"
                                                              name="signature"/>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="font-medium">Public Key</label>
                                            <Field placeholder="Enter public key" as="textarea" name="vk"
                                                   className="block w-full mt-2 placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs" name="vk"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <button type="submit"
                                                className="px-8 py-2.5 leading-5 text-ivory bg-color3 rounded-md">
                                            Verify Signature
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    <div
                        className="md:w-1/2 w-full md:mt-0 mt-5 flex justify-center items-center">
                        <div className="flex flex-col w-11/12">
                            {data ?
                                <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg">
                                    <div className="flex items-center px-6 py-3 bg-color3">
                                        <h2 className="text-xl font-semibold text-white">Results</h2>
                                    </div>

                                    <div className="px-6 py-4">
                                        <ul className="ml-5">
                                            <li className="list-disc">
                                                <p className="mt-2 text-md break-all">
                                                    <span className="font-bold">Message:</span> {data.message}</p>
                                            </li>
                                            <li className="list-disc">
                                                <p className="mt-2 text-md break-all">
                                                    <span className="font-bold">Signature:</span> {data.signature}</p>
                                            </li>
                                            <li className="list-disc">
                                                <p className="mt-2 text-md break-all">
                                                    <span className="font-bold">Public Key:</span> {data.vk}</p>
                                            </li>
                                            <li className="list-disc">
                                                <p className="mt-2 font-bold text-md break-all">
                                                    {data.response}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                :
                                <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg">
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