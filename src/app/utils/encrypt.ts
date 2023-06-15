import { fromUtf8, toUtf8 } from "@cosmjs/encoding";
import { aesEncrypt, aesDecrypt, toBase64, fromBase64, deriveKey } from "./aes";

export async function encrypt(password: string, data: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt);
    const encodedData = toUtf8(data);
    const encryptedContent = await aesEncrypt(key, iv, encodedData);

    return JSON.stringify({
        salt: toBase64(salt),
        iv: toBase64(iv),
        content: toBase64(encryptedContent),
    });
}

export const decrypt = async (password: string, encryptedData: string) => {
    const { salt, iv, content } = JSON.parse(encryptedData);
    const decodedSalt = fromBase64(salt);
    const decodedIv = fromBase64(iv);
    const decodedContent = fromBase64(content);
    const key = await deriveKey(password, decodedSalt);
    const decryptedContent = await aesDecrypt(key, decodedIv, decodedContent);
    return fromUtf8(decryptedContent);
};
