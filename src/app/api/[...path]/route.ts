import { server } from "@/shared/fetch";
import { NextResponse, NextRequest } from "next/server";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export async function GET(request: NextRequest) {
  const pathname = request.url?.split(`${BASE_URL}/api/`)[1];
  const response = await server?.get(pathname);
  return NextResponse.json(response?.data);
}

export async function POST(request: NextRequest) {
  const pathname = request.url?.split(`${BASE_URL}/api/`)[1];
  const data = await request.json();
  const response = await server?.post(pathname, data);
  return NextResponse.json(response.data);
}
