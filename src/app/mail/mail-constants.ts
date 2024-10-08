export const MAIL_CONSTANTS = {
    MESSAGES: {
        EMAIL_SENT: "Event information sent to your email",
        EMAIL_SENT_VERIFICATION: "Email verification sent! Check your email to confirm your account",
        EMAIL_SENT_USERS: "Event information updated sent to users.",
        EMAIL_SENT_KO: "Error while sending notification to your email",
    },
    API: {
        // BASE_URL: "https:/iminapp.acgarcia.es/api/v1/email/",
        BASE_URL: "http://localhost:8080/api/v1/email/",
        ENDPOINTS: {
            SEND_EMAIL: "send-email",
            SEND_EMAIL_VERIFICATION: "send-verification",
        }
    }

}