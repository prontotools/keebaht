import React, { Component } from 'react'
import { db } from './firebase'

import './style.css'
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
            amount: doc.data().amount,
            menus: doc.data().menus,
          }, ...prevState.payers
          ]
        }))
      })
    })
  }

  render() {
    console.log(this.state.payers)
    return (
      <div className="margin-main">
        <Header />
        <div className="ui container">
          <div className="ui three column doubling stackable grid container">
            {
              this.state.payers.map(payer =>
                <div className="column" key={payer}>
                  <div className="shadow ui card link card-section fluid">
                    <div className="content">
                      <h3 className="pay-username">{payer.username.toUpperCase()}</h3>
                      <div className="ui description">
                        <div className="ui divided list">
                          {payer.menus.map(item => (
                            <div className="item">
                              <div className="right floated content">
                                <div className="meta">{item.unitPrice} x {item.yourAmount} = {item.unitPrice * item.yourAmount}</div>
                              </div>
                              <div className="meta">
                                {item.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="extra content">
                      <div className="right floated price">
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
