import {useEffect, useState} from "react";
import {createHill, getShift} from '../../api/lockbox.api.js'
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast, ToastContainer} from "react-toastify";

export function HillEncrypt() {

    const [matrixSize, setMatrixSize] = useState(2);

    const createInitialMatrix = (size) => {
        return Array.from({length: size}, () =>
            Array.from({length: size}, () => 0)
        );
    }

    const [data, setData] = useState({
        plain_text: "",
        cipher_text: "",
        k: createInitialMatrix(matrixSize),
        method: "encrypt"
    })

    useEffect(() => {
        console.log(data)
    }, [data]);

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

    const onSubmitHandler = async (data) => {
        data.method = "encrypt"
        try {
            const response = await createHill(data)
            setData(response)
        } catch (error) {
            console.log('Error: ', error)
        }
    }
    return (
        <section className=" flex flex-col bg-ivory h-full w-full text-charcoal body-font">
            {/* Guia de uso formulario */}
            <div className="container w-full px-5 py-16 mx-auto">

                {/* Formulario y resultado */}

                <div className="flex flex-col md:flex-row w-full mx-auto">
                    <div className="md:w-1/2 w-full flex justify-center h-auto">
                        <div
                            className="flex flex-col bg-white text-charcoal w-3/4  md:w-3/4 overflow-hidden rounded-lg h-auto shadow-lg items-center justify-center py-5">
                            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font mb-4">
                                Form Encrypt
                            </h1>
                            <Formik
                                initialValues={{
                                    plain_text: '',
                                    k: createInitialMatrix(matrixSize),
                                }}

                                validationSchema={Yup.object({
                                    plain_text: Yup.string()
                                        .required("Plain text is required")
                                        .test('Length plain text',
                                            "The Length of the plain text is not divisible for the length matrix",
                                            function (value) {
                                                const {k} = this.parent;

                                                return value.length % k.length === 0;

                                            }),
                                    k: Yup.array().of(
                                        Yup.array().of(
                                            Yup.number().min(0, "The min number of key is 0.")
                                                .max(25, "The max number of key is 25.")
                                                .required("Key is required.")
                                        )
                                    ).test(
                                        'is-coprime',
                                        'Matrix determinant must be coprime with 26.',
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

                                            return areCoprime(det, 26); // Si no es 2x2, 3x3, 4x4, no aplicar esta validación
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

                                    // ... (el resto de tu renderizado de formulario)
                                    return (
                                        <Form className="w-3/4">
                                            <div className="grid grid-cols-1 gap-1 mt-4">
                                                <div>
                                                    <label className="font-medium">Plain text</label>
                                                    <Field placeholder="Enter plain text" as="textarea"
                                                           name="plain_text"
                                                           className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 h-32 py-2.5 text-charcoal focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></Field>
                                                    <div className="text-red-600 text-xs font-semibold">
                                                        <ErrorMessage className="font-normal text-xs text-poppy"
                                                                      name="plain_text"/>
                                                    </div>
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
                                                    Encrypt
                                                </button>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                    <div
                        className="md:w-1/2 w-full md:mt-0 mt-5 md:border-l md:border-charcoal flex justify-center items-center">
                        <div className="flex flex-col pl-12 w-full bg-ivory">
                            <h2 className="text-2xl font-semibold">
                                Information Data
                            </h2>

                            {data?.cipher_text ?
                                <div>
                                    <p className="mt-2 text-xl">
                                        Plain text: {data.plain_text}
                                    </p>
                                    <p className="mt-2 text-xl">
                                        Key: {data.k}
                                    </p>
                                    <p className="mt-2 text-xl">
                                        Cipher text: {data.cipher_text}
                                    </p>
                                </div>
                                :
                                <p
                                    className="mt-2 text-xl">
                                    Please enter a plaint text and key for show a cipher text.
                                </p>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}