import type { NextAuthConfig } from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"
import { sendVerificationRequest } from "./helpers/auth/sendVerficiationEmail"
 
export default { providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: 465,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async (params) => sendVerificationRequest(params),
    })
],
pages: {
  signIn: "/auth"
}
} satisfies NextAuthConfig