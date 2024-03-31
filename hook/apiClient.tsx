import { options } from "@/app/api/auth/[...nextauth]/options";
import Notfound from "@/app/not-found";
import axios from "axios";
import { getSession } from "next-auth/react";

export async function postRequest(url: string, body: object) {
    const session = await getSession();

    try {
        let response = await axios.post(
            process.env.NEXT_PUBLIC_BASE_URL + url,
            body,
            await generateRequestHeader(session)
        );
        return response.data;
    } catch (error) {
        handleErrorCode(error, session);
        // await postRequest(url, body)
    }
}

export async function postRequestWithFormData(url: string, formData: FormData) {
  const session = await getSession();

  try {
    let response = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + url,
      formData,
      await generateRequestHeaderWithFormData(session)
    );
    return response.data;
  } catch (error) {
    handleErrorCode(error, session);
    // await postRequest(url, formData)
  }
}

export async function getRequest(url: string) {
    const session:any = await getSession();
    console.log(session)
    try {
        let response = await axios.get(
            process.env.NEXT_PUBLIC_BASE_URL + url,
            await generateRequestHeader(session)
        );
        return response.data;
    } catch (error) {
        handleErrorCode(error, session);
        // await getRequest(url)
    }
}

export async function deleteRequest(url: string) {
    const session = await getSession();

    try {
        let response = await axios.delete(
            process.env.NEXT_PUBLIC_BASE_URL + url,
            await generateRequestHeader(session)
        );
        return response.data;
    } catch (error) {
        handleErrorCode(error, session);
        // await deleteRequest(url)
    }
}

export async function patchRequest(url: string, body: object) {
    const session = await getSession();

    try {
        let response = await axios.patch(
            process.env.NEXT_PUBLIC_BASE_URL + url,
            body,
            await generateRequestHeader(session)
        );
        return response.data;
    } catch (error) {
        handleErrorCode(error, session);
        throw error;
    }
}

export async function generateRequestHeader(session: any) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    headers["Authorization"] = "Bearer " + session?.user.access_token;
    return { headers };
}

export async function generateRequestHeaderWithFormData(session: any) {
  const headers: Record<string, string> = {
    "Content-Type": "multipart/form-data",
  };
  headers["Authorization"] = "Bearer " + session?.user.access_token;
  return { headers };
}
async function refreshToken(session: any) {
    try {
        let response = await axios.post(
            process.env.NEXT_PUBLIC_BASE_URL + '/auth/refresh',
            {},
            await generateRequestHeader(session)
        );
        return response.data?.access_token;
    } catch (error) {
        throw error;
    }
}

export const handleErrorCode = async (err: any, session: any) => {
    if (err?.response.status == 401) {
        // if (session?.user.access_token) {
        //     const token = await refreshToken(session);
        //     session.user.access_token = token
        // }     
        // else {
        // }
    }
};
