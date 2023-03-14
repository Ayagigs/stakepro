import News from "../models/newslettermodel.js";
import newsLetter from "../newsletterfunc/newsletter.js";
export const subscribeNewsletter = async (req,res) => {
    const{name,email} = req.body;

    try{
       const findIndividual = await News.findOne({email});

       if(findIndividual) {
        res.json({message:"you are in our newsletter database already"});
       }
       else {
        const newIndividual = await News.create({
            name,
            email
        });
        newsLetter(email);

        return res.json({
            status:"success",
            message:"congratulations, you will now receive information about our updates",
            data: newIndividual
        });
       }
    }catch(err) {
        res.json(err.message);
    }
}

export const unsubscribeNewsletter = async (req,res) => {
    try{
        const findIndividual = await News.findById(req.params.id);
        if(!findIndividual) {
            return res.json({message:"you are not subscribe to our newsletter"});
        }else {
            await News.findByIdAndDelete(req.params.id);
        }
    }catch(err) {
        res.json(err.message);
    }
}