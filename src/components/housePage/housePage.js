import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotServices';
import RowBlock from '../rowBlock';

export default class bookPage extends Component {
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
                getData={this.gotServices.getAllHouses}
                onItemSelected={this.onItemSelected}
                renderItem={(item)=> `${item.name}`}/>
        )   
        const charDetails = (
            <CharDetails 
            charId={this.state.selected} 
            getData={(id)=>this.gotServices.getHouse(id)}>
                <Field field="name" label="Name" />
                <Field field="region" label="Region" />
                <Field field="words" label="Words" />
                <Field field="titles" label="Titles" />
                <Field field="overlord" label="Overlord" />
                <Field field="ancestralWeapons" label="AncestralWeapons" />
            </CharDetails>
        )
        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}