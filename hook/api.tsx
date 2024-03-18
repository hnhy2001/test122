import axios from "axios";
import { notFound } from "next/navigation";

export async function postRequest(url: string, body: object) {
    try {
        let response = await axios.post(
            process.env.NEXT_PUBLIC_BASE_URL + url,
            body,
            generateRequestHeader()
        );
        return response.data;
    } catch (error) {
        handleErrorCode();
        throw error;
    }
}
export async function getRequest(url: string) {
    try {
        let response = await axios.get(
            process.env.NEXT_PUBLIC_BASE_URL + url,
            generateRequestHeader()
        );
        return response.data;
    } catch (error) {
        handleErrorCode();
        throw error;
    }
}

export async function deleteRequest(url: string) {
    try {
        let response = await axios.delete(
            process.env.NEXT_PUBLIC_BASE_URL + url,
            generateRequestHeader()
        );
        return response.data;
    } catch (error) {
        handleErrorCode();
        throw error;
    }
}

export async function patchRequest(url: string, body: object) {
    try {
        let response = await axios.patch(
            process.env.NEXT_PUBLIC_BASE_URL + url,
            body,
            generateRequestHeader()
        );
        return response.data;
    } catch (error) {
        handleErrorCode();
        throw error;
    }
}

export function generateRequestHeader() {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
    };
}

export const handleErrorCode = () => {
    notFound()
};
