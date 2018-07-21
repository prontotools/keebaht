import React, { Component } from 'react'
import { db } from './firebase'

class Summary extends Component {
    state = {
        payers: [],
    }

    componentDidMount() {
        db.collection('payers').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState(prevState => ({
                    payers: [{
                        username: doc.data().name,
                        amount: doc.data().amount
                    }, ...prevState.payers
                    ]
                }))
            });
        });
    }

    render() {
        return (
            <div>
                <h1>KeeBath?</h1>
                {
                    this.state.payers.map(payer => (
                        payer.username === this.props.username ?
                            <h1>{payer.username}{payer.amount}</h1> :
                            <li>{payer.username}{payer.amount}</li>
                    ))
                }
            </div>
        )
    }
}

export default Summary