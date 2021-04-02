const express = require('express');
const Broker = require('rascal').BrokerAsPromised;
const config = require('./events/config.json');
const routes = require('./routes');

let broker = null;

(async () => {
  try {
    broker = await Broker.create(config);
    broker.on('error', console.error);
  } catch (err) {
    console.error(err);
  }
}
)();

app = express();
app.use((req, res, next) => {
  req._broker = broker;
  next();
});

app.use(routes);
app.listen(3500, () => {
  console.log('Server is running on: http://localhost:3500');
});