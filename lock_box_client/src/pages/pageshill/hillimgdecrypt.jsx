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
        <section className=" flex flex-col bg-ivory h-full w-full text-charcoal body-font">
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
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={(event) => {
                                            setFieldValue('image', event.currentTarget.files[0]);
                                        }}
                                    />
                                    <ErrorMessage className="text-red-600 text-xs font-semibold" name="image"
                                                  component="div"/>
                                </div>

                                <div className="grid grid-cols-1 gap-1 mt-4">
                                    <label className="font-medium">Matriz Size</label>
                                    <select id="size" onChange={handleSizeChange} value={matrixSize}
                                            name='size_matrix'>
                                        <option value="2">2x2</option>
                                        <option value="3">3x3</option>
                                        <option value="4">4x4</option>
                                    </select>
                                </div>

                                <div className="mt-3">
                                    <label className="font-medium">Key Matrix</label>
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
                                    <ErrorMessage name="k" component="div"
                                                  className="text-red-600 text-xs font-semibold"/>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button type="submit"
                                        className="px-8 py-2.5 leading-5 text-ivory transition-colors duration-300 transform bg-poppy rounded-md hover:bg-charcoal focus:outline-none focus:bg-charcoal">
                                    Decrypt
                                </button>
                            </div>
                        </Form>
                    );
                }}
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
                        <img src={`data:image/png;base64,${data.cipher_img}`} alt="Decrypt Image"
                             className="max-w-full max-h-60"/>
                    </div>
                </div>

            )}
        </section>
    );
}