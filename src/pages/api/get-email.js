import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'
// send the email template with the user data feeded in using handlebars
const getEmailTemplate = (req, res) => {
    // get the user data


    const body = req.body
    // read the email template
    const emailTemplate = fs.readFileSync(path.join(process.cwd(), 'src', 'email-templates', 'thankyou.html'), 'utf8')
    // compile the template with handlebars
    const template = handlebars.compile(emailTemplate)
    // feed the user data into the template
    const htmlToSend = template({
        ...body
    });
    res.status(200).json({
        template: htmlToSend,
        bareTemplate: emailTemplate
    })
}


// export the function
export default getEmailTemplate