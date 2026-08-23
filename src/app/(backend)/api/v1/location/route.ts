import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(`https://api.ipinfo.io/lite/me?token=${process.env.NEXT_PUBLIC_IP_API_TOKEN}`);
        const locationData = await response.json();

        if (locationData) {
            debugger;
            return NextResponse.json({
                data: locationData
            }, {
                status: 200
            })
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500
            })
        }
    }
}
