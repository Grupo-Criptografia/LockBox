import axios from "axios";

const cryptoApi = axios.create({
    baseURL: "http://localhost:8000/api/"
})

const sendRequest = (endpoint, data) => {
    return cryptoApi.post(endpoint, data)
        .then(response => {
            console.log("Api: ", data);
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