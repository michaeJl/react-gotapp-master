import React, {Component} from 'react';
import './randomChar.sass';
import GotService from '../../services/gotServices';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage'

export default class RandomChar extends Component {
    
    gotServices = new GotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount(){
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 1500);
    }
    componentWillUnmount(){
        clearInterval(this.timerId);
    }
    onCharLoaded=(char)=>{
        this.setState({
            char,
            loading: false})
    }
    onError= (err)=>{
        this.setState({
            error: true,
            loading: false,

        })
    }

    updateChar =()=>{
        const id = Math.floor(Math.random()*140 +25) ;
        this.gotServices.getCaracter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
            
    }

    render() {
        const {char ,loading,error} = this.state;

        const content = error ? <ErrorMessage/> : (loading ? <Spinner/> : <View char={char}/>);
 

        return (
            <div className="random-block rounded">
                {content}
            </div>
        );
    }
}

const View = ({char})=>{
    let {name,gender,born,died,culture} = char;
    // if (gender === '') {gender = 'nani'};
    // if (born === '') {born = 'nani'};
    // if (died === '') {died = 'nani'};
    // if (culture === '') {culture = 'nani'};

    // let c = {};
    // for(let key in char){
    //     if (char[key]===''){
    //         char[key] = 'nani' 
    //         c[key] = char[key]
    //     } else {c[key]  = char[key]}
    // }
    // const {name,gender,born,died,culture} = c;
    return(
        <>
        <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </>
    )
}