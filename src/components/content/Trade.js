import React from 'react'
import $ from 'jquery'

class Trade extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            isLoaded: false,
            jualCrypto: 0,
            beliCrypto: 0,
            crypto: "",
            items: [],
            saldo: []
        }

        this.beli = this.beli.bind(this)
        this.jual = this.jual.bind(this)
    }


    sortById = () => {
        this.setState({ items: this.state.items.sort() })
    }

    componentDidMount() {
        let username = ""
        if (document.cookie) {
            const cookie = document.cookie.split(";")
            let findCookie = cookie.find((elem) => {
                const el = elem.split("=")
                return el[0] === "username"
            })

            if (findCookie) {
                if (findCookie.split("=")[1]) {
                    username = findCookie.split("=")[1]
                }
            }
        }

        fetch("https://api.coinmarketcap.com/v2/ticker/" + this.props.id + "/?convert=IDR")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    items: result.data
                })
                fetch("http://localhost:3000/saldo?username=" + username)
                    .then(res => res.json())
                    .then((result) => {
                        this.setState({
                            isLoaded: true,
                            saldo: result[0].saldo
                        })
                    },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            })
                        })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    saldoCrypto = (saldo, items) => {
        let Cryptos = 0,
            findCrypto = saldo.find(elem => {
                return elem[items.symbol] !== undefined
            })
        if (findCrypto) Cryptos = findCrypto[items.symbol]
        return Cryptos
    }

    saldoIDR = (saldo) => {
        let IDR = 0,
            findIDR = saldo.find(elem => {
                return elem["IDR"] !== undefined
            })

        if (findIDR) IDR = findIDR["IDR"]
        return IDR
    }

    beli(e) {
        const { items, saldo } = this.state
        if (items && saldo && items.quotes) {
            let { IDR } = items.quotes,
                saldoIDR = this.saldoIDR(saldo),
                value = Number(Number(e.target.value) / Number(IDR.price))
            if (Number(e.target.value) > saldoIDR){
                $(e.target).addClass("border-red")
            }else{ 
                $(e.target).removeClass("border-red")
                this.setState({ beliCrypto: value.toFixed(9) }) 
            }
        }
    }

    jual(e) {
        const { items, saldo } = this.state
        if (items && saldo && items.quotes) {
            let { IDR } = items.quotes,
                saldoCrypto = this.saldoCrypto(saldo, items),
                value = Number(Number(e.target.value) * Number(IDR.price))
            if (Number(e.target.value) > saldoCrypto) { 
                $(e.target).addClass("border-red")
            }
            else { 
                this.setState({ jualCrypto: value.toFixed(6) }) 
                $(e.target).removeClass("border-red")
            }
        }
    }

    render() {
        let { beliCrypto, jualCrypto, crypto } = this.state

        return (<div className="container">
            <div className="row">
                <div className="col-sm-10 offset-sm-1 mt-3 bg-light shadow rounded pt-3">
                    <Header items={this.state} back={this.props.back} />
                    <div className="row">
                        <div className="col-md-6 border-right pb-3">
                            <div className="container">
                                <form className="form" onSubmit={this.jual}>
                                    <div className="row mt-2">
                                        <div className="col-md-12 border-left">
                                            <h6>Jual Crypto</h6>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <input type="number" name="banyakCrypto" className="form-control" onChange={this.jual} />
                                            <input type="hidden" name="currency" value={crypto} />
                                            <input type="hidden" name="jual" value="true" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <input type="number" name="banyakRupiah" className="form-control" value={jualCrypto} readOnly />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3 offset-md-9">
                                            <input type="submit" className="btn btn-block btn-success" value="Jual" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className="container">
                                <form className="form" onSubmit={this.jual}>
                                    <div className="row mt-2">
                                        <div className="col-md-12 border-left">
                                            <h6>Beli Crypto</h6>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <input type="number" name="banyakRupiah" className="form-control" onChange={this.beli} />
                                            <input type="hidden" name="currency" value={crypto} />
                                            <input type="hidden" name="jual" value="true" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <input type="number" name="banyakCrypto" className="form-control" value={beliCrypto} readOnly />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3 offset-md-9">
                                            <input type="submit" className="btn btn-block btn-success" value="Beli" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

let Header = (props) => {
    const { error, isLoaded, items, saldo } = props.items

    if (error) {
        return (<div>
            Error
        </div>)
    } else if (!isLoaded) {
        return (<div>
            Loading...
        </div>)
    } else {

        let findCrypto = saldo.find(elem => {
            return elem[items.symbol] !== undefined
        })
        let findIDR = saldo.find(elem => {
            return elem["IDR"] !== undefined
        })

        let saldoCrypto = 0, saldoIDR = 0;
        if (findCrypto) saldoCrypto = findCrypto[items.symbol]
        if (findIDR) saldoIDR = findIDR["IDR"]
        return (
            <div className="border-bottom pb-3">
                <h5 className="d-inline"><span onClick={props.back} className="fa fa-arrow-circle-o-left mr-3 link"></span>Jual atau Beli {items.name}</h5>
                <span className="float-right">
                    <strong>Saldo : </strong> Rp. {saldoIDR} & {saldoCrypto} {items.symbol} | <strong>Harga Crypto : </strong>  ${items.quotes.USD.price} / Rp {Math.round(items.quotes.IDR.price)}
                </span>
            </div>)
    }
}


export default Trade