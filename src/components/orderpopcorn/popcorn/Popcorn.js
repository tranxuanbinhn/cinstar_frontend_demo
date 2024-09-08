import { useDispatch, useSelector } from 'react-redux';
import './popcorn.css';
import { useEffect } from 'react';
import { getAllFood } from '~/features/food/FoodSlice';

const Popcorn = ({setIncreaseFood, setDecreaseFood, quantityFood}) => {
    const dispatch = useDispatch();
    const food = useSelector((state)=> state.food.allfood);
     
    useEffect(()=>{
        dispatch(getAllFood());
    }, [dispatch]);

    const categoryFood = (data) => {
        const organizedFood = {};
        data?.forEach((item) => {
            const { id, name, category, description, price, image } = item;
            if (!organizedFood[category]) {
                organizedFood[category] = [];
            }
            organizedFood[category].push({ id, name, description, price, image });
        });
        return organizedFood;
    }

    const organizedFood = categoryFood(food);
     

    return (
        <div>
            {Object.keys(organizedFood).length > 0 ? (
                Object.keys(organizedFood).map((category) => (
                    <div className="list-combo" key={category}>
                        <h1>{category}</h1>
                        <div className="list-combo-items">
                            {organizedFood[category].map(item => (
                                <div className='list-combo-item' key={item.id}>
                                    <img src={item.image} alt={item.name} />
                                    <div className='list-combo-item-inner'>
                                        <div className="list-combo-item-des">
                                            <h2>{item.name}</h2>
                                            <p>{item.description}</p>
                                            <p>{item.price}</p>
                                        </div>
                                        <div className="quantity">
    <button onClick={() => setDecreaseFood({id:item?.id})} className="quantity-btn decrease">-</button>
    <p>{quantityFood[item?.id] || 0}</p>  
    <button onClick={() => setIncreaseFood({id:item?.id})} className="quantity-btn increase">+</button>
</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div>No food items available</div>
            )}
        </div>
    );
}

export default Popcorn;
