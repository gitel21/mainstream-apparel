import HomeDirectoryItem from '../home-directory-item/home-directory-item'
import './home-directory.scss'

const HomeDirectory = ({categories}) => {
   return (
      <div className='directory-container'>
         {categories.map((category) => {
            return (
               <HomeDirectoryItem key={category.id} category={category} />
            )
         })}
      </div>
   )
}

export default HomeDirectory
