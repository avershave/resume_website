require('dotenv').config();
const nodemailer = require('nodemailer')
const express = require('express')
const app = express();

const path = require('path');

const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/contact', (req, res) => {
    console.log(req.body);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    
    transporter.verify();
    // send mail with defined transport object
    let sendTo = transporter.sendMail({
        from: 'av@austinvershave.dev', // sender address
        to: 'austin.vershave@gmail.com', // list of receivers
        subject: "Sent from Website", // Subject line
        text: `From ${req.body.name}`, // plain text body
        html: `<b>From ${req.body.name} | Email ${req.body.email} | Phone Number ${req.body.phonenumber}</b>
               <p>${req.body.message}` 
    }, (error, info) => {
        if(error){
            console.log(error);
        }
    });

    let thankYou = transporter.sendMail({
        from: 'av@austinvershave.dev', // sender address
        to: req.body.email, // list of receivers
        subject: "Thank you!", // Subject line
        text: `From Austin Vershave`, // plain text body
        html: `<p>Dear ${req.body.name},</p>
               <p> Thank you for reaching out to me. I'll try to respond as soon as I can! In the meantime, please add me on <a href="https://www.linkedin.com/in/austinvershave/">LinkedIn</a>.</p>
               <p>Have a great day!</p>
               <p>Austin Vershave</p>` 
    }, (error, info) => {
        if(error){
            res.redirect('/#failed');
        } else {
            res.redirect('/#success');
        }
    });
});


app.listen(PORT, () => console.log('Server is listening on port ' + PORT));
