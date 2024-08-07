import './style.css';
import Popcorn from './popcorn/Popcorn';
const Orderpopcorn = () => {
    return (<div className="order-pop">
        <h1>Chọn rạp gần bạn</h1>
        <form>
            <select>
                <option value="CINstar quoc thanh">CINstar quoc thanh</option>
            </select>
        </form>
        <Popcorn></Popcorn>
    </div>);
}
export default Orderpopcorn;