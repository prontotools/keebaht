import React, { Component } from 'react'
import { db } from './firebase'
import { Confirm } from 'semantic-ui-react'

import './style.css'
import Header from './Header'

class Summary extends Component {
  state = {
    id: '',
    payers: [],
    open: false,
  }

  componentDidMount() {
    db.collection('payers').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState(prevState => ({
          payers: [
            {
              id: doc.id,
              username: doc.data().name,
              amount: doc.data().amount,
              menus: doc.data().menus,
            },
            ...prevState.payers
          ]
        }))
      })
    })
  }
  
  open = payerId => {
    this.setState({
      open: true,
      id: payerId
    })
  }
  close = () => {
    this.setState({ open: false })
  }
  
  handleDelete = () => {
    const payerId = this.state.id
    db.collection("payers").doc(payerId).delete().then(() => {
     this.setState({ open: false })
    }) 
  }

  componentDidUpdate(_, prevState) {
    if (this.state.id && prevState.id === this.state.id && prevState.open !== this.state.open) {
      this.setState({
        payers: []
      })
      const payers = []
      db.collection('payers').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          payers.push({
            id: doc.id,
            username: doc.data().name,
            amount: doc.data().amount,
            menus: doc.data().menus,
          })
        })
        this.setState({
          payers
        })
      })
    }
  }



  render() {
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
                      <h3 className="pay-username">{payer.username === '' ? 'Anonymous' : payer.username.toUpperCase()}
                        <i class="trash-hover trash icon right floated" onClick={() => this.open(payer.id)} />
                      </h3>
                      <div className="ui description">
                        <div className="ui divided list">
                          {payer.menus.map(item => (
                            item.yourAmount !== 0 && (
                              <div className="item">
                                <div className="right floated content">
                                  <div className="meta">{item.unitPrice} x {item.yourAmount} = {item.unitPrice * item.yourAmount}</div>
                                </div>
                                <div className="meta">
                                  {item.name}
                                </div>
                              </div>
                            )))}
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
        <Confirm 
          open={this.state.open} 
          onCancel={this.close} 
          onConfirm={this.handleDelete}
        />
      </div>
    )
  }
}

export default Summary
