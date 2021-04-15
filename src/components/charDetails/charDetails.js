import React, {Component} from 'react';
import './charDetails.sass';
import Spinner from '../spinner';

const Field = ({char,field,label})=>{
    return (
        <li className="list-group-item d-flex justify-content-between">
        <span className="term">{label}</span>
        <span>{char[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class CharDetails extends Component {

        state ={
            char: null,
            loading: true
        }
        
        componentDidMount(){
            this.updateChar();
        }
        componentDidUpdate(prevProps){
            if (this.props.charId !== prevProps.charId){
                this.updateChar();   
            }
        }
        updateChar = ()=>{
           this.setState({loading: true});
            const {charId} = this.props;
            if (!charId){
                return 
            }
            this.props.getData(charId)
                .then((char)=>{
                    this.setState({char,loading: false});
                })
        }
        

    render() {

        if (!this.state.char){
           return <span className="select-error">Please select a caracter</span>
        }
        
        if (this.state.loading) {
            return ( <div className="char-details rounded">
                <Spinner/>
            </div>
            )
        }
        const {char} = this.state;
        const {name} = char;
        
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                   {
                       React.Children.map(this.props.children,(child)=>{
                        return React.cloneElement(child,{char})
                       })
                   }
                </ul>
            </div>
        );
    }
}




//  <li className="list-group-item d-flex justify-content-between">
//                         <span className="term">Born</span>
//                         <span>{born}</span>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between">
//                         <span className="term">Died</span>
//                         <span>{died}</span>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between">
//                         <span className="term">Culture</span>
//                         <span>{culture}</span>
//                     </li>