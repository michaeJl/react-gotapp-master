import React, {Component} from 'react';
import './itemList.sass'; 
// import GotService from '../../services/gotServices';
import Spinner from '../spinner/spinner';

export default class ItemList extends Component {


    state ={
        itemList: null
    }

    componentDidMount(){
        const {getData} = this.props;
        getData()
            .then( (itemList)=>{
                this.setState({itemList})
            })
    }

    renderItems = (arr)=>{
        return arr.map((item)=>{
            const  {id}= item;
            const label = this.props.renderItem(item)
            return (
                <li 
                key={id} 
                className="list-group-item"
                onClick={()=> this.props.onItemSelected(id)} 
                >
                    {label}
                </li>
            )
        })
    }

    render() {

        const {itemList} = this.state;
        if (!itemList){
            return <Spinner/>
        }
        const items = this.renderItems(itemList);
        return (
            <ul className="item-list list-group">
               {items}
            </ul>
        );
    }
}



// <- хук useEffect, useState
// function ItemList({getData,renderItem,onItemSelected}) {

//     let [itemList, setItemList] = useState([]);

//     useEffect(()=>{
//         getData()
//             .then( (data)=>{
//                 setItemList(data)
//             })
//     },[])

//     function renderItems(arr){
//         return arr.map((item)=>{
//             const  {id}= item;
//             const label = renderItem(item)
//             return (
//                 <li 
//                 key={id} 
//                 className="list-group-item"
//                 onClick={()=> onItemSelected(id)} 
//                 >
//                     {label}
//                 </li>
//             )
//         })
//     }


//     if (!itemList){
//         return <Spinner/>
//     }
//     const items = renderItems(itemList);
//     return (
//         <ul className="item-list list-group">
//             {items}
//         </ul>
//     );
// }

// export default ItemList;