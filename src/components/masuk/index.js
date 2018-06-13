import React from 'react'
import $ from 'jquery'
import { Redirect } from 'react-router-dom'

class Masuk extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            redirect: false
        }


        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        
        $.ajax({
            url: "http://localhost:3000/users?"+ $(e.target).serialize(),
            method: "GET",
            success: (data) =>{
                console.log(data)
                if(data.length > 0 && data[0].username !== "undefined"){
                        document.cookie = `username=${data[0].username}`
                        this.setState({ redirect : true })
                }else{ alert('Login gagal !') }
                
            },
            error: (msg) =>{
                console.log(msg)
            }
        })
    }

    render() {
        if(this.state.redirect) return <Redirect to="/" />
        return (<div className="container">
        <div className="row">
            <div className="col-sm-4 offset-sm-4 mt-3 bg-light shadow rounded  py-4">
                <h3 className="text-center border-bottom pb-3">Masuk ke TokoCrypto</h3>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-sm-12">
                            <input type="text" className="form-control rounded-0 py-2" name="username" defaultValue="agungjati94@gmail.com" placeholder="Username" />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-12">
                            <input type="password" className="form-control rounded-0 py-2" defaultValue="password" name="password" placeholder="Password" />
                        </div>
                    </div>
                    <div className="row mt-3 border-top pt-3">
                        <div className="col-sm-12">
                            <input type="submit" className="btn btn-block btn-success  rounded-0 py-2" value="Masuk" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>)
    }
}

export default Masuk