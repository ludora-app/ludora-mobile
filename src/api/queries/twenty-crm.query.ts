import ky from 'ky';

const TWENTY_CRM_URL = process.env.EXPO_PUBLIC_TWENTY_CRM_URL;
const TWENTY_CRM_API_KEY = process.env.EXPO_PUBLIC_TWENTY_CRM_API_KEY;

export type SendContactMessageParams = {
  email: string;
  name: string;
  message: string;
  subject: string;
};

type TwentyCreateContactBody = {
  email: { additionalEmails: string[]; primaryEmail: string };
  name: string;
  message: string;
  subject: string;
  source: 'APP';
};

export const sendContactMessage = async (params: SendContactMessageParams) => {
  const { email, message, name, subject } = params;
  const twentyCrmBody: TwentyCreateContactBody = {
    email: { additionalEmails: [], primaryEmail: email },
    message,
    name,
    source: 'APP',
    subject,
  };

  const response = await ky
    .post(`${TWENTY_CRM_URL}/contactMessages`, {
      headers: {
        Authorization: `Bearer ${TWENTY_CRM_API_KEY}`,
      },
      json: twentyCrmBody,
    })
    .json();

  return response;
};
