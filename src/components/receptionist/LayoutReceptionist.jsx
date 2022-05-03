import {useEffect} from 'react'

//Libs
import { useLocation } from 'react-router-dom'

//My imports
import Menu from '../common/menu-users/Menu'
import { LinkMenu } from '../common/link-menu/LinkMenu'

//icons
import HomeIcon from '@mui/icons-material/Home';

const LayoutReceptionist = ( { setLoginSuccess } ) => {

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
         </Menu>
    </div>
  )
}

export default LayoutReceptionist