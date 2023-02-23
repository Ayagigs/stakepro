import fs from "fs"
import util from "util"
import Handlebars from "handlebars"

const emailTemplateReader = async (file, content) => {
    let templateFile = ""
    try {
        const readFile = util.promisify(fs.readFile);
        templateFile = await readFile(`${process.cwd()}/src/views/email/${file}`, "utf-8")
    } catch (err) {
        if (err instanceof Error) throw err
    }
    const template = Handlebars.compile(templateFile)
    return template({ ...content });
}

export default emailTemplateReader
