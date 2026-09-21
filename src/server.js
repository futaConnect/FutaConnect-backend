const app = require('./app');
const startExpiryJob = require('./jobs/expireConnectRequests');
const { port } = require('./config/env');

app.listen(port, () => {
  console.log(`futaConnect backend running on port ${port}`);
});
startExpiryJob();