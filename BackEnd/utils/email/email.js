const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {

  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    return new Promise((resolve, reject) => {
      transporter.sendMail(options(), (error, info) => {
        if (error) {
          console.log(error)
          resolve(false)
        } else {
          resolve(true)
        }
      });
    })
  } catch (error) {
    return error;
  }
};

module.exports = {
  sendEmail
};