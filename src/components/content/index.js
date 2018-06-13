import React from 'react'
import $ from 'jquery'
import Trade from './Trade'

class Content extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            isLoaded: false,
            tradeId: null,
            items: []
        }

        this.onTrading = this.onTrading.bind(this)
        this.onBack = this.onBack.bind(this)
    }


    sortById = () => {
        const { items } = this.state
        this.setState({ items: items.sort() })
    }

    fetching = () => {
        fetch("https://api.coinmarketcap.com/v2/ticker/")
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                items: Object.values(result.data),
                error: null
            })
        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error.message
                })
            })
    }
    componentDidMount() {
        this.fetching()
    }

    componentDidUpdate() {
        if(this.state.error) setTimeout(() => { this.fetching() }, 5000)

        setTimeout(() => { 
            this.fetching()
            console.log("updating for 5 minutes..")
        }, 5*60*1000)
    }

    comparer = (index) => {
        return (a, b) => {
            var valA = this.getCellValue(a, index), valB = this.getCellValue(b, index)
            if(valA.slice(0,1) === "$" ) valA = valA.slice(1)
            if(valB.slice(0,1) === "$" ) valB = valB.slice(1)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    getCellValue = (row, index) => { return $(row).children('td').eq(index).text() }

    sort = (e) => {
        if($(e.target).find("span").length)
        {
            var table = $(e.target).parents('table').eq(0)
            var rows = table.find('tr:gt(0)').toArray().sort(this.comparer($(e.target).index()))
            this.asc = !this.asc
            if (!this.asc) { rows = rows.reverse() }
            for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
            $(e.target).find("span").length === 0 ? $(e.target).toggleClass("fa-arrow-down") : $(e.target).find("span").toggleClass("fa-arrow-down")
        }
    }

    onTrading(id){
        if (document.cookie || !document.cookie) {
            let cookie = document.cookie.split("=")
            if (cookie[0] === "username" || cookie[0] !== "username") {
                if(!cookie[1] || cookie[1] ===  "undefined" ){ alert('Login dulu !') }
            }
        }
        if(id) this.setState({ tradeId : id })
    }

    onBack(){
        this.setState({ tradeId : null })
    }

    render() {
        
        if (document.cookie) {
                let cookie = document.cookie.split("=")
                if (cookie[0] === "username") {
                    if(cookie[1] && this.state.tradeId) return <Trade id={this.state.tradeId} back={this.onBack} />
                } 
        }

        return (<div className="container">
                <div className="row">
                    <div className="col-sm-12 mt-3 bg-light shadow rounded py-2">
                        <h3 className="text-center border-bottom pb-3">Top 100 Cryptocurrencies by Market Capitalization</h3>
                        <div className="table-responsive text-lead">
                            <table className="table" id="tablesort">
                                <thead>
                                    <tr className="bg-dark text-white shadow">
                                        <th scope="col" className="link" onClick={this.sort}># <span key="1" className="fa fa-arrow-up"></span></th>
                                        <th scope="col" >Name</th>
                                        <th scope="col">Market Cap</th>
                                        <th scope="col">Price</th>
                                        <th scope="col" className="link" onClick={this.sort}>Volume(24h) <span key="2" className="fa fa-arrow-up"></span></th>
                                        <th scope="col">Circulating Supply</th>
                                        <th scope="col" className="link" onClick={this.sort}>Change(24h) <span key="3" className="fa fa-arrow-up"></span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Tdcontent items={this.state} onTrading={this.onTrading} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

let Tdcontent = (props) => {
    const { items, error, isLoaded } = props.items

    if (error) {
        return (<tr>
            <td>{ error }</td>
        </tr>)
    } else if (!isLoaded) {
        return (<tr>
            <td>Loading...</td>
        </tr>)
    } else {
        return items.sort((a, b) =>{ return a.rank - b.rank})
        .map((item, index) => {
            let quote = item.quotes.USD
            return (<tr className="link" key={index} onClick={() => props.onTrading(item.id)} >
                <td className="font-weight-bold">{++index}</td>
                <td>{item.name}</td>
                <td>${quote.market_cap}</td>
                <td>${quote.price}</td>
                <td>${quote.volume_24h}</td>
                <td>{item.circulating_supply} {item.symbol}</td>
                <td>{quote.percent_change_24h}%</td>
            </tr>)
        })
    }
}
export default Content 