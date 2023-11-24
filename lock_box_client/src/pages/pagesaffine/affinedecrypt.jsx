import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {createAffine} from "../../api/lockbox.api.js";
import * as Yup from "yup";

export function AffineDecrypt() {

    const [data, setData] = useState({
        plain_text: "",
        cipher_text: "",
        k: [],
    })

    const onSubmitHandler = async (data) => {
        data.method = "decrypt";
        data.k = [data.a, data.b];
        try {
            const response = await createAffine(data)
            console.log("Response data: ", response)
            setData(response)
        } catch (error) {
            console.log('Error: ', error)
        }
    }


    return (
        <section className=" flex flex-col bg-white w-full text-charcoal body-font">
            <div className="flex flex-col bg-white w-full text-charcoal body-font">
                <div className="container w-full h-auto py-10 px-5 mx-auto"></div>
                {/* Guia de uso formulario */}
                <div>
                    <div className="text-center w-full mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                            User Guide for the Affine Decryption
                        </h1>
                        <p className="text-base leading-relaxed xl:w-2/4 md:w-3/4 mx-auto">
                            Welcome to Lock Box Affine Decryption Tool. This tool allows you to Decrypt
                            messages that have been encrypted using the Affine cipher. In this guide, we will explain
                            how to use it so you can start yout journy with the Affine decrypt tool.
                        </p>
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
                                            In the first field of the form, enter the cipher text that you want to
                                            decrypt.
                                            This can be a message or a phrase.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                            2. Enter the Decryption Key (k):
                                        </h2>
                                        <p className="leading-relaxed">the decryption key for the Affine cipher involves
                                            two numerical keys, denoted as 'a' and 'b.'
                                            These keys are integral to reversing the encryption transformation and
                                            revealing the original message.</p>
                                        <p className="leading-relaxed pt-2">For the key 'a' and 'b' this should be the
                                            multiplicative modular inverse of the 'a' and 'b' values used during
                                            encryption. </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            3. Decrypt the Text:
                                        </h2>
                                        <p className="leading-relaxed">
                                            Once you've entered the cipher text and the encryption key, click the
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
                                            On the side of the form, you will see the results: your cipher text, the
                                            decryption key used, and the plain text.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 pb-6">
                                    <div className="flex flex-col pl-4">
                                        <h2 className="font-medium title-font text-base text-color3 mb-1 tracking-wider">Note</h2>
                                        <p className="leading-relaxed">
                                            It's important to use the correct key. If an incorrect key is used or if the
                                            ciphertext was encrypted using a different method, the decryption will not
                                            yield
                                            the original plain text.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*creacion formulario e insertado de datos */}
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
                                        a: '',
                                        b: ''
                                    }
                                }

                                validationSchema={Yup.object({
                                    cipher_text: Yup.string()
                                        .uppercase()
                                        .strict()
                                        .required("Cipher text is required"),
                                    a: Yup.number()
                                        .required("Key a is required")
                                        .test("inverse_mod_26", "Key 'a' is not an inverse mod 26", function (value) {
                                            if (value < 0 || value >= 26) {
                                                return true;
                                            }

                                            for (let i = 0; i < 26; i++) {
                                                if ((value * i) % 26 === 1) {
                                                    return true;
                                                }
                                            }

                                            return false;
                                        }),
                                    b: Yup.number()
                                        .required("Key b is required")
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
                                            <Field placeholder="Enter cipher text" as="textarea" name="cipher_text"
                                                   className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 h-32 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs text-poppy"
                                                              name="cipher_text"/>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="font-medium">Key a</label>
                                            <Field placeholder="Enter key" type="number" name="a"
                                                   className="block w-full mt-2 placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs" name="a"/>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="font-medium">Key b</label>
                                            <Field placeholder="Enter key" type="number" name="b"
                                                   className="block w-full mt-2 placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                            <div className="text-red-600 text-xs font-semibold">
                                                <ErrorMessage className="font-normal text-xs" name="b"/>
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
                            </Formik>
                        </div>
                    </div>
                    {/* Casilla que bota el resultado */}
                    <div
                        className="md:w-1/2 w-full md:mt-0 mt-5 flex justify-center items-center">
                        <div className="flex flex-col pl-12 w-full">
                            {data?.cipher_text ?
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
                                                    key a: {data.k[0]}
                                                </p>
                                            </li>
                                            <li className="list-disc">
                                                <p className="mt-2 text-md">
                                                    key b: {data.k[1]}
                                                </p>
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