import Support from "../models/supportmodel.js";
import HttpResponse from "../response/HttpResponse.js";
import HttpException from "../exceptions/HttpException.js";


export const userQuery = async (req, res, next) => {
    try {
        const { firstname, lastname, email, subject, message } = req.body;
        await Support.create({
            firstname,
            lastname,
            email,
            subject,
            message
        });
        return res.status(201).send(new HttpResponse("success", "your request have been submitted, we will get back to you in some time"))
    } catch (err) {
        next(err)
    }
}

export const clearTicket = async (req, res, next) => {
    const { id } = req.params;

    try {
        const support = await Support.findByIdAndUpdate(
            id,
            { ticketCleared: true },
            { new: true }
        );

        if (!support) throw new HttpException(404, "Support request not found");

        return res.status(200).send(new HttpResponse("success", "ticket cleared", { support }))

    } catch (err) {
        next(err)
    }
}

