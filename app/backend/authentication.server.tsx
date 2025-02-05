import {logBackendError} from "~/global-common-typescript/server/logging.server";
import {getErrorFromUnknown, getObjectFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {generateUuid, getCurrentIsoTimestamp, getUnixTimeInSeconds} from "~/global-common-typescript/utilities/utilities";
import {getUnixTimeInSecondsFromDate, safeExecute} from "~/utilities";
// TODO: Remove this, and store the OTPs in database instead
declare global {
    var _activeOtps: {[phoneNumber: string]: {otp: string; issuedAt: number}};
    var _authToken: {token: string; expiryDate: string};
}

export async function sendOtp(phoneNumber: string, name: string) {
    const activeOtps = getActiveOtps();
    const currentTimestamp = getUnixTimeInSeconds();

    const otp = Math.floor(Math.random() * 10 ** 6)
        .toString()
        .padStart(6, "0");
    activeOtps[phoneNumber] = {
        otp: otp,
        issuedAt: currentTimestamp,
    };
    if (process.env.NODE_ENV === "development") {
        console.log(otp);
    }

    const normalizedPhoneNumber = `+91${phoneNumber}`;

    const authToken = await getAuthToken();
    if (authToken instanceof Error) {
        return authToken;
    }

    const result = await fetch(`${process.env.VALUE_FIRST_API_BASE_URI}/servlet/psms.JsonEservice`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
        },
        body: JSON.stringify({
            "@VER": "1.2",
            USER: {},
            DLR: {"@URL": ""},
            SMS: [
                {
                    "@UDH": "0",
                    "@CODING": "1",
                    "@TEXT": `Dear ${name}\nThanks for your interest in Livguard. Your OTP for enquiry registration is ${otp}.\nPlease submit the OTP to complete registration and expect a call soon.`,
                    "@PROPERTY": "0",
                    "@ID": generateUuid(),
                    ADDRESS: [
                        {
                            "@FROM": "LVGSLR",
                            "@TO": normalizedPhoneNumber,
                            "@SEQ": "1",
                            "@TAG": "OTP for confirmation",
                        },
                    ],
                },
            ],
        }),
    });

    if (!result.ok) {
        console.log(`Error in sendOtp: ${await result.text()}`);
    }
}

export async function verifyOtp(phoneNumber: string, otp: string): Promise<{success: boolean}> {
    const activeOtps = getActiveOtps();

    try {
        if (phoneNumber in activeOtps && activeOtps[phoneNumber].otp == otp) {
            delete activeOtps[phoneNumber];

            // const normalizedPhoneNumber = `+91${phoneNumber}`;
            // const [userId, isNewUser] = await createUserIfRequiredAndReturnId(normalizedPhoneNumber);

            // await createUserInLms(phoneNumber, userId, searchParameters);

            // const accessToken = jwt.sign({userId: userId, schemaVersion: process.env.COOKIE_SCHEMA_VERSION}, process.env.JWT_SECRET);

            // TODO: Create entry in database if we want to store tokens

            // logSignIn(normalizedPhoneNumber, searchParameters);

            return {
                success: true,
            };
        } else {
            return {
                success: false,
            };
        }
    } catch (error_: unknown) {
        const error = getErrorFromUnknown(error_);
        logBackendError(error);
        return {success: false};
    }
}

// async function logOtpSent(phoneNumber: string, searchParameters: {[searchParameter: string]: string} | null) {
//     // TODO: Authentication
//     await execute("INSERT INTO otps_sent(phone_number, timestamp, search_parameters) VALUES($1, $2, $3)", [phoneNumber, getCurrentIsoTimestamp(), JSON.stringify(searchParameters)]);
// }

// async function logSignIn(phoneNumber: string, searchParameters: {[searchParameter: string]: string} | null) {
//     // TODO: Authentication
//     await execute("INSERT INTO sign_ins(phone_number, timestamp, search_parameters) VALUES($1, $2, $3)", [phoneNumber, getCurrentIsoTimestamp(), JSON.stringify(searchParameters)]);
// }

// export async function trackSignInPhoneNumberToLandingPageUrl(phoneNumber: string, landingPageUrl: string) {
//     // TODO: Authentication
//     await execute("INSERT INTO sign_in_phone_number_for_to_landing_page_urls(phone_number, timestamp, landing_page_url) VALUES($1, TO_TIMESTAMP($2), $3)", [
//         phoneNumber,
//         getCurrentTimestamp(),
//         landingPageUrl,
//     ]);
// }

function getActiveOtps() {
    if (global._activeOtps == null) {
        global._activeOtps = {};
    }

    const activeOtps = global._activeOtps;
    const unixEpochInSeconds = getUnixTimeInSeconds();

    for (const phoneNumber of Object.keys(activeOtps)) {
        const otpInformation = activeOtps[phoneNumber];
        if (unixEpochInSeconds - otpInformation.issuedAt >= 3600) {
            delete activeOtps[phoneNumber];
        }
    }

    return activeOtps;
}

async function getAuthToken(): Promise<{token: string; expiryDate: string} | Error> {
    const unixEpochInSeconds = getUnixTimeInSeconds();

    if (global._authToken == null) {
        const authToken = await getFreshSalesAuthToken();
        if (authToken instanceof Error) {
            return authToken;
        }
        global._authToken = authToken;
    }

    const tokenExpiryDate = global._authToken.expiryDate;
    const expiryInEpochSeconds = getUnixTimeInSecondsFromDate(tokenExpiryDate);

    if (expiryInEpochSeconds - unixEpochInSeconds <= 3600) {
        const authToken = await getFreshSalesAuthToken();
        if (authToken instanceof Error) {
            return authToken;
        }
        global._authToken = authToken;
    }

    return global._authToken;
}

async function getFreshSalesAuthToken(): Promise<{token: string; expiryDate: string} | Error> {
    try {
        const response = await fetch(`${process.env.VALUE_FIRST_API_BASE_URI}/api/messages/token?action=generate`, {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(`${process.env.VALUE_FIRST_USERNAME}:${process.env.VALUE_FIRST_PASSWORD}`, "utf-8").toString("base64")}`,
            },
        });

        const responseText = safeParse(getObjectFromUnknown, await response.text());

        if (!response.ok) {
            throw new Error(`Value First API call failed - status = ${response.status}, body = ${JSON.stringify(responseText)}`);
        }

        return responseText;
    } catch (error_: unknown) {
        const error = getErrorFromUnknown(error_);
        logBackendError(error);
        return error;
    }
}
