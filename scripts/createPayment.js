const fs = require('fs');
const path = require('path');

const journey = process.argv[2];
const dataDir = path.join(__dirname, '../data');
const paymentsFilePath = path.join(dataDir, 'payments.json');

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Ensure the payments.json file exists
if (!fs.existsSync(paymentsFilePath)) {
    fs.writeFileSync(paymentsFilePath, '[]');
}

// Read existing payment data
let payments = [];
if (fs.existsSync(paymentsFilePath)) {
    payments = JSON.parse(fs.readFileSync(paymentsFilePath, 'utf8'));
}

const paymentId = `payment_${journey}_${Date.now()}`;

// Add new payment instruction
payments.push({
    JourneyId: journey,
    PaymentId: paymentId,
    PaymentStatus: 'pending'
});

// Write updated payment data to file
fs.writeFileSync(paymentsFilePath, JSON.stringify(payments, null, 2));

console.log(`Created payment instruction for ${journey} with ID: ${paymentId}`);
