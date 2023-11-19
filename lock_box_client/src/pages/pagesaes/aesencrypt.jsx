import React, {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import {createAES} from "../../api/lockbox.api.js";

export function AesEncrypt() {

    const [data, setData] = useState(null);

    const initialValues = {
        image: null, // Este campo almacenará la imagen seleccionada
        k: '',
        mode: 'ECB'
    };

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('plain_img', values.image);
            formData.append('k', values.k);
            formData.append('cipher_img', '');
            formData.append('mode', values.mode);
            formData.append('method', 'encrypt');

            // Envía la imagen al servidor utilizando Axios
            const response = await createAES(formData)
            setData(response)
            console.log(response)

            // Realiza cualquier acción adicional después de enviar la imagen
        } catch (error) {
            console.error('Error al enviar la imagen:', error);
        }
    };

    return (
        <div className="bg-ivory w-full text-charcoal">
            <h1>Subir Imagen</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({setFieldValue}) => (
                    <Form className="">
                        <div>
                            <input
                                type="file"
                                name="image"
                                onChange={(event) => {
                                    setFieldValue('image', event.currentTarget.files[0]);
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="k">Clave (k):</label>
                            <Field type="text" name="k"/>
                        </div>
                        <div>
                            <label htmlFor="mode">Modo:</label>
                            <Field as="select" name="mode">
                                <option value="ECB">ECB</option>
                                <option value="CBC">CBC</option>
                                <option value="OFB">OFB</option>
                                <option value="CFB">CFB</option>
                                <option value="CTR">CTR</option>
                            </Field>
                        </div>
                        <button type="submit">Subir Imagen</button>
                    </Form>
                )}
            </Formik>

            {data && (
                <div className="flex flex-col justify-items-center">
                    <h2>Images</h2>
                    <div>
                        <p>Plain Image:</p>
                        <img src={`data:image/png;base64,${data.plain_img}`} alt="Encrypted Image"
                             className="max-w-full max-h-60"/>
                    </div>
                    <div>
                        <p>Cipher Image</p>
                        <img src={`data:image/png;base64,${data.cipher_img}`} alt="Encrypted Image"
                             className="max-w-full max-h-60"/>
                    </div>
                </div>

            )}
        </div>
    );
}
