import { createFileRoute } from '@tanstack/react-router'
import Button from '../../components/Button'
import Typography from '../../components/Typography'
import Input from '../../components/Input'
import { Card } from '../../components/Card'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
            <Typography fontWeight={700} color="primary" fontSize="small">
                This is the homepage of the application.
            </Typography>
            <Input value="Hello" onChange={() => { }} />
            <Button onClick={() => console.log("Hello")}>Click me!</Button>
            <Button target='_blank' href="/application">Go to application</Button>

            <Card>
                Testing how card renders
            </Card>
        </div>
    )
}