import React, {Component} from 'react';
import '../charDetails/charDetails.sass';
import CharDetails, {Field} from '../charDetails';
import GotService from '../../services/gotServices';

class BookItem extends Component {
    
    gotServices = new GotService();

    render(){
        return(
            <CharDetails 
            charId={this.props.bookId} 
            getData={(id)=>this.gotServices.getBook(id)}>
                <Field field="name" label="Name" />
                <Field field="numberOfPages" label="NumberOfPages" />
                <Field field="publisher" label="Publisher" />
                <Field field="released" label="Released" />
            </CharDetails>
        )
    }
}

export default BookItem;