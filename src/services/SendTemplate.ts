import handlebars from 'handlebars'
import fs from 'fs'
import { resolve } from 'path'


function sendTemplate(template: String, variables: Object){

    const path = resolve(__dirname, '..', 'views', `${template}.hbs`)
    const templateContent = fs.readFileSync(path).toString()

    const templateParser = handlebars.compile(templateContent)
    const html = templateParser(variables)

    return html

}


export { sendTemplate }