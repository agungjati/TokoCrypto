import React from 'react';
import './style.css'
import {  Link } from 'react-router-dom'


class Navigasi extends React.Component {
    render() {
        return (<div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
                <Link className="navbar-brand" to="/">TokoCrypto</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                        <Navright />
                </div>
            </nav>
        </div >)
    }
}

const Navright = () => {
    if (document.cookie) {
        const cookie = document.cookie.split(";")
        let findCookie = cookie.find((elem) => {
            const el = elem.split("=")
            return el[0] === "username" 
        })
        
        if(findCookie){
            if(findCookie.split("=")[1]){
                return (
                    <ul className="navbar-nav">
                        <li>
                            <Link className="nav-item nav-link" to="/keluar">Keluar</Link>
                        </li>
                    </ul>)
            }
        }
    }
    return (
        <ul className="navbar-nav">
            <li>
                <Link className="nav-item nav-link" to="/masuk">Masuk</Link>
            </li>
            <li>
                <Link className="nav-item nav-link" to="/buatakun">Buat Akun</Link>
            </li>
        </ul>)
}
export default Navigasi