import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils.js"
import { UserContext } from "../../context/user.context";
import { CartContext } from '../../context/cart.context';
import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import './home-navigation.scss';

const HomeNavigation = () => {

   const {currentUser} = useContext(UserContext);
   const {isCartOpen} = useContext(CartContext);

   return (
     <Fragment>
         <div className="navigation">
            <Link className="logo-container" to='/'>
               <Logo className="logo" />
            </Link>         
            <div className="nav-links-container">
               <Link className="nav-link" to='/shop'>
                  SHOP
               </Link>
               {
                  currentUser ? 
                  (
                     <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                  ) : (
                     <Link className="nav-link" to='/auth'>
                        SIGN IN
                     </Link>
                  )
               }
               <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
         </div>
         <Outlet />
     </Fragment>
   )
 }

 export default HomeNavigation;