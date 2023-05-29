// send the email template with the user data feeded in using handlebars
const countEmailOpening = (req, res) => {
    function crateA1pxTransparentImage() {
        const base64Image = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        const img = Buffer.from(base64Image, 'base64')
        return img
    }
    console.log(req);
    res.setHeader('Content-Type', 'image/gif')
    res.setHeader('Content-Length', crateA1pxTransparentImage().length)
    res.end(crateA1pxTransparentImage())
}


// export the function
export default countEmailOpening