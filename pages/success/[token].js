import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import AppLayout from '../../components/AppLayout'

const Success = () => {
    const router = useRouter()
    const { token } = router.query

    const [amount, setAmount] = useState('')
    const [buyOrder, setBuyOrder] = useState('')
    
    useEffect(()=>{
        if(token){
            (async () => {
                try{
                    const params = new URLSearchParams();
                    params.append('token', token);
                    const request = await axios({
                        method: 'post',
                        url: process.env.URL+'/api/confirmSuccess',
                        data: params
                    })
                    if(!request.data.results) window.location.replace('/')
                    setAmount(request.data.results.a)
                    setBuyOrder(request.data.results.b)
                    window.history.replaceState({}, document.title, "/success");
                }catch(error){
                    window.location.replace('/')
                }
            })()
        }
    },[token]);

    return (
        <>
        {amount &&
            <AppLayout>
                <Typography gutterBottom variant="h5" component="h2">
                    Successful purchase!
                </Typography>
                <Typography variant="subtitle1" component="h2">
                    Amount: {amount}
                </Typography>
                <Typography variant="subtitle1" component="h2">
                    Buy Order: {buyOrder}
                </Typography>
            </AppLayout>
        }
        </>
    )
}

export default Success
