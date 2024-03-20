import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export async function postRequest(url: string, body: object) {
    try {
        let response = await axios.post(
            process.env.NEXT_PUBLIC_BASE_URL + url,
            body,
            await generateRequestHeader()
        );
        return response.data;
    } catch (error) {
        handleErrorCode(error);
        throw error;
    }
}
export async function getRequest(url: string) {
    try {
        let response = await axios.get(
            process.env.NEXT_PUBLIC_BASE_URL + url,
            await generateRequestHeader()
        );
        return response.data;
    } catch (error) {
        handleErrorCode(error);
        throw error;
    }
}

export async function deleteRequest(url: string) {
    try {
        let response = await axios.delete(
            process.env.NEXT_PUBLIC_BASE_URL + url,
            await generateRequestHeader()
        );
        return response.data;
    } catch (error) {
        handleErrorCode(error);
        throw error;
    }
}

export async function patchRequest(url: string, body: object) {
    try {
        let response = await axios.patch(
            process.env.NEXT_PUBLIC_BASE_URL + url,
            body,
            await generateRequestHeader()
        );
        return response.data;
    } catch (error) {
        handleErrorCode(error);
        throw error;
    }
}

export async function generateRequestHeader() {
    const session = await getServerSession(options);
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    headers["Authorization"] = "Bearer " + session?.user.access_token;
    return { headers };
}

export const handleErrorCode = (err:any) => {
    console.log(err.status)
    notFound()
};
