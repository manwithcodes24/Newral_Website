import { google } from "googleapis";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, email, phone, city } = body;

        const auth = new google.auth.JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        await auth.authorize(); // 🔥 THIS IS IMPORTANT

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!A:E", // must match your sheet tab name
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[
                    fullName,
                    email,
                    phone,
                    city,
                    new Date().toLocaleString()
                ]]
            }
        });

        return Response.json({ success: true });

    } catch (error: any) {
        console.error("ERROR FULL:", error?.response?.data || error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}