import DirectoryItem from '../directory-item/directory-item.component';
import './directory.style.scss';


const Directory = ({categories}) => {
    return (<div className="direct-container">
    {categories.map((category) => (
      <DirectoryItem key={category.id} category={category}/>
    ))}
  </div>)
}

export default Directory