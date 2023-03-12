import Support from "../models/supportmodel.js";


export const userQuery = async (req,res) => {
    try{
        const {firstname, lastname, email, subject, message} = req.body;
        await Support.create({
            firstname,
            lastname,
            email,
            subject,
            message
        });
        res.status(201).json({message:"your request have been submitted, we will get back to you in some time"})
    }catch (err) {
        res.status(500).json(err.message);
    }
}

export const clearTicket = async (req, res) => {
    const { id } = req.params;

    try {
        const support = await Support.findByIdAndUpdate(
            id,
            { ticketCleared: true },
            { new: true }
        );

        if (!support) {
            return res.status(404).json({ message: 'Support request not found' });
        }

        res.json(support);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

