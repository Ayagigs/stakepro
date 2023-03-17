import nodemailer from 'nodemailer';

const newsLetter = async (email) => {
  try{
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
    });

    const emailMessage = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Newsletter topic',
      text: 'Hello, this is your daily newsletter!'
    };

    await transporter.sendMail(emailMessage, (error, info) => {
      if (error) {
        console.log(error.message);
        return process.exit(1);
      }
      console.log('Email sent successfully!', info.response);
      process.exit(0);
    });
  }catch(err) {
    console.log(err.message);
  }
}

export default newsLetter;
