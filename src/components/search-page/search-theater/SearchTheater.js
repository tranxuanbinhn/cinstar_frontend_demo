import './searchtheater.css';
import { MdOutlineInsertEmoticon } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
const SearchTheater = ({theatersfind}) => {
    return (
        <div className='search-theater'>
            <div className='search-theater-list'>
                {
                    theatersfind&&theatersfind.length>0?(
                        theatersfind.map((item)=>
                        ( 
                        <div className='search-theater-item'>
                            <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1723015172/01-Quoc-Thanh-masthead_ovyfmp.jpg'/>
                            <div className='search-theater-item-content'>
                                <h1>{item?.name}</h1>
                                <span><IoLocationOutline></IoLocationOutline><p>{item?.address}</p></span>
                            </div>
                        </div>))
                    ):(<div></div>)
                }
               
            </div>
            <div className='pb-100'></div>
        </div>
    );
}
export default SearchTheater;