const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


function sendVerificationEmail(user) {
    const msg = {
        to: user.email,
        from: 'hasan.jahanifar@studenti.unipd.it',
        subject: 'Verify your email',
        text: `Hi ${user.name}. Please verify your email`,
        html: `<p>Hi ${user.name}. Please verify your email</p>
                </br>
                <strong>${user.verificationCode}</strong>`,
    };
    sgMail.send(msg);
}

function assignAccessToken(user) {
    const payload = {
        email: user.email,
    }

    const accessToken = jwt.sign(payload, 'secret', { expiresIn: '50d' })

    return accessToken
}

async function comparePassword(password, hash) {
    const res = await bcrypt.compare(password, hash);
    return res;
}

function verifyToken(token) {
    return jwt.verify(token, 'secret');
}

module.exports = {
    sendVerificationEmail,
    assignAccessToken,
    comparePassword,
    verifyToken
}