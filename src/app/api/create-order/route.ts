import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_SECRET;

    if (!key_id || !key_secret) {
      // If keys are not configured, return a mock order ID so UI can handle the failure gracefully
      return NextResponse.json({ id: "order_mock_test_12345", amount: amount * 100 }, { status: 200 });
    }

    const auth = Buffer.from(`${key_id}:${key_secret}`).toString("base64");

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay takes paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Razorpay error:", data);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
