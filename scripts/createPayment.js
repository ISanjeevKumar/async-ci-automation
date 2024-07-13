const fs = require('fs');
const path = require('path');

const journey = process.argv[2];
const paymentsFilePath = path.join(__dirname, '../data/payments.json');

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
