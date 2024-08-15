import './PriceTicket.css';
import { useState } from 'react';
const PriceTicket = () => {
    const [typeprice, setTypePrice] = useState('2d');
    const changeTypePrice = (value) => {
        setTypePrice(value);
    }
   const renderImg = () => {
    if(typeprice === '2d')
        {
            return   <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1723526605/CQT_2D-min_ackwsq.png'/>;
        }
        if(typeprice === '3d')
        {
                return   <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1723526604/CQT_3D-min_l6x7g0.jpg'/>;
        }
        if(typeprice === 'cme')
        {
                    return   <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1723526604/CQT_C_M__min_v2_yuznay.jpg'/>;
        }
   }
    return (
        <div className='category'>
            <h1> Bảng giá vé</h1>
            <div className='category-inner'>
                <div className='category-title'>
                    <div onClick={()=> changeTypePrice('2d')} className={typeprice==='2d'?'bd-bt-yl':''}><h3>2D</h3></div>
                    <div onClick={()=> changeTypePrice('3d')} className={typeprice==='3d'?'bd-bt-yl':''}><h3>3D</h3></div>
                    <div onClick={()=> changeTypePrice('cme')} className={typeprice==='cme'?'bd-bt-yl':''}><h3>C'MÊ</h3></div>
                </div>
                <div className='category-img'>
                  {renderImg()}
                </div>
            </div>
        </div>
    );
}
export default PriceTicket;