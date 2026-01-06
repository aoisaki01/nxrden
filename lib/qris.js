
// CRC16 CCITT-FALSE implementation matching the PHP reference
function convertCRC16(str) {
    let crc = 0xFFFF;

    for (let c = 0; c < str.length; c++) {
        crc ^= str.charCodeAt(c) << 8;
        for (let i = 0; i < 8; i++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc = crc << 1;
            }
        }
    }

    // Mask to 16 bits and convert to hex
    let hex = (crc & 0xFFFF).toString(16).toUpperCase();
    if (hex.length === 3) hex = "0" + hex;
    if (hex.length === 2) hex = "00" + hex;
    if (hex.length === 1) hex = "000" + hex;

    return hex;
}

export function generateDynamicQRIS(qrisStatic, amount) {
    if (!qrisStatic || !amount) return "";

    // 1. Remove existing CRC (last 4 chars)
    let qris = qrisStatic.substring(0, qrisStatic.length - 4);

    // 2. Replace Static Tag (01) from 11 (Static) to 12 (Dynamic)
    // Ensure we only replace the specific tag sequence 010211 -> 010212
    qris = qris.replace("010211", "010212");

    // 3. Split at Country Code (5802ID)
    // Note: Standard QRIS usually has 5802ID (Country Code ID). 
    // If the QRIS is not Indonesian or uses a different format, this might fail.
    const splitParts = qris.split("5802ID");

    if (splitParts.length !== 2) {
        console.error("Invalid QRIS Format: Country Code 5802ID not found");
        return qrisStatic; // Return original if parsing fails
    }

    // 4. Construct Amount Tag (54)
    const amountStr = amount.toString();
    const amountLen = amountStr.length.toString().padStart(2, '0');
    const amountTag = `54${amountLen}${amountStr}`;

    // 5. Reassemble: Part1 + AmountTag + CountryCode + Part2
    // Note: logic re-adds 5802ID after the amount
    let newQris = splitParts[0] + amountTag + "5802ID" + splitParts[1];

    // 6. Append New CRC
    newQris += convertCRC16(newQris);

    return newQris;
}
