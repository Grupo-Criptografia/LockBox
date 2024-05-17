import axios from "axios";

const lockBoxApi = axios.create({
    baseURL: "http://localhost:8000/api/"
})

const sendRequest = (endpoint, data, contentType = 'application/json') => {
    console.log("SendRequest:", data);
    return lockBoxApi.post(endpoint, data, {
        headers: {
            'Content-Type': contentType // Establecer el tipo de contenido como 'multipart/form-data' para cargar archivos
        }
    })
        .then(response => {
            console.log("Response from server:", response.data);
            return response.data;
        })
        .catch(error => {
            console.log("Error in the request:", error);
            throw error;
        });
};

export const getShift = (data) => sendRequest("shift/", data);
export const createSubstitution = (data) => sendRequest("substitution/", data);
export const createAffine = (data) => sendRequest("affine/", data);
export const createPermutation = (data) => sendRequest("permutation/", data);
export const createVigenere = (data) => sendRequest("vigenere/", data);
export const createHill = (data) => sendRequest("hillText/", data);
export const createHillImg = (data) => sendRequest("hillImg/", data, 'multipart/form-data')
export const createTdes = (data) => sendRequest("TDES/", data, 'multipart/form-data');
export const createAES = (data) => sendRequest("AES/", data, 'multipart/form-data');
export const createRabin = (data) => sendRequest("rabin/", data);
export const createRsa = (data) => sendRequest("RSA/", data);
export const createElgamal = (data) => sendRequest("elgamal/", data);
export const createSignature = (data) => sendRequest("digsignature/", data);
export const createVisualCrypt = (data) => sendRequest("visual_crypt/", data, 'multipart/form-data');
