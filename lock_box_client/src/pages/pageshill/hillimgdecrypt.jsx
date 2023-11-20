import React, {useEffect, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'; // Importa Yup para validación
import {createHillImg} from '../../api/lockbox.api.js';

export function HillImgDecrypt() {

    const [matrixSize, setMatrixSize] = useState(2);

    const createInitialMatrix = (size) => {
        return Array.from({length: size}, () =>
            Array.from({length: size}, () => 0)
        );
    }

    const [data, setData] = useState(null)

    const handleSizeChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setMatrixSize(newSize);
    }

    // Función para calcular el determinante de una matriz 2x2
    const determinant2x2 = (matrix) => {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    };

    function determinant3x3(matrix) {
        let det = 0;
        det += matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]);
        det -= matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]);
        det += matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
        return det;
    }

    function determinant4x4(matrix) {
        let det = 0;

        for (let i = 0; i < 4; i++) {
            // Crea una submatriz 3x3 excluyendo la fila 0 y la columna i
            let subMatrix = matrix.slice(1).map(row =>
                row.filter((_, columnIndex) => columnIndex !== i)
            );

            // Calcula el cofactor de este elemento
            let cofactor = matrix[0][i] * determinant3x3(subMatrix);

            // Agrega o resta el cofactor al determinante total, dependiendo de la posición
            det += (i % 2 === 0 ? 1 : -1) * cofactor;
        }

        return det;
    }


    // Función para comprobar si dos números son coprimos
    const areCoprime = (a, b) => {
        function gcd(x, y) {
            if (!y) {
                return x;
            }
            return gcd(y, x % y);
        }

        return gcd(a, b) === 1;
    };
    const onSubmitHandler = async (values) => {
        try {
            const formData = new FormData();
            formData.append('k', JSON.stringify(values.k)); // Convierte la matriz a JSON
            formData.append('plain_img', '');
            formData.append('cipher_img', values.image);
            formData.append('method', 'decrypt');

            const response = await createHillImg(formData);
            setData(response);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <section className=" flex flex-col bg-white h-full w-full text-charcoal body-font">

            <div className="container w-full px-5 py-16 mx-auto">
                {/* Guia de uso formulario */}

                <div>
                    <div className="text-center w-full mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                            User Guide for Hill Decryption Images
                        </h1>
                    </div>
                    <div className="container px-5 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap justify-center w-full">
                            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-1 md:w-3/4 md:pr-10 md:py-6">
                                <div className="flex pb-6 col-span-2 md:col-span-1 w-full">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            1. Select the Image to decrypt:
                                        </h2>
                                        <p className="leading-relaxed">
                                            In the first field of the form, select the image that you want to
                                            decrypt.
                                            This imagen have must be 256x256.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-2 md:col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 trackng-wider">
                                            2. Enter the decryption Key (k):
                                        </h2>
                                        <p className="leading-relaxed">Enter the decryption key (k) is a square matrix
                                            (2x2, 3x3, etc.) that will be used for encryption. </p>
                                        <p className="leading-relaxed mt-1"> Each element of the matrix should be a
                                            number, and the entire matrix works in modulo 256.</p>
                                        <p className="leading-relaxed mt-1"> Example of a 2x2 matrix key:
                                            [ 11 , 8 ] , [ 1 , 3 ]
                                        </p>
                                    </div>
                                </div>
                                <div className="flex col-span-1 pb-6">
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-base text-gray-900 mb-1 tracking-wider">
                                            3. Decrypt the Image:
                                        </h2>
                                        <p className="leading-relaxed">
                                            Once you've entered the image and the decryption key, click the
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
                                            On the side of the form, you will see the result: your origin image, the
                                            decryption key used, and the cipher image.
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
                            className="flex flex-col bg-color1 text-charcoal w-3/4  md:w-3/4 overflow-hidden rounded-lg h-auto shadow-lg items-center justify-center py-5">
                            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font mb-4">
                                Form Decrypt Image
                            </h1>

                            <Formik
                                initialValues={{
                                    image: null,
                                    k: createInitialMatrix(matrixSize),
                                }}

                                validationSchema={Yup.object({
                                    k: Yup.array().of(
                                        Yup.array().of(
                                            Yup.number().min(0, "The min number of key is 0.")
                                                .max(256, "The max number of key is 256.")
                                                .required("Key is required.")
                                        )
                                    ).test(
                                        'is-coprime',
                                        'Matrix determinant must be coprime with 256.',
                                        function (value) {
                                            if (!value) return false

                                            let det;

                                            switch (value.length) {
                                                case 2:
                                                    det = determinant2x2(value)
                                                    break;
                                                case 3:
                                                    det = determinant3x3(value)
                                                    break;
                                                case 4:
                                                    det = determinant4x4(value)
                                                    break;
                                                default:
                                                    return this.createError({
                                                        message: `Unsupported matrix size: ${value.length}`,
                                                    });
                                            }

                                            return areCoprime(det, 256); // Si no es 2x2, 3x3, 4x4, no aplicar esta validación
                                        }
                                    )
                                })}

                                onSubmit={(values, {resetForm}) => {
                                    onSubmitHandler(values).then(() => {
                                        console.log(values)
                                        resetForm();
                                    }).catch(error => {
                                        console.error("Error en el envio", error);
                                    })

                                }}>
                                {formikProps => {
                                    // Desestructura setFieldValue de formikProps
                                    const {values, setFieldValue} = formikProps;

                                    // Este useEffect actualizará la matriz k cuando cambie matrixSize
                                    useEffect(() => {
                                        setFieldValue('k', createInitialMatrix(matrixSize));
                                    }, [matrixSize, setFieldValue]);
                                    return (
                                        <Form className="w-3/4">
                                            <div className="grid grid-cols-1 gap-1 mt-4">
                                                <div>
                                                    <label className="font-medium">Image</label>
                                                    <input className="rounded-md w-full border-gray-300 bg-white"
                                                           type="file"
                                                           name="image"
                                                           accept="image/*"
                                                           onChange={(event) => {
                                                               setFieldValue('image', event.currentTarget.files[0]);
                                                           }}
                                                    />
                                                    <ErrorMessage className="text-red-600 text-xs font-semibold"
                                                                  name="image"
                                                                  component="div"/>
                                                </div>

                                                <div className="grid grid-cols-1 gap-1 mt-4">
                                                    <label className="font-medium">Matriz Size</label>
                                                    <select id="size" onChange={handleSizeChange} value={matrixSize}
                                                            name='size_matrix' className="rounded-md">
                                                        <option value="2">2x2</option>
                                                        <option value="3">3x3</option>
                                                        <option value="4">4x4</option>
                                                    </select>
                                                </div>

                                                <div className="mt-3">
                                                    <label className="font-medium">Key Matrix</label>
                                                    <div className="grid grid-rows-2 justify-center">
                                                        {values.k.map((row, rowIndex) => (
                                                            <div key={`row-${rowIndex}`} className="flex justify-start">
                                                                {row.map((cell, colIndex) => (
                                                                    <Field
                                                                        key={`key-${rowIndex}-${colIndex}`}
                                                                        name={`k[${rowIndex}][${colIndex}]`}
                                                                        type="number"
                                                                        className="mr-2 w-16 rounded-md border p-1 text-center"
                                                                        placeholder="0"
                                                                    />
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <ErrorMessage name="k" component="div"
                                                                  className="text-red-600 text-xs font-semibold"/>
                                                </div>
                                            </div>

                                            <div className="flex justify-end mt-6">
                                                <button type="submit"
                                                        className="px-8 py-2.5 leading-5 text-ivory bg-color3 rounded-md">
                                                    Decrypt
                                                </button>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                    <div
                        className="md:w-1/2 w-full md:mt-0 mt-5 flex justify-center items-center">
                        <div className="flex flex-col pl-12 w-full">
                            {data?.plain_img ?
                                <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg">
                                    <div className="flex items-center px-6 py-3 bg-color3">
                                        <h2 className="text-xl font-semibold text-white">Results</h2>
                                    </div>

                                    <div className="px-6 py-4">
                                        <ul className="ml-5">
                                            <li className="list-disc">
                                                <p className="mt-2 text-md">
                                                    Key: {data.k.map((row, index) => (
                                                    <p key={index}>[{row.map((value, index) => (
                                                        <span className="mx-2" key={index}>{value}</span>
                                                    ))}]</p>
                                                ))}</p>
                                            </li>

                                            <li className="list-disc">
                                                <p className="mt-2 text-md">Cipher Image: </p>
                                                <img src={`data:image/png;base64,${data.cipher_img}`}
                                                     alt="Decrypted Image"
                                                     className="max-w-full max-h-60"/>
                                            </li>

                                            <li className="list-disc">
                                                <p className="mt-2 text-md">Plain Image:</p>
                                                <img src={`data:image/png;base64,${data.plain_img}`}
                                                     alt="Encrypted Image"
                                                     className="max-w-full max-h-60"/>
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
    );
}