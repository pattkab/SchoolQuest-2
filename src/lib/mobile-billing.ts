/** Cross-platform SchoolQuest subscription checkout model.
 *
 * App Store and Play Store digital subscriptions must use StoreKit / Play Billing
 * unless the precise storefront is enrolled in and eligible for an approved
 * alternative billing programme. Apple Pay and Google Pay wallet buttons alone
 * DO NOT qualify as in-app purchase billing for digital subscriptions.
 *
 * This module defines the contract; no native purchase or Pro grant is simulated.
 */
export const STUDENT_ANNUAL_SKUS = {
  apple: "schoolquest.student.pro.annual",
  googlePlay: "schoolquest_student_pro_annual",
} as const;

export type PurchaseChannel = "WEB_YO" | "IOS_STOREKIT" | "ANDROID_PLAY_BILLING";
export type NativePurchaseVerification = {
  channel: Exclude<PurchaseChannel, "WEB_YO">;
  productId: string;
  transactionId: string;
  accountId: string;
};

export function expectedStoreSku(channel: NativePurchaseVerification["channel"]): string {
  return channel === "IOS_STOREKIT" ? STUDENT_ANNUAL_SKUS.apple : STUDENT_ANNUAL_SKUS.googlePlay;
}

/** A backend verifier must call Apple App Store Server API or Google Play Developer
 * API, validate app/package ID, SKU, environment, ownership, transaction uniqueness,
 * expiry/refund/revocation, and store notifications before granting entitlement.
 * Never trust this client-provided shape by itself.
 */
export function validatePurchaseMetadata(p: NativePurchaseVerification) {
  return p.productId === expectedStoreSku(p.channel)
    && p.transactionId.length > 0 && p.transactionId.length <= 256
    && p.accountId.length > 0 && p.accountId.length <= 256;
}
