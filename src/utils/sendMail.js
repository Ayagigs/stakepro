import { MAIL_PASS, MAIL_SERVICE, MAIL_USER } from "../config"
import nodemailer from "nodemailer"
import HttpException from "../exceptions/HttpException"
// import express from "express"
// import hbs from "nodemailer-express-handlebars";
// import path from 'path'

async function sendMail(options) {
    // const viewPath =  path.resolve(__dirname, './templates/views/');
    // const partialsPath = path.resolve(__dirname, './templates/partials');
    try {
        const transporter = nodemailer.createTransport({
            service: MAIL_SERVICE,
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS
            },
        })

        // transporter.use('compile', hbs({
        //     viewEngine: {
        //       //extension name
        //       extName: '.handlebars',
        //       // layout path declare
        //       layoutsDir: viewPath,
        //       defaultLayout: false,
        //       //partials directory path
        //       partialsDir: partialsPath,
        //       express
        //     },
        //     //View path declare
        //     viewPath: viewPath,
        //     extName: '.handlebars',
        // }));

        await transporter.sendMail(options)
        console.log("mail sent")
    } catch (err) {
        if (err instanceof Error) {
            console.log("Error CATCHED"+err.message)
            throw new HttpException(500, "couldn't send mail")
        }
    }
}

export default sendMail