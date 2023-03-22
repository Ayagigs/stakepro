import { Router } from "express";
import { createFaqs, deleteFaq, getAllFaqs, updateFaq } from "../controller/faq.controller"
import { faqIdSchema, createSchema } from "../validator_schema/faqSchema";
import validatorMiddleware from "../middleware/validator.middleware";

const faqRouter = Router({ mergeParams: true })
createSchema
faqRouter.route("/")
    .get(getAllFaqs)
    .post(
        validatorMiddleware(createSchema, "body"),
        createFaqs
    )

faqRouter.route("/:id")
    .put(
        validatorMiddleware(faqIdSchema, "params"),
        updateFaq
    ).delete(
        validatorMiddleware(faqIdSchema, "params"),
        deleteFaq
    )

export default faqRouter