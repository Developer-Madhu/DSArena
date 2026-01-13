import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InviteRequest {
  email: string;
  adminCode: string;
  inviterName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service is not configured");
    }

    const { email, adminCode, inviterName }: InviteRequest = await req.json();

    if (!email || !adminCode) {
      return new Response(
        JSON.stringify({ error: "Email and admin code are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Sending admin invite to ${email} with code ${adminCode}`);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .code-box { background: rgba(102, 126, 234, 0.1); border: 2px solid #667eea; border-radius: 12px; padding: 20px; text-align: center; margin: 30px 0; }
            .code { font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #667eea; font-family: monospace; }
            .message { color: #a0a0a0; line-height: 1.6; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🏟️ DSArena</div>
            </div>
            <h2 style="color: #ffffff; text-align: center;">You've Been Invited as an Admin!</h2>
            <p class="message">
              ${inviterName ? `<strong>${inviterName}</strong> has invited you` : "You have been invited"} to join DSArena as an administrator. Use the code below to complete your registration.
            </p>
            <div class="code-box">
              <p style="margin: 0 0 10px 0; color: #888;">Your Admin Code</p>
              <div class="code">${adminCode}</div>
            </div>
            <p class="message">
              To get started:
              <ol style="color: #a0a0a0;">
                <li>Go to the DSArena platform</li>
                <li>Sign up with this email address</li>
                <li>Enter the admin code above when prompted</li>
              </ol>
            </p>
            <p class="message" style="color: #ff6b6b; font-size: 14px;">
              ⚠️ Keep this code secure and do not share it with anyone.
            </p>
            <div class="footer">
              <p>This invitation was sent by DSArena Admin System</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DSArena <onboarding@resend.dev>",
        to: [email],
        subject: "🏟️ You've Been Invited to DSArena as an Admin!",
        html: emailHtml,
      }),
    });

    const responseData = await res.json();

    if (!res.ok) {
      console.error("Failed to send email:", responseData);
      throw new Error(responseData.message || "Failed to send invitation email");
    }

    console.log("Email sent successfully:", responseData);

    return new Response(
      JSON.stringify({ success: true, messageId: responseData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error in send-admin-invite:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
