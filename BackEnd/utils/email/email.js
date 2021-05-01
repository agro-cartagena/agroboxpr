const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {

  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: "geraldo.vera@upr.edu",
        pass: "hdofjfdewzdapfzc", // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: "AfroBoxPR",
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
        // text: 'Jhonny la gente esta muy loca!'
      };
    };

    console.log("AQUI")
    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
          console.log(error)
        return error;
      } else {
          console.log("WTF")
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = {
    sendEmail
};