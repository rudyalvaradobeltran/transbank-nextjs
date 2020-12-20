import { transaction } from '../transaction'
import redis from 'redis'

export default (req, res) => {
    const token = req.body.token_ws
    transaction.getTransactionResult(token)
    .then((response) => {
        const output = response.detailOutput[0]
        if (output.responseCode === 0) {
            var client = redis.createClient()
            client.hmset(token, ['a', output.amount, 'b', output.buyOrder])
            client.quit()
            res.redirect(process.env.URL+'/success/'+token)
        }else{
            res.redirect(process.env.URL+'/finish')
        }
    })
    .catch((error) => {
        res.redirect(process.env.URL+'/error')
    });
}