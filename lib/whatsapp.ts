type WhatsAppMessage = {
  to: string;
  body: string;
};

export async function sendWhatsAppMessage(message: WhatsAppMessage) {
  const phoneNumberId = process.env.WHATSAPP_BUSINESS_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_BUSINESS_ACCESS_TOKEN;
  const version = process.env.WHATSAPP_BUSINESS_API_VERSION ?? "v20.0";

  if (!phoneNumberId || !token) {
    return {
      ok: false,
      mode: "not-configured",
      message: "WhatsApp Business API preparada. Agrega credenciales Meta para envio real.",
      payload: message
    };
  }

  const response = await fetch(`https://graph.facebook.com/${version}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: message.to,
      type: "text",
      text: { body: message.body }
    })
  });

  return {
    ok: response.ok,
    mode: "live",
    status: response.status,
    data: await response.json()
  };
}
