const nodemailer = require("nodemailer");

module.exports = async function main(body, data) {

  let transporter = nodemailer.createTransport({
    host: "smtp.server.com",
    port: 465,
    secure: true,
    auth: {
      user: 'test@thisisnotanemail.com',
      pass: 'thiisisnotapassword'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let info = await transporter.sendMail({
    from: '<test@thisisnotanemail.com',
    to: data.customer.customerEmail,
    subject: 'myemail',
    html: body,
  });

}

