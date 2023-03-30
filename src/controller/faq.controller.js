import faqModel from "../models/faq.model";
import HttpException from "../exceptions/HttpException";
import HttpResponse from "../response/HttpResponse";

export const createFaqs = async (req, res, next) => {
    try {
        const faq = await faqModel.create(req.body);
        if (faq)
            return res.status(200).send(new HttpResponse("success", "Faq created"));
    } catch (err) {
        next(err);
    }
};

export const getAllFaqs = async (req, res, next) => {
    try {
        const faq = await faqModel.find();
        if (faq)
            return res.status(200).send(new HttpResponse("success", "Faqs", faq));
    } catch (err) {
        next(err);
    }
};

export const deleteFaq = async (req, res, next) => {
    try {
        const { id } = req.params;
        const faq = await faqModel.findById(id);
        if (!faq) throw new HttpException(404, "faq not found");
        faq.delete()
        return res.status(200).send(new HttpResponse("success", "deleted faq"));
    } catch (err) {
        next(err);
    }
};

export const updateFaq = async (req, res, next) => {
    try {
        const { question, answer } = req.body;
        const { id } = req.params;
        let faq = await faqModel.findById(id);
        if (!faq) throw new HttpException(404, "faq not found");

        await faq.update({ question, answer });
        return res.status(200).send(new HttpResponse("success", "faq updated"));
    } catch (err) {
        next(err);
    }
};
