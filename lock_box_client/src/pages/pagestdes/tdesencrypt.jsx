import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {createTdes} from "../../api/lockbox.api.js";
import * as Yup from "yup";

export function TdesEncrypt() {

    const [data, setData] = useState({
        plain_img: '',
        cipher_img: '',
        k: "",
        mode: ""
    })


    const onSubmitHandler = async (data) => {

        data.method = "encrypt"
        console.log(data)

        try {
            const response = await createTdes(data)
            setData(response)
        } catch (error) {
            console.log('Error: ', error)
        }
    }


    return (
        <div className="w-full h-screen bg-ivory flex flex-col items-center justify-center">
            <section className="text-charcoal w-full body-font">
                <div
                    className="flex flex-col w-3/4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:flex-row md:h-50">
                    <div className="md:flex md:w-1/2 md:items-center bg-charcoal">
                        <div className="px-4 py-4 ml-8">

                            <h2 className="text-2xl font-semibold text-ivory md:text-ivory"> Information Data
                            </h2>

                            <p className="mt-2 text-base text-ivory md:text-ivory">
                                Plain text: {data.plain_img}
                            </p>

                            <p className="mt-2 text-base text-ivory md:text-ivory">
                                Key: {data.k}
                            </p>

                            {data.cipher_img !== "" && (
                                <p
                                    className="mt-2 text-base text-ivory md:text-ivory">Cipher text
                                    : {data.cipher_img} </p>
                            )}

                        </div>
                    </div>
                    <div className="flex md:w-1/2 items-center justify-center pb-6 md:py-0">
                        <Formik
                            initialValues={
                                {
                                    plain_img: '',
                                    k: ''
                                }
                            }

                            validationSchema={Yup.object().shape({
                                plain_img: Yup.mixed()
                                    .required("Image is required"),
                                k: Yup.string()
                                    .required("Key is required")
                            })}
                            onSubmit={onSubmitHandler}>

                            <Form className="w-5/6" encType="multipart/form-data">
                                <div className="flex flex-col px-6 py-6 my-5 overflow-hidden rounded-lg">
                                    <div className="relative flex items-center">
                                        <div className="flex w-full flex-col">
                                            <div>
                                                <Field type="file" name="plain_img"
                                                       accept='image/jpeg, image/png'
                                                       className="block w-full py-3 text-charcoal bg-white border rounded-lg px-11 focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                            </div>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy"
                                                              name="plain_img"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 relative flex items-center">
                                        <div className="flex w-full flex-col">
                                            <div>
                                                <Field as="select" name="mode"
                                                       className="block w-full py-3 text-charcoal bg-white border rounded-lg px-11 focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                                    <option value="ECB">ECB</option>
                                                    <option value="CBC">CBC</option>
                                                    <option value="OFB">OFB</option>
                                                    <option value="CFB">CFB</option>
                                                    <option value="CTR">CTR</option>
                                                </Field>
                                            </div>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy"
                                                              name="mode"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex">
                                            <span className="absolute mt-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     fill="currentColor"
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