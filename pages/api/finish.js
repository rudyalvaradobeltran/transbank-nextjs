export default (req, res) => {
    try{
        let status = null;
        let transaction = null;

        if (typeof req.body.TBK_TOKEN !== "undefined") {
            status = 'ABORTED';
        }

        if (typeof req.body.token_ws !== "undefined") {
            if (transaction.detailOutput[0].responseCode === 0) {
                status = 'AUTHORIZED';
            } else {
                status = 'REJECTED';
            }
        }

        if (status === null) {
            res.redirect(process.env.URL+'/error');
        }

        return res.redirect(process.env.URL+'/finish');
    }catch(error){
        res.redirect(process.env.URL+'/error');
    }
}