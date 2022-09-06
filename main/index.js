module.exports = (req, res) => {
    const { name, email, number, message } = req.body
    console.log(req.body)
    const replyMessage = `Your form was successfully submitted. Form infomation , name, ${name} email, ${email} number, ${number} message, ${message}`
    return res.status(200).send(replyMessage)
}