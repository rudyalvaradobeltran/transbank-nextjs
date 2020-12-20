import Card from '@material-ui/core/Card'

export default function AppLayout ({children}) {
    return (
        <>
            <Card className="card">
                {children}
            </Card>
            <style jsx global>{`
                .card{
                    max-width: 345px;
                    min-height: 600px;
                }
            `}
            </style>
        </>
    )
}