const fs = require("fs");
const path = require("path");

const key = "f9b743c986824e13b9e836d38466157c";
const host = "newral.in";

async function sendIndexNow() {
  try {
    const sitemapPath = path.join(__dirname, "../public/sitemap-0.xml");
    const sitemap = fs.readFileSync(sitemapPath, "utf8");

    // Extract URLs from sitemap
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
      (match) => match[1]
    );

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

    console.log("IndexNow response:", response.status);
    console.log("URLs submitted:", urls.length);
  } catch (err) {
    console.error("IndexNow error:", err);
  }
}

sendIndexNow();
