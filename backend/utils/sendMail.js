const opcoMail = require('../config/opconodemailer');
const backendMail = require('../config/storebackendapinodemailer');
const subwayMail = require('../config/subwaynodemailer');
const aoexMail = require('../config/saoexnonemailer');

const numberToFiveDigits = (number) => {
    return number.toString().padStart(5, '0');
}

const OPCOSTORE = '62f8d7884c3b4800136678c8';
const BACKENDSTORE = '62f8d03b58568000124bff90';

const sendOrderMail = async (storeId, user, order, products) => {
    let sender = '';
    let receiver = '';
    let storeName = '';
    let provider = '';
    try {
        if (storeId == OPCOSTORE || storeId == BACKENDSTORE) {
             sender = 'store@ngold.io';
             receiver = `${user.email}, castroverde.kevin@gmail.com, comercial@opencoffee.io`;
             storeName = 'NGOLD';
             provider = opcoMail;
        }else{
            console.log('storeId not found');
            return false;
        }

        provider.sendMail({
            from: sender,
            to: receiver,
            subject: `${storeName} - Order ${order.orderNumber}`,
            html: `<p>Hello ${user.fullName},</p>
          
            <p>Your Order #${numberToFiveDigits(order.orderNumber)} ha sido guardada.</p>
            <p>Details:</p>
            <p>Products: </p> ${products.map(product => `<p>${product.name} - qty:${product.count} - Price:${product.price} - Option ${product.option} </p>`).join('')}
            <p>Total: ${order.total}</p>
            <p>Token Used: ${order.tokenUsed}</p>
            <p>Wallet: ${order.wallet}</p>
            <p>Hash: ${order.txHash}</p>
            <p>Direction: ${user.country}, ${user.state}, ${user.city}, ${user.address}, ${user.zipCode}</p>
            <br/>
            <p>thanks for buy in ${storeName}</p>
            `
        })


    } catch (error) {
        console.log(error);
    }
}


const sendConfirmEmail = async (storeId, user, verificationCode) => {
     console.log("sendConfirmEmail", storeId, user, verificationCode);
    let sender = '';
    let receiver = '';
    let storeName = '';
    let provider = '';
    try {
        if (storeId == OPCOSTORE|| storeId == BACKENDSTORE) {
                sender = 'store@ngold.io';
                receiver = `${user.email}`;
                storeName = 'NGOLD';
                provider = opcoMail;
            }else{
            console.log('storeId not found');
            return false;
        }
        provider.sendMail({
            from: sender,
            to: receiver,
            subject: `${storeName} - Verify your email`,
            html: `<p>Hello ${user.fullName},</p>
            <p>You have been registered to Store</p>
            <p>Please enter the code below to verify your email</p>
            <h2>${verificationCode}</h2>
            <p>Thank you</p>
            `
        })
        
    } catch (error) {
        console.log(error);
    }
}

const sendResetPassword = async (storeId, user, verificationCode) => {
    console.log("sendResetPassword", storeId, user, verificationCode);
    let sender = '';
    let receiver = '';
    let storeName = '';
    let provider = '';
    try {
        if (storeId == OPCOSTORE || storeId == BACKENDSTORE) {
                sender = 'store@ngold.io';
                receiver = `${user.email}`;
                storeName = 'NGOLD';
                provider = opcoMail;
            }else{
            console.log('storeId not found');
            return false;
        }
        provider.sendMail({
            from: sender,
            to: receiver,
            subject: `${storeName} - Reset your password`,
            html: `<p>Hello ${user.fullName},</p>
            <p>You have been registered to Store</p>
            <p>Please enter the code below to reset your password</p>
            <h2>${verificationCode}</h2>
            <p>Thank you</p>
            `
        })

    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    sendOrderMail, 
    sendConfirmEmail,
    sendResetPassword
}

