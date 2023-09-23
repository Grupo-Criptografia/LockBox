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
        <p className="text-base text-charcoal" key={index}>{index + 1}. {plain_text}</p>
    ));

    async function onSubmitHandler(values) {
        values.method = "attack";
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
        <div className="w-full bg-ivory flex items-center justify-center">
            <section
                className="flex max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg flex-col">
                <div className="flex items-center justify-center w-full bg-charcoal">
                    <Formik
                        initialValues={
                            {
                                cipher_text: ''
                            }
                        }

                        validationSchema={Yup.object({
                            cipher_text: Yup.string()
                                .required("Cipher text is required"),
                        })}

                        onSubmit={onSubmitHandler}>
                        <Form>
                            <div
                                className="flex flex-col p-6 overflow-hidden">
                                <div className="flex flex-col">
                                    <div className="flex">
                                        <p className="py-2.5 px-3 text-charcoal bg-ivory border border-r-0 rtl:rounded-r-lg rtl:rounded-l-none rtl:border-l-0 rtl:border-r rounded-l-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor"
                                                 className="w-6 text-charcoal h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                                            </svg>
                                        </p>
                                        <Field type="text" name="cipher_text" placeholder="Enter cipher text"
                                               className="block w-full rounded-l-none rtl:rounded-l-lg rtl:rounded-r-none placeholder-gray-400 rounded-lg border border-blue-300 bg-white px-5 py-2.5 text-charcoal focus:bg-white focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"/>
                                    </div>
                                    <div className="text-red-600 text-xs font-semibold">
                                        <ErrorMessage className="font-normal text-xs text-poppy"
                                                      name="cipher_text"/>
                                    </div>
                                </div>
                                <div className="mt-2 flex justify-end">
                                    <button type="submit"
                                            className="px-4 py-3 text-sm font-medium tracking-wider text-ivory uppercase transition-colors duration-300 transform bg-poppy rounded-md hover:bg-ivory hover:text-charcoal focus:bg-ivory focus:outline-none">
                                        Attack
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>

                <div className="flex px-2 py-2 flex-col justify-center pb-6 w-full">
                    <span className="text-lg text-charcoal">The posible text plain is:</span>
                    {data.list_plain_text.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 mb-1 ml-1 mr-1 p-2">
                            {listRender}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}