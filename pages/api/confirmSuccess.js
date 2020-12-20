import redis from 'redis'

export default async (req, res) => {
    try{
        const token = req.body.token
        var client = redis.createClient()
        var amount, buyOrder
        const response = await client.hgetall(token,function (err, results) {
            client.quit()
            res.json({results})
        });
    }catch(error){
        res.json(error)
    }
}