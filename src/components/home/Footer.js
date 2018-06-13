import React from 'react';


class Footer extends React.Component {
    render() {
        const time = new Date();
        return (<footer className="container-fluid px-4 pt-5 mt-5">
           <h5 className="text-lead"> © {time.getFullYear()} TokoCrypto</h5>
            </footer>)
    }
}


export default Footer