import React, { Component } from 'react'
import { db } from './firebase'
import Main from './Main'

import './style.css'

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
            menu: doc.data().menu
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
        <h1 className="ui center aligned header">กี่บาท?</h1>
        <div className="ui container">
          <div class="ui three column doubling stackable grid container">
            {
              this.state.payers.map(payer =>
                <div className="column">
                  <div class="shadow ui card link card-section fluid">
                    <div class="content">
                      <h3 class="pay-username">{payer.username.toUpperCase()}</h3>
                      <div class="ui description">
                        <div class="ui divided list">
                          {payer.menu.map(item => (
                            <div class="item">
                              <div class="right floated content">
                                <div class="meta">{item.total} x {item.amount} = {item.total * item.amount}</div>
                              </div>
                              <div class="meta">
                                {item.name}
                              </div>
                            </div>
                          ))}

                        </div>

                      </div>
                    </div>
                    <div class="extra content">
                      <div class="right floated price">
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
