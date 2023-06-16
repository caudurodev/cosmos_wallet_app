export const toBase64 = (buffer: ArrayBuffer): string => {
    const array = Array.from(new Uint8Array(buffer));
    const binary = String.fromCharCode.apply(null, array);
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