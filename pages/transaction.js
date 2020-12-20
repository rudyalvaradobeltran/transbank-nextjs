import Transbank from 'transbank-sdk'

export const transaction = new Transbank.Webpay(Transbank.Configuration
    .forTestingWebpayPlusNormal())
    .getNormalTransaction()
