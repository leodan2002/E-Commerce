import { Outlet, Link } from 'react-router-dom'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { Fragment, useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg' 
import { UserContext } from '../../contexts/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils';
import {NaviationContainer, NavLink, NavLinks, LogoContainer} from './navigation.styles'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)
    // console.log(currentUser)

    return (
      <Fragment>
        <NaviationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className='logo' />
                {/* <span>AN HOANG</span> */}
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutUser}> SIGN OUT</NavLink>
                        )
                        : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                        )
                }
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NaviationContainer>
        <Outlet />
      </Fragment>
    )
  }
export default Navigation;