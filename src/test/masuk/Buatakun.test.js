import React from 'react'
import $ from 'jquery'
import { Redirect } from 'react-router-dom'

it('renders without crashing', () => {
    class Buatakun extends React.Component {
        constructor(props){
            super(props)
    
            this.state = {
                redirect: false
            }
    
            this.onSubmit = this.onSubmit.bind(this)
        }
    
        onSubmit(e){
            e.preventDefault()
            $.ajax({
                url: "http://localhost:3000/users",
                method: "POST",
                data: $(e.target).serializeArray(),
                dataType: "JSON",
                success: (data) =>{
                    let datasaldo = {}
                    datasaldo = {
                        username: "agungjati94@gmail.com",
                        saldo: [{IDR: "10000000"}]
                    }
                    $.ajax({
                        url: "http://localhost:3000/saldo",
                        type: "POST",
                        data: JSON.stringify(datasaldo),
                        dataType:' json',
                        contentType: 'application/json',
                        success: (data) =>{
                            document.cookie = `username=${data.username}`
                            this.setState({ redirect : true })
                            console.log(data)
                        },
                        error: (msg) =>{
                            console.log(msg)
                        }
                    })
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
                <div className="col-sm-6 offset-sm-3 mt-3 bg-light shadow rounded  py-4">
                    <h3 className="text-center border-bottom pb-3">Buat Akun TokoCrypto</h3>
                    <form className="form" onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-sm-6">
                                <input type="text" className="form-control rounded-0 py-2" name="firstname" placeholder="Nama depan" required/>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" className="form-control rounded-0 py-2" name="lastname" placeholder="Nama belakang" />
                            </div>
                        </div>
                        <div className="row mt-3">
                        <div className="col-sm-6">
                                <input type="email" className="form-control rounded-0 py-2" name="username" placeholder="Username" required/>
                            </div>
                            <div className="col-sm-6">
                                <input type="password" className="form-control rounded-0 py-2" name="password" placeholder="Password"  required/>
                            </div>
                        </div>
                        <input type="hidden" name="saldo" value="10000000" />
                        <div className="row mt-3 border-top pt-3">
                            <div className="col-sm-12">
                                <input type="submit" className="btn btn-block btn-success  rounded-0 py-2" value="Buat Akun" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
        }
    }
})