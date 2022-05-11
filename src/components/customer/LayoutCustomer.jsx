import {useEffect} from 'react'

//libs
import { useLocation } from 'react-router-dom';

//My imports
import Menu from '../common/menu-users/Menu';
import { LinkMenu } from '../common/link-menu/LinkMenu'

//icons
import HomeIcon from '@mui/icons-material/Home'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'

const LayoutCustomer = ( { setLoginSuccess } ) => {

     const location = useLocation();
     const locationNow = location.pathname;

     return (
        <div>
             <Menu setLoginSuccess={ setLoginSuccess } >
                  <LinkMenu to='/' 
                            className={locationNow === '/' ? 'link-active': ''}
                   > 
                         <HomeIcon /> 
                         <span> Home </span>
                   </LinkMenu>
                   <LinkMenu to='/book' 
                            className={locationNow === '/book' ? 'link-active': ''}
                   > 
                         <LocalLibraryIcon />  
                         <span> Book </span>
                   </LinkMenu>
             </Menu>
        </div>
     )
}

export default LayoutCustomer