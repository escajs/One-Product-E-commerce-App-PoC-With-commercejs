import { useLocation } from 'react-router-dom'
const Navbar = ({totalItems}) => {
    const location = useLocation()
    const prohibitedPath = location.pathname == '/cart' || location.pathname == '/checkout'
    return (
        <nav className="teal darken-1 z-depth-1" id="nav">
            <div className="nav-wrapper container">
                <a href="/" className="brand-logo">Greenduck</a>
                <ul className="right">
                    {!prohibitedPath &&
                    <li ><a  className="total_items_navbar" href="/cart"><i class="material-icons left">shopping_cart</i>{totalItems && <span class="badge green z-depth-2 white-text">{totalItems}</span>}</a></li>
                        }
                    </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;