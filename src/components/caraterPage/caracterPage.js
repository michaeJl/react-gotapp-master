import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotServices';
import RowBlock from '../rowBlock';



export default class CaracterPage extends Component {
    gotServices = new GotService();

    state = {
        selected: 0,
        error: false
    }
    componentDidCatch(){
        console.log("error");
        this.setState({error: true})
    }

    onItemSelected =(id)=>{
        this.setState({selected: id})
    }

    render(){
        if (this.state.error) { return <ErrorMessage/>};
        const itemList = (
            <ItemList 
                getData={this.gotServices.getAllCaracters}
                onItemSelected={this.onItemSelected}
                renderItem={(item)=> `${item.name} (${item.gender})`}/>
        )   
        const charDetails = (
            <CharDetails 
            charId={this.state.selected} 
            getData={(id)=>this.gotServices.getCaracter(id)}>
                <Field field="gender" label="Gender" />
                <Field field="born" label="Born" />
                <Field field="died" label="Died" />
                <Field field="culture" label="Culture" />
            </CharDetails>
        )
        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}