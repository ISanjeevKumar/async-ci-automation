const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const journey = process.argv[2];
const paymentsFilePath = path.join(__dirname, '../data/payments.json');

// Read existing payment data
let payments = JSON.parse(fs.readFileSync(paymentsFilePath, 'utf8'));

// Filter payments for the specific journey
let journeyPayments = payments.filter(payment => payment.JourneyId === journey);

let allCompleted = false;

while (!allCompleted) {
    allCompleted = true;
    journeyPayments.forEach(payment => {
        let status = 'pending';
        try {
            status = execSync(`node scripts/checkPaymentStatus.js ${payment.PaymentId}`).toString().trim();
            console.log(`Payment status for ${payment.PaymentId}: ${status}`);
        } catch (err) {
            console.error(`Error checking payment status for ${payment.PaymentId}: ${err.message}`);
        }

        // Update payment status
        payment.PaymentStatus = status;

        if (status !== 'completed') {
            allCompleted = false;
        }
    });

    // Write updated payment data to file
    fs.writeFileSync(paymentsFilePath, JSON.stringify(payments, null, 2));

    if (!allCompleted) {
        console.log(`Not all payments are completed. Waiting...`);
        execSync('sleep 60');  // wait for 1 minute before checking again
    }
}

console.log(`All payments completed for ${journey}`);
