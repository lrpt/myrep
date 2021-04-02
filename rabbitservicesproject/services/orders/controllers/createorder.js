
publish = require('../events/publish')
orderData= require('../repository/order.json')

createorder = async (req,res) =>{

publish(req._broker,orderData);
res.send(orderData.customer.customerEmail)
}
module.exports = createorder;