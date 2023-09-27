const nodemailer = require('nodemailer');

const host = process.env.REACT_APP_OPCO_HOST;
const user = process.env.REACT_APP_OPCO_USER;
const pass = process.env.REACT_APP_OPCO_PASSWORD;


const opcoMail = nodemailer.createTransport({
    service: "Gmail",
    // port: 587,
    // secure: true,
    auth: {
        user: user,
        pass: pass
    }
});

module.exports = opcoMail;


    
        