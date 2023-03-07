
export const autoEmail = async (users, subject, text, res) => {

    for (const user of users) {
        const mailOption = {
            from: process.env.MAIL_USER,
            to: user.email,
            subject: subject,
            text: text
          }
          await sendMail(mailOption)
    }

    return res.json({
        status: "success",
        message: "Done!",
      });
    
}