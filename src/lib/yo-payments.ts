/** Server-only Yo Payments XML API transport.
 * Based on the public Yo Payments PHP SDK, with credentials only on the server.
 * The live API contract and commercial authorization must be checked against the
 * customer's current Yo account before production payment collection.
 */
import "server-only";

const SANDBOX = "https://sandbox.yo.co.ug/services/yopaymentsdev/task.php";
const LIVE = "https://paymentsapi1.yo.co.ug/ybs/task.php";

type YoResponse = { Status: string; TransactionReference: string; TransactionStatus: string; Amount: string; CurrencyCode: string; StatusMessage: string };

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function field(xml: string, tag: string): string {
  const match = xml.match(new RegExp("<" + tag + ">([^<]*)</" + tag + ">", "i"));
  return match?.[1]?.trim() ?? "";
}
export function isVerifiedSuccess(response: YoResponse, amountUgx: number) {
  return response.Status.toUpperCase() === "OK"
    && response.TransactionStatus.toUpperCase() === "SUCCEEDED"
    && /^UGX(?:-[A-Z0-9]+)?$/i.test(response.CurrencyCode)
    && Number(response.Amount) === amountUgx;
}
export function yoMode() {
  if (!process.env.YO_API_USERNAME || !process.env.YO_API_PASSWORD) return null;
  if (process.env.YO_API_MODE === "sandbox") return "sandbox";
  if (process.env.YO_API_MODE === "production" && process.env.YO_PRODUCTION_ENABLED === "true") return "production";
  return null;
}

async function request(fields: Record<string, string>): Promise<YoResponse> {
  const username = process.env.YO_API_USERNAME;
  const password = process.env.YO_API_PASSWORD;
  const mode = yoMode();
  if (!username || !password || !mode) throw new Error("Mobile money checkout is unavailable.");
  const body = '<?xml version="1.0" encoding="UTF-8"?><AutoCreate><Request>'
    + Object.entries({ APIUsername: username, APIPassword: password, ...fields })
      .map(([key, value]) => '<' + key + '>' + escapeXml(value) + '</' + key + '>').join("")
    + '</Request></AutoCreate>';
  const response = await fetch(mode === "production" ? LIVE : SANDBOX, {
    method: "POST", headers: { "Content-Type": "text/xml", "Content-transfer-encoding": "text" },
    body, redirect: "error", cache: "no-store", signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error("Payment provider unavailable. Check status before retrying.");
  const xml = await response.text();
  if (xml.length > 100000 || !xml.includes("<Response>")) throw new Error("Unexpected payment provider response.");
  return {
    Status: field(xml, "Status"), TransactionReference: field(xml, "TransactionReference"),
    TransactionStatus: field(xml, "TransactionStatus"), Amount: field(xml, "Amount"),
    CurrencyCode: field(xml, "CurrencyCode"), StatusMessage: field(xml, "StatusMessage"),
  };
}
export async function initiateYoCollection(msisdn: string, amountUgx: number, externalReference: string) {
  const notifications: Record<string, string> = {};
  if (process.env.YO_CALLBACK_URL) {
    const callback = new URL(process.env.YO_CALLBACK_URL);
    if (callback.protocol !== "https:") throw new Error("Invalid Yo callback URL.");
    callback.searchParams.set("payment", externalReference);
    notifications.InstantNotificationUrl = callback.href;
    notifications.FailureNotificationUrl = callback.href;
  }
  return request({ Method: "acdepositfunds", NonBlocking: "TRUE", Account: msisdn,
    Amount: String(amountUgx), Narrative: "SchoolQuest Premium", ExternalReference: externalReference, ...notifications });
}
export async function verifyYoCollection(providerReference: string) {
  return request({ Method: "actransactioncheckstatus", TransactionReference: providerReference, DepositTransactionType: "PULL" });
}
