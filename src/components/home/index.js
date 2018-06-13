import React from 'react';
import Navigasi from './Navigasi'
import Content from '../content'
import Masuk from '../masuk'
import Buatakun from '../masuk/Buatakun'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Footer from './Footer';

class Home extends React.Component {

    render() {
        
        return (<div>
            <Router>
                <div>
                <Navigasi />
                    <Route exact path="/" component={Content} />
                    <Route path="/masuk" component={Masuk} />
                    <Route path="/buatakun" component={Buatakun} />
                    <Route path="/keluar" render={() => {
                        document.cookie = "username="
                        return <Redirect to="/" />
                    }} />
                </div>
            </Router>
            <Footer />
        </div>)
    }
}

export default Home
