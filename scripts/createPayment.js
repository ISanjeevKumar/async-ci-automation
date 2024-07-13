const fs = require('fs');
const path = require('path');

const journey = process.argv[2];
const paymentIdsFile = path.join(__dirname, `${journey}_payment_ids.txt`);
const paymentId = `payment_${journey}_${Date.now()}`;

// Simulate creating a payment instruction and appending the payment ID to a file
fs.appendFileSync(paymentIdsFile, `${paymentId}\n`);

console.log(`Created payment instruction for ${journey} with ID: ${paymentId}`);