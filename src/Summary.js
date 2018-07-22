import React, { Component } from 'react'
import { db } from './firebase'
import Header from './Header'

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
            })
        })
    }

    render() {
        return (
            <div className="margin-main">
                <Header />
                <div className="ui container">
                    <div class="ui three column grid stackable">
                        {
                            this.state.payers.map(payer =>
                                <div className="ui column">
                                    <div class="ui card">
                                        <div class="content">
                                            <div class="center aligned header">{payer.username}</div>
                                            <div class="center aligned description">
                                                <p></p>
                                            </div>
                                        </div>
                                        <div class="extra content">
                                            <div class="right floated">
                                                {payer.amount}฿
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Summary
