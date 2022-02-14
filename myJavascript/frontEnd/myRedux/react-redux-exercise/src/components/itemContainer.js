import { connect } from "react-redux";
import { buyCake } from "../cake/cakeAction";
import { buyIceCream } from "../iceCream/iceCreamActions";

const ItemContainer = (props) => {
    return ( 
        <div>
            <h1>Item : {props.item}</h1>
            <button onClick={props.buyItem}>Buy Items</button>
        </div>
     );
}
 
// mapping Redux state to React(props) App
const mapStateToProps = ( state, ownProps ) => {
    const itemState = ownProps.cake 
        ? state.cake.numberOfCakes
        : state.iceCream.numberOfIceCream
    return { 
        item : itemState
    }
}   

const mapDispatchToProps = ( dispatch, ownProps ) => {
    const dispatchFunction = ownProps.cake 
        ? () => dispatch(buyCake())
        : () => dispatch(buyIceCream())
    return { 
        buyItem : dispatchFunction
    }
}

// connect(redux state, redux dispatch)(react component)
// if one of the elements not needed to pass, just set null.
// for example, connect(null, mapDispatchToProps)
export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);