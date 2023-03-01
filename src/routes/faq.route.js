import { Router } from "express";
import { createFaqs, deleteFaq, getAllFaqs, updateFaq } from "../controller/faq.controller"

const faqRouter = Router({ mergeParams: true })

faqRouter.route("/").get(getAllFaqs).post(createFaqs)
faqRouter.route("/:id").put(updateFaq).delete(deleteFaq)

export default faqRouter