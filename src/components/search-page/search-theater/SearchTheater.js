import './searchtheater.css';
import { MdOutlineInsertEmoticon } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
const SearchTheater = () => {
    return (
        <div className='search-theater'>
            <div className='search-theater-list'>
                <div className='search-theater-item'>
                    <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1723015172/01-Quoc-Thanh-masthead_ovyfmp.jpg'/>
                    <div className='search-theater-item-content'>
                        <h1>Cinstar quoc thanh</h1>
                        <span><MdOutlineInsertEmoticon></MdOutlineInsertEmoticon><p>mo ta</p></span>
                        <span><IoLocationOutline></IoLocationOutline><p>vi tri</p></span>
                    </div>
                </div>
            </div>
            <div className='pb-100'></div>
        </div>
    );
}
export default SearchTheater;