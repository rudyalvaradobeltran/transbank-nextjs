import { transaction } from '../transaction'

export default (req, res) =>{
    try{
        const amount = req.body.amount
        const sessionId = Date.now()
        const buyOrder = Math.round(Math.random()*999999999)
        const returnUrl = process.env.URL+'/api/confirmation'
        var finalUrl = process.env.URL+'/api/finish'

        transaction.initTransaction(amount, buyOrder, sessionId, returnUrl, finalUrl)
        .then((response) => {
            res.json({ success: true, token: response.token, url: response.url, inputName: 'TBK_TOKEN' })
        })
        .catch((error) => {
            res.json(error)
        });
    }catch(error){
        res.json(error)
    }
};