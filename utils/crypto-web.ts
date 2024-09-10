// Import necessary functions from Web Crypto API
const algorithm = 'AES-GCM';
const keyLength = 256;
const ivLength = 12;

// Generate a new encryption key
export async function generateKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    {
      name: algorithm,
      length: keyLength,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

// Encrypt data using Web Crypto API
export async function encrypt(text: string, key: CryptoKey): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  // Generate a random IV (Initialization Vector)
  const iv = crypto.getRandomValues(new Uint8Array(ivLength));
  
  // Encrypt the data
  const encrypted = await crypto.subtle.encrypt(
    {
      name: algorithm,
      iv: iv,
    },
    key,
    data
  );
  
  // Combine IV and encrypted data for storage
  const ivAndEncrypted = new Uint8Array(iv.length + encrypted.byteLength);
  ivAndEncrypted.set(iv);
  ivAndEncrypted.set(new Uint8Array(encrypted), iv.length);
  
  // Convert to base64
  return arrayBufferToBase64(ivAndEncrypted.buffer);
}

// Decrypt data using Web Crypto API
export async function decrypt(encryptedData: string, key: CryptoKey): Promise<string> {
  // Convert base64 to Uint8Array
  const uint8Array = base64ToArrayBuffer(encryptedData);
  
  // Extract the IV and encrypted data
  const iv = uint8Array.slice(0, ivLength);
  const data = uint8Array.slice(ivLength);
  
  // Decrypt the data
  const decrypted = await crypto.subtle.decrypt(
    {
      name: algorithm,
      iv: iv,
    },
    key,
    data
  );
  
  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

// Convert ArrayBuffer to base64 string
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buffer);
  let binaryString = '';
  
  // Convert Uint8Array to binary string
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  
  // Encode binary string to base64
  return btoa(binaryString);
}

// Convert base64 string to Uint8Array
function base64ToArrayBuffer(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return bytes;
}