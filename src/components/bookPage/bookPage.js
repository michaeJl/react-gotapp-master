import React, {Component} from 'react';
import ItemList from '../itemList';
import GotService from '../../services/gotServices';
import {withRouter} from 'react-router-dom';

class BookPage extends Component {
    gotServices = new GotService();

    render(){

        return (
          
            <ItemList 
                getData={this.gotServices.getAllBooks}
                onItemSelected={(itemId)=>{
                        this.props.history.push(itemId);
                    }
                }
                renderItem={(item)=> `${item.name}`}/>
        )
    }
}
export default withRouter(BookPage);