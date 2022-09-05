module.exports = (req, res) => {
    console.log('this thing')

    return res.status(200).send('hello world...')
}