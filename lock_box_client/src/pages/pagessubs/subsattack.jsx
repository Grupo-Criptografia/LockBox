import {Field, Form, Formik} from "formik";
import {useState} from "react";
import {getSubstitution} from "../../api/lockbox.api.js";
import {Textarea} from "flowbite-react";

export function SubsAttack() {

    const [data, setData] = useState({
        plain_text: "",
        cipher_text: "",
        k: "",
        list_attack: {
            letters: [],
            bigrams: [],
            trigrams: []
        }
    })


    const listLettersRender = data.list_attack.letters.map((letter, index) => (
        <p className="leading-relaxed text-center mb-5" key={index}>{letter}</p>
    ));

    const listBigramsRender = data.list_attack.bigrams.map((bigram, index) => (
        <p className="leading-relaxed text-center mb-5" key={index}>{bigram}</p>
    ));

    const listTrigramsRender = data.list_attack.trigrams.map((trigram, index) => (
        <p className="leading-relaxed text-center mb-5" key={index}>{trigram}</p>
    ));


    const onSubmitHandler = async (data) => {
        data.method = "attack"
        try {
            const response = await getSubstitution(data)
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.log('Error: ', error)
        }
    }


    return (
        <section className=" flex flex-col bg-ivory h-full w-full text-charcoal body-font">
            <div className="container w-full px-5 py-16 mx-auto">
                <div className="text-center w-full mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                        Substitution Cipher Text Attack User Guide
                    </h1>
                    <p className="text-base leading-relaxed xl:w-2/4 md:w-3/4 mx-auto">Welcome to the Substitution
                        Cipher Text Analyzer. This tool allows you to unravel and
                        understand encrypted text that has been encoded using a substitution cipher. Below, we
                        explain how to use it easily and effectively</p>
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
                                        In the first field of the form, enter the encrypted text you want to attack.
                                        This text should be the message that has been encrypted using a substitution
                                        cipher.
                                    </p>
                                </div>
                            </div>
                            <div className="flex col-span-2 md:col-span-1 pb-6">
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                        2. Initiate the Attack:
                                    </h2>
                                    <p className="leading-relaxed">Click the "Attack" button or its equivalent in the
                                        form to start the process of analyzing the encrypted text.</p>
                                </div>
                            </div>
                            <div className="flex col-span-2 pb-6">
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                        3. Analysis Results:
                                    </h2>
                                    <p className="leading-relaxed">
                                        At the bottom of the form, you will find the results of the analysis. These
                                        results are divided into three sections:
                                    </p>

                                    <p className="flex items-center font-medium text-charcoal mb-2">
                                        <span
                                            className="w-2 h-2 mr-2 inline-flex items-center justify-center bg-poppy text-white rounded-full flex-shrink-0">
                                        </span>Letters Analysis
                                    </p>
                                    <p className="flex items-center text-charcoal mb-4 ml-4">
                                        This section displays the frequency of each letter in the encrypted text. It
                                        will help you identify the most common letters, which can be useful for
                                        deducing the permutation used in the cipher.
                                    </p>

                                    <p className="flex items-center font-medium text-charcoal mb-2">
                                        <span
                                            className="w-2 h-2 mr-2 inline-flex items-center justify-center bg-poppy text-white rounded-full flex-shrink-0">
                                        </span>Bigrams Analysis:
                                    </p>

                                    <p className="flex items-center text-charcoal mb-4 ml-4">
                                        Here, you'll see the most common pairs of letters (bigrams) in the encrypted
                                        text. You can use this information to decrypt the text, as some bigrams are
                                        more revealing than others.
                                    </p>

                                    <p className="flex items-center font-medium text-charcoal mb-2">
                                        <span
                                            className="w-2 h-2 mr-2 inline-flex items-center justify-center bg-poppy text-white rounded-full flex-shrink-0">
                                        </span>Trigrams Analysis:
                                    </p>

                                    <p className="flex items-center text-charcoal mb-4 ml-4">
                                        This section presents the most frequent groups of three letters (trigrams)
                                        in the encrypted text. Trigrams can provide additional clues for decrypting
                                        the message.
                                    </p>
                                </div>
                            </div>
                            <div className="flex col-span-2 pb-6">
                                <div className="flex flex-col pl-4">
                                    <h2 className="font-medium title-font text-base text-poppy mb-1 tracking-wider">Note</h2>
                                    <p className="leading-relaxed">
                                        Remember that the success in decrypting a substitution cipher-encrypted text
                                        depends on the complexity of the permutation used in the original cipher.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div
                    className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:flex-row md:h-auto">
                    <div
                        className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
                        <div className="px-6 py-6 md:px-8 md:py-0">
                            <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">Sign Up
                                For <span
                                    className="text-blue-600 dark:text-blue-400 md:text-blue-300">Project</span> Updates
                            </h2>

                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">Lorem
                                ipsum dolor sit, amet consectetur adipisicing elit. Consectetur obcaecati odio</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center pb-5 md:py-5 md:w-1/2">
                        <Formik initialValues={{
                            cipher_attack: ''
                        }} onSubmit={onSubmitHandler}>
                            <Form className="w-3/4">
                                <div className="grid grid-cols-1 gap-1 mt-4">
                                    <div>
                                        <Field placeholder="Cipher text" as="textarea" name="cipher_text"
                                               className="block  mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6">
                                    <button type="submit"
                                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-poppy rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                        Attack
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>

                {data.list_attack.letters.length > 0 && (
                    <div className="flex flex-wrap md:flex-row md:justify-start justify-center flex-col mt-10">
                        <div className="p-4 lg:w-1/3">
                            <div className="h-full flex items-start">
                                <div className="flex-grow pl-6">
                                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">Letters</h1>
                                    <div className="grid grid-cols-2 text-charcoal gap-2">
                                        {listLettersRender}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 md:border md:border-x-charcoal lg:w-1/3">
                            <div className="h-full flex items-start">
                                <div className="flex-grow pl-6">
                                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">Bigrams</h1>
                                    <div className="grid text-charcoal grid-cols-2 gap-2">
                                        {listBigramsRender}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 lg:w-1/3">
                            <div className="h-full flex items-start">
                                <div className="flex-grow pl-6">
                                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">Trigrams</h1>
                                    <div className="grid grid-cols-2 text-charcoal gap-2">
                                        {listTrigramsRender}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}