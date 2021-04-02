const Broker = require('rascal').BrokerAsPromised;
const config = require('./config.json');
const sendemail = require('./mail')

async function rascal_listening() {

  const broker = await Broker.create(config);
  broker.on('error', console.error);
  const subscription = await broker.subscribe('email_subscription');

  subscription.on('message', async (message, content, ackOrNack) => {
    try {
      let body = 'empty'
      if (message.fields.routingKey == 'Service.order.email')
        body = require('./body/order').body;
      await sendemail(body, content);
      ackOrNack();
    } catch (err) {
      ackOrNack(err, { strategy: 'republish', immediateNack: true })
    }
  })
    .on('error', (err, message, ackOrNack) => {
      ackOrNack(err, { strategy: 'republish', immediateNack: true })
    })
    .on('invalid_content', (err, message, ackOrNack) => {
      ackOrNack(err, { strategy: 'republish', immediateNack: true });
    })
}

rascal_listening();