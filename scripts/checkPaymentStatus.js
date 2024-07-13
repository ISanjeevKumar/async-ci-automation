const paymentId = process.argv[2];

// Simulate different payment statuses
const statuses = ['pending', 'completed'];
const status = statuses[Math.floor(Math.random() * statuses.length)];

console.log(status);
