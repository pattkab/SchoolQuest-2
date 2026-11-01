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
    && response.CurrencyCode.toUpperCase().startsWith("UGX")
    && Number(response.Amount) === amountUgx;
}
async function request(fields: Record<string, string>): Promise<YoResponse> {
  const username = process.env.YO_API_USERNAME;
  const password = process.env.YO_API_PASSWORD;
  const mode = process.env.YO_API_MODE;
  if (!username || !password || !["sandbox","production"].includes(mode || "")) {
    throw new Error("Yo Payments is not configured. No charge was made.");
  }
  if (mode === "production" && process.env.YO_PRODUCTION_ENABLED !== "true") {
    throw new Error("Live collections need explicit activation. No charge was made.");
  }
  const body = '<?xml version="1.0" encoding="UTF-8"?><AutoCreate><Request>'
    + Object.entries({ APIUsername: username, APIPassword: password, ...fields })
      .map(([key, value]) => '<' + key + '>' + escapeXml(value) + '</' + key + '>').join("")
    + '</Request></AutoCreate>';
  const response = await fetch(mode === "production" ? LIVE : SANDBOX, {
    method: "POST", headers: { "Content-Type": "application/xml" },
    body, cache: "no-store", signal: AbortSignal.timeout(20000),
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
  return request({ Method: "acdepositfunds", NonBlocking: "TRUE", Account: msisdn,
    Amount: String(amountUgx), Narrative: "SchoolQuest Student Pro Annual", ExternalReference: externalReference });
}
export async function verifyYoCollection(providerReference: string, externalReference: string) {
  return request({ Method: "actransactioncheckstatus", TransactionReference: providerReference,
    PrivateTransactionReference: externalReference, DepositTransactionType: "PULL" });
}
