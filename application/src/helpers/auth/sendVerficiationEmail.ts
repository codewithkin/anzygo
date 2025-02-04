import { createTransport } from "nodemailer";

export async function sendVerificationRequest(params: { identifier: string; url: string; provider: any; theme: Theme }) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: "The Anzygo team <" + provider.from + ">",
    subject: `Let's get chatting !`,
    text: text(),
    html: html({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

function html(params: { url: string; host: string; theme: Theme }) {
  const { url } = params;

  return `
   <body style="background: #f9f9f9; width: 100%; padding: 10px; text-align: center">
    
    <article style="text-align: center">
        <h1 style="font-family: Helvetica, Arial, sans-serif;">Welcome back to Anzygo ! </h1> 
        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 12; color: #3f37c9">Communication - reimagined</p>
    </article>
    
    <article style="text-align: center">
        <p style="font-family: Helvetica, Arial, sans-serif;">Click the button below to continue to Anzygo</p>
        <a href="${url}"
                  target="_blank"
                  style="font-size: 14px; font-family: Helvetica, Arial, sans-serif; color: white; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid #4895ef; display: inline-block; font-weight: bold; background-color: #3f37c9">Sign
                  in</a>
    </article>
    
    <article style="text-align: center; margin-top: 10px">
        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 12">
            Didn't request this code ? You can safely ignore this email
        </p>
    </article>
</body>
  `;
}

function text() {
  return `Let's get chatting !`;
}
