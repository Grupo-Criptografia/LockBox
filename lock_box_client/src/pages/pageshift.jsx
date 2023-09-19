import {useEffect, useState} from "react";
import {getShift} from '../api/lockbox.api.js'
import {useForm} from "react-hook-form";

export function Shift() {

    const [data, setData] = useState({
        plain_text: "",
        cipher_text: "",
        k: 0,
        list_plain_text: [],
        method: ""
    })
    const [selectedMethod, setSelectedMethod] = useState('encrypt');

    useEffect(() => {
        console.log(data)
    }, [data]);

    const {
        register,
        handleSubmit,
        formState: errors
    } = useForm();

    const onSubmit = async (data) => {
        data.method = selectedMethod

        console.log(data)
        try {
            const response = await getShift(data)
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
        setData({
            plain_text: "",
            cipher_text: "",
            k: 0,
            list_plain_text: [],
            method: ""
        });
    }

    return (
        <div>
            <h3>Cryptogram Shift</h3>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <select onChange={handleMethodChange} value={selectedMethod}>
                            <option value="encrypt">Encrypt</option>
                            <option value="decrypt">Decrypt</option>
                            <option value="attack">Attack</option>
                        </select>
                    </div>

                    {selectedMethod === 'encrypt' && (
                        <div>
                            <input type="text" placeholder="plain text"
                                   {...register("plain_text", {required: true})}/>
                            {errors.plain_text && <span></span>}
                            <br/>
                            <input type="int" placeholder="k"
                                   {...register("k", {required: true})}/>
                        </div>
                    )}

                    {selectedMethod === 'decrypt' && (
                        <div>
                            <input type="text" placeholder="cipher_text"
                                   {...register("cipher_text", {required: true})}/>
                            {errors.plain_text && <span></span>}
                            <br/>
                            <input type="int" placeholder="k"
                                   {...register("k", {required: true})}/>
                        </div>
                    )}

                    {selectedMethod === 'attack' && (
                        <div>
                            <input type="text" placeholder="cipher text"
                                   {...register("cipher_text", {required: true})}/>
                            {errors.cipher_text && <span></span>}
                            <br/>
                        </div>
                    )}
                    <button type="submit">Enviar</button>
                </form>

                {selectedMethod === 'encrypt' && data.cipher_text !== "" && (
                    <div>
                        <span>The cipher text is: {data.cipher_text} </span>
                    </div>
                )}

                {selectedMethod === 'decrypt' && data.plain_text !== "" && (
                    <div>
                        <span>The plain text is: {data.plain_text} </span>
                    </div>
                )}

                {selectedMethod === 'attack' && data.list_plain_text.length > 0 && (
                    <div>
                        <span>The possible plain text is: </span>
                        {data.list_plain_text.map((plain_text, index) => (
                            <div key={index}>
                                <span>{index + 1} {plain_text}</span>
                            </div>
                        ))}
                    </div>
                )}


            </div>


        </div>
    )
}