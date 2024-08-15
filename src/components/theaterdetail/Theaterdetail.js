import './theaterdetail.css';
import CategoryMovie from './category-movie/CategoryMovie';
import Promotion from '../promotion-component/Promotion';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailTheater } from '~/features/theater/TheaterSlice';
import PriceTicket from './PriceTicket/PriceTicket';
import { getNowshowingMovieByTheater, getUpcommingMovieByTheater } from '~/features/movie/MovieSlice';
const Theaterdetail = () => {
    const dispatch = useDispatch();
    const theaterdetail = useSelector((state)=> state.theater.theaterdetail);
    const movietheaters = useSelector((state)=> state.movie.movietheaters);
    const loading = useSelector((state)=> state.theater.loading);
    const [category, setCategory] = useState('showing');
    let {id} = useParams();
    useEffect(()=>{
        dispatch(getDetailTheater(id)).then((response)=>{
            console.log('response', response);
        })
    },[dispatch])
    const changeCategory = (value) => {
        setCategory(value);
    }
    useEffect(()=>{
        if(category === 'showing')
        {
            dispatch(getNowshowingMovieByTheater(id)).then((response)=>{
                console.log('response theater', response);
            })
        }
        if(category === 'upcomming')
        {
            dispatch(getUpcommingMovieByTheater(id)).then((response)=>{
                console.log('response theater', response);
            }) 
        }
     
    },[category, id])
    if(loading)
    {
        return <div><p>Loading ...</p></div>
    }

    return (
        <div className='theater-container'>
            <div className='banner'>
               <div className='banner-img'>
               <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722943312/01-Quoc-Thanh-masthead_h4e4bm.jpg'/>
               </div>
                <div className='banner-infor'>
                    <h1>{theaterdetail?.name}</h1>
                    <p>{theaterdetail?.address}</p>
                </div>
            </div>
            <div className='type-movie'>
                <li onClick={()=> changeCategory('showing')} className={category==='showing'?'bd-bt-yl type-movie-item':'type-movie-item'}>Phim đang chiếu</li>
                <li onClick={()=> changeCategory('upcomming')} className={category==='upcomming'?'bd-bt-yl type-movie-item':'type-movie-item'}>Phim sắp chiếu</li>
                <li onClick={()=> changeCategory('special')} className={category==='special'?'bd-bt-yl type-movie-item':'type-movie-item'}>Suất chiếu đặc biệt</li>
                <li onClick={()=> changeCategory('price')} className={category==='price'?'bd-bt-yl type-movie-item':'type-movie-item'}>Bảng giá vé</li>

            </div>

              {category==='price'? (<PriceTicket></PriceTicket>):
              (<CategoryMovie theatermovies = {movietheaters} typecategory = {category}/>)}
            
            
            <div className='pb150'></div>
            <Promotion/>
            <div className='pb150'></div>
        </div>
    );
}

export default Theaterdetail;