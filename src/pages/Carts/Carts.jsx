import './Carts.css'
import { Card, Button } from 'react-bootstrap'

function Carts( {carts, setCarts} ) {
    return ( 
        <div className='carts-container'>
            <div className='carts-items-container'>
                {carts.map( (cart) =>  {
                    return (
                        <Card style={{ width: '18rem' }} key={cart.id}>
                            <Card.Img variant="top" src={cart.thumbnailUrl} />
                            <Card.Body>
                                <Card.Title>{cart.title}</Card.Title>
                                <Card.Text><b>${cart.price.toFixed(2)}</b></Card.Text>
                                <Button variant="outline-danger"
                                    onClick={ () => {
                                        setCarts(carts.filter( (c) => {
                                            return c.id !== cart.id
                                        }))
                                    }}
                                >Remove from Carts</Button>
                            </Card.Body>
                        </Card>
                )
                })}
                           

            </div>

            <h4>
                Items: {carts.length} items - Total Price: $
                {carts.reduce( (prev,cart) => {
                    return prev + cart.price
                 }, 0).toFixed(2)} 
            </h4>

            <button className='btn btn-secondary'>
                Checkout
            </button>


        </div>
     )
}

export default Carts
