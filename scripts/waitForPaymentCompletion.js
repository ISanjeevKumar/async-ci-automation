const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const journey = process.argv[2];
const paymentIdsFile = path.join(__dirname, `${journey}_payment_ids.txt`);
const paymentIds = fs.readFileSync(paymentIdsFile, 'utf8').trim().split('\n');

let allCompleted = false;

while (!allCompleted) {
    allCompleted = true;
    paymentIds.forEach(paymentId => {
        let status = 'pending';
        try {
            status = execSync(`node scripts/checkPaymentStatus.js ${paymentId}`).toString().trim();
            console.log(`Payment status for ${paymentId}: ${status}`);
        } catch (err) {
            console.error(`Error checking payment status for ${paymentId}: ${err.message}`);
        }

        if (status !== 'completed') {
            allCompleted = false;
        }
    });

    if (!allCompleted) {
        console.log(`Not all payments are completed. Waiting...`);
        execSync('sleep 60');  // wait for 1 minute before checking again
    }
}

console.log(`All payments completed for ${journey}`);
