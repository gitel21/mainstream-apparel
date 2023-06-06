import { Outlet  } from 'react-router-dom';
import HomeDirectory from '../../components/home-directory/home-directory';

const Home = () => {
   
  return (
     <div>
         <HomeDirectory />
         <Outlet />
     </div>
  );
}

export default Home;
