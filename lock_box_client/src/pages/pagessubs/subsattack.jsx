import {Field, Form, Formik} from "formik";
import {useState} from "react";
import {getSubstitution} from "../../api/lockbox.api.js";

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
        <p key={index}>{letter}</p>
    ));

    const listBigramsRender = data.list_attack.bigrams.map((bigram, index) => (
        <p key={index}>{bigram}</p>
    ));

    const listTrigramsRender = data.list_attack.trigrams.map((trigram, index) => (
        <p key={index}>{trigram}</p>
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
        <div className="flex flex-col bg-ivory w-full">
            <div className="flex justify-center">
                <Formik initialValues={{
                    cipher_attack: ''
                }} onSubmit={onSubmitHandler}>
                    <Form className="flex flex-col w-1/2 mt-20">
                        <Field type="textarea" name="cipher_text" placeholder="Cipher text"/>
                        <button type="submit" className="bg-poppy rounded mt-5">Attack</button>
                    </Form>
                </Formik>
            </div>
            {data.list_attack.letters.length > 0 && (
                <div className="text-charcoal flex flex-row">
                    <div className="">
                        <span>Letters: </span>
                        <div className="grid grid-cols-2 gap-2">
                            {listLettersRender}
                        </div>
                    </div>
                    <div>
                        <span>Bigrams:</span>
                        <div className="grid grid-cols-3 gap-3">
                            {listBigramsRender}
                        </div>
                    </div>
                    <div>
                        <span>Trigrams:</span>
                        <div className="grid grid-cols-2 gap-3">
                            {listTrigramsRender}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}