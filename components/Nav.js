import Link from 'next/link';
import { Mutation } from 'react-apollo';
import User from './User';
import { TOGGLE_CART_MUTATION } from './Cart';
import CartCount from './CartCount';
import Signout from './Signout';
import NavStyles from './styles/NavStyles';
const Nav = () => {
    return (
        <User>
            {({ data : { me } }) => (
                <NavStyles>
                    <Link href="/items"><a>Shop</a></Link>
                    {me && (
                        <>
                        <Link href="/sell"><a>Sell</a></Link>
                        <Link href="/orders"><a>Orders</a></Link>
                        <Link href="/account"><a>Account</a></Link>
                        <Signout/>
                        <Mutation mutation={TOGGLE_CART_MUTATION}>
                            {(toggleCart)=>(
                                <button onClick={toggleCart}>
                                    My Cart
                                    <CartCount count={me.cart.reduce((total, cartItem)=> total + cartItem.quantity, 0)} />
                                </button>
                            )}
                        </Mutation>
                        </>
                    )}
                    {!me &&(
                        <Link href="/signup"><a>Sign In</a></Link>
                    )}
                </NavStyles>
                )}
        </User>
    );
};

export default Nav;