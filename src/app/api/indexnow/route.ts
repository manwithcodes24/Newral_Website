import { NextResponse } from 'next/server';

export async function POST() {
  const key = "f9b743c986824e13b9e836d38466157c"; // paste your key here
  const host = "newral.in";

  const urls = [
    "https://newral.in/",
    "https://newral.in/services",
    "https://newral.in/about",
    "https://newral.in/blog"
  ];

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      host,
      key,
      urlList: urls,
    }),
  });

  return NextResponse.json({ success: true, status: response.status });
}
