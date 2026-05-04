import { google } from "googleapis";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // 1. Destructure the updated fields from the frontend
        const { fullName, email, phone, city, track, occupation } = body;

        // 2. Setup Authentication
        const auth = new google.auth.JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        await auth.authorize(); 

        const sheets = google.sheets({ version: "v4", auth });

        // 3. Append to Google Sheets
        // Updated range to A:G because we now have 7 columns of data
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!A:G", 
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[
                    fullName,
                    email,
                    phone,
                    city,
                    track,        // New Column E
                    occupation,   // New Column F
                    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) // New Column G (Timestamp)
                ]]
            }
        });

        return Response.json({ success: true });

    } catch (error: any) {
        console.error("GOOGLE_SHEETS_ERROR:", error?.response?.data || error);
        return Response.json(
            { success: false, error: error.message }, 
            { status: 500 }
        );
    }
}