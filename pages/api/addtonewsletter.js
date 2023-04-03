export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  const { email } = body;

  const SibApiV3Sdk = require("sib-api-v3-sdk");
  let defaultClient = SibApiV3Sdk.ApiClient.instance;

  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.NEXT_PUBLIC_SENDINBLUE_API_KEY;

  let apiInstance = new SibApiV3Sdk.ContactsApi();

  let createContact = new SibApiV3Sdk.CreateContact();

  createContact.email = email;
  createContact.listIds = [2];

  try {
    const data = await apiInstance.createContact(createContact);
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}
