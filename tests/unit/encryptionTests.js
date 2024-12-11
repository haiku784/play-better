const assert = require('assert');
const crypto = require('crypto');

// Example encryption and decryption functions
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
    let ivBuffer = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), ivBuffer);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// Unit tests
describe('Encryption and Decryption Tests', function() {
    it('should encrypt and decrypt data successfully', function() {
        const originalData = 'Hello, World!';
        const encryptedData = encrypt(originalData);
        const decryptedData = decrypt(encryptedData);
        assert.strictEqual(originalData, decryptedData);  // Check integrity
    });

    it('should not match decrypted data with different original data', function() {
        const originalData = 'Hello, World!';
        const modifiedData = 'Goodbye, World!';
        const encryptedData = encrypt(originalData);
        const decryptedData = decrypt(encryptedData);
        assert.notStrictEqual(modifiedData, decryptedData);  // Ensure integrity is maintained
    });
});