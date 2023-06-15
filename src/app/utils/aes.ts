export const toBase64 = (buffer: ArrayBuffer): string => {
    const binary = String.fromCharCode.apply(null, new Uint8Array(buffer));
    return window.btoa(binary);
}

export const fromBase64 = (base64String: string): ArrayBuffer => {
    const binaryString = window.atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

export const deriveKey = async (password: string, salt: Uint8Array) => {
    const passwordBuffer = new TextEncoder().encode(password);
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );
    const derivedKey = await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: { name: "SHA-256" },
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
    return derivedKey;
}

export const aesEncrypt = async (key: CryptoKey, iv: Uint8Array, data: Uint8Array) => {
    const encryptedContent = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        data
    );

    return new Uint8Array(encryptedContent);
};

export const aesDecrypt = async (key: CryptoKey, iv: Uint8Array, content: Uint8Array) => {
    const decryptedContent = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        content
    );

    return new Uint8Array(decryptedContent);
};
