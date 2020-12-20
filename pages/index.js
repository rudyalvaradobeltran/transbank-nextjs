import { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import AppLayout from '../components/AppLayout'

export default function Home() {
    const [state, setState] = useState({
        category: "",
        description: "",
        id: "",
        image: "",
        price: "",
        title: "",
        url: "",
        inputName: "",
        token: "",
        done: false
    })

    const form = useRef(null)

    const useStyles = makeStyles({
        media: {
            height: 250
        }
    })

    useEffect(()=> {
        (async () => {
            try{
                const productId = Math.floor(Math.random() * 20) + 1
                const request = await axios({
                    method: 'get',
                    url: 'https://fakestoreapi.com/products/'+productId
                })
                const data = request.data
                data.price = Math.round(data.price)*1000
                data.done = true
                setState(data)
            }catch(error){
                console.log(error)
            }
        })()
    },[])

    const handleBuyProduct = () => {
        (async () => {
            try{
                const params = new URLSearchParams()
                params.append('amount', state.price)
                const request = await axios({
                    method: 'post',
                    url: process.env.URL+'/api/transaction',
                    data: params
                })
                const data = request.data
                setState(prevState => ({...prevState, url: data.url, inputName: data.inputName, token: data.token}))
                form.current.submit()
            }catch(error){
                console.log(error)
            }
        })()
    }

    const classes = useStyles()

    return (
        <AppLayout>
            {state.done &&
                <form id="webpay-form" action={state.url} method="post" ref={form}>
                    <input type="hidden" name={state.inputName} value={state.token || ""} />
                    <CardMedia
                    className={classes.media}
                    image={state.image}
                    title={state.title.slice(0, 100)}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {state.title}
                    </Typography>
                    <Typography className="py-2" variant="body2" color="textSecondary" component="p">
                        {state.description.slice(0, 200)}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {"$"+state.price}
                    </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={handleBuyProduct}>
                            PROCEED TO CHECKOUT
                        </Button>
                    </CardActions>
                </form>
            }
        </AppLayout>
    )
}