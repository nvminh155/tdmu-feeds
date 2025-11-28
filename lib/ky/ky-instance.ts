import { redirect } from "next/navigation";
import { isServer } from "@tanstack/react-query";
import { cyan, red } from "ansis";
import ky, { HTTPError, Input, Options } from "ky";

import { TResponse, TResponseList } from "@/types/http";

import createClient from "../supabase/client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const kyInstance = ky.create({
  prefixUrl: BASE_URL + "/api/v1",
  retry: 0,
  hooks: {
    beforeRequest: [
      async (request, options) => {
        if (options.headers) {
          // console.log("multipart");
        } else {
          request.headers.set("Content-Type", "application/json");
        }

        if (options.body) {
          request.headers.set(
            "Content-Length",
            options.body?.toString()?.length?.toString()
          );
        }
      },
    ],
  },
});

const kyInstanceAuth = ky.create({
  prefixUrl: BASE_URL + "/api/v1",
  retry: 0,
  hooks: {
    beforeRequest: [
      async (request, options) => {
        if (options.headers) {
          // console.log("multipart");
        } else {
          request.headers.set("Content-Type", "application/json");
        }

        const supabase = createClient();
        // const cookies = parseCookies();
        const { data } = await supabase.auth.getSession();

        // request.headers.set("Dkmh-Authorization", `Bearer ${token}`);
        request.headers.set(
          "Authorization",
          `Bearer ${data?.session?.access_token}`
        );

        if (options.body) {
          request.headers.set(
            "Content-Length",
            options.body?.toString()?.length?.toString()
          );
        }
      },
    ],
  },
});

const handleError = async (error: unknown) => {
  if (error instanceof HTTPError && isServer) {
    const res = error.response;
    const req = error.request;

    const message = await res.json();
    // console.log(
    //   `${red`[${error.name}] - ${res.status.toString()} ${req.method}:`}`,
    //   new URL(res.url)?.pathname?.replace(BASE_URL + "/api/v1", "/")
    // );
    // console.log(
    //   `${cyan`[Header]:`}`,
    //   Object.fromEntries(error.request.headers)
    // );
    // console.log(`${cyan`[message]:`}`, message);

    if (res?.status === 401) redirect("/login");
  }

  if (error instanceof HTTPError) {
    const res = await error.response;
    const data = await res.json();

    return Promise.reject(error);
  }

  return Promise.reject(error);
};

export const kyApi = {
  get: async <TData = unknown>(url: Input, options?: Options) => {
    return await kyInstance
      .get(url, options)
      .json<TResponse<TData>>()
      .then((res) => {
        if (res?.success) {
          const keys = Object.keys(res);
          const isKeyData = keys.some((key) => key === "data");
          if (isKeyData) {
            return res.data;
          }

          throw new Error(`Not found data`);
        }
      })
      .catch(handleError);
  },

  getList: async <TData = unknown>(url: Input, options?: Options) => {
    return kyInstance
      .get(url, options)
      .json<TResponseList<TData>>()
      .then((res) => {
        if (res?.success) {
          const keys = Object.keys(res);
          const isKeyData = keys.some((key) => key === "data");
          if (isKeyData) {
            return res.data;
          }

          throw new Error(`Not found data`);
        }
      })
      .catch(handleError);
  },

  post: async <TData = unknown>(url: Input, options?: Options) => {
    return kyInstance
      .post(url, options ?? {})
      .json<TResponse<TData>>()
      .then((res) => {
        if (res?.success) {
          if (res?.data) {
            return res.data;
          } else {
            throw new Error("Did not have data");
          }
        } else {
          throw new Error("Did not success");
        }
      })
      .catch(handleError);
  },

  put: async <TData = unknown>(url: Input, options?: Options) => {
    return kyInstance
      .put(url, options ?? {})
      .json<TData>()
      .catch(handleError);
  },

  delete: async <TData>(url: Input, options?: Options) => {
    return kyInstance.delete(url, options).json<TData>().catch(handleError);
  },
};

export const kyAuthApi = {
  get: async <TData = unknown>(url: Input, options?: Options) => {
    return kyInstanceAuth
      .get(url, options)
      .json<TResponse<TData>>()
      .then((res) => {
        if (res?.success) {
          const keys = Object.keys(res);
          const isKeyData = keys.some((key) => key === "data");
          if (isKeyData) {
            return res.data;
          }
        }
      })
      .catch(handleError);
  },

  getList: async <TData>(url: Input, options?: Options) => {
    return kyInstanceAuth
      .get(url, options)
      .json<TResponseList<TData>>()
      .then((res) => {
        if (res?.success) {
          const keys = Object.keys(res);
          const isKeyData = keys.some((key) => key === "data");
          if (isKeyData) {
            return res.data;
          }

          throw new Error(`Not found data`);
        }
      })
      .catch(handleError);
  },

  post: async <TData = unknown>(url: Input, options?: Options) => {
    return kyInstanceAuth
      .post(url, options ?? {})
      .json<TResponse<TData>>()
      .then((res) => {
        if (res?.success) {
          return res.data;
        } else {
          throw new Error("Did not success");
        }
      })
      .catch(handleError);
  },

  put: async <TData = unknown>(url: Input, options?: Options) => {
    return kyInstanceAuth
      .put(url, options ?? {})
      .json<TData>()
      .catch(handleError);
  },

  delete: async <TData>(url: Input, options?: Options) => {
    return kyInstanceAuth.delete(url, options).json<TData>().catch(handleError);
  },
};
