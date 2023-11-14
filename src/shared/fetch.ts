import axios from "axios";

const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export { client, server };
