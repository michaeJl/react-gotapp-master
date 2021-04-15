import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CaracterPage from '../caraterPage';
import GotService from '../../services/gotServices';
import {BookPage,BookItem} from '../bookPage';
import HousePage from '../housePage';
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class App extends Component {
    gotServices = new GotService();

    constructor(props){
        super(props);
        this.state = {
            toggle: true,
            error: false
        }
    }
    componentDidCatch(){
        console.log("error");
        this.setState({error: true})
    }
    toggleRandomCaracter = ()=>{
        this.setState(({toggle})=>({
            toggle: !toggle
        }))
    }

    // onCharSelected =(id)=>{
    //     this.setState({selectedChar: id})
    // }

    render() {
        const {toggle} = this.state;

        const toggleChar = toggle ? <RandomChar/> : null;

        if (this.state.error) { return <ErrorMessage/>} 
        // <- используется при какой-нибудь жесткой ошибке жизненного цила, но не в личных методах. Также используются границы ошибки
       return(
        <Router>
            <div className="app"> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {toggleChar}
                            <button 
                            className="HiddenRandomChar btn-primary"
                            onClick={this.toggleRandomCaracter}> hidden random Character</button>
                        </Col>
                    </Row>
                    <Route path="/caracters/" component={CaracterPage}/>
                    <Route path="/books/" exact component={BookPage}/>
                    <Route path="/houses/" component={HousePage}/>
                    <Route path="/books/:id" render={
                        ({match,history})=>{
                            console.log(history);
                            console.log(match);
                            const {id} = match.params;
                            return  <BookItem bookId={id}/>
                        }
                    }/>
                </Container>
            </div>
        </Router>
    )
    }
};


/* <Row>
                <Col md='6'>
                    <ItemList onItemSelected={this.onItemSelected}/>
                </Col>
                <Col md='6'>
                    <CharDetails charId={this.state.selectedChar}/>
                </Col>
            </Row> */

