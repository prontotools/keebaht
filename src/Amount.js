import React, { Component } from 'react'
import { db } from './firebase'

class Amount extends Component {
  state = {
    username:'',
    menu: [],
    amountToPay: 0,
  }

  componentDidMount() {
    db.collection("menus").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          this.setState(prevState => ({
            menu: [{
              name: doc.data().name,
              amount: doc.data().amount,
              price: doc.data().price
            }, ...prevState.menu]
          }))
      });
    });
  }

  handleOnChange = (menuIndex, e) => {
    const amount = e.target.value
    this.setState({

    })
  }

  computePrice = () => {
    this.setState({
      amountToPay: 0
    })
  }

  handleOkay = () => {
    console.log('okay')
    db.collection("payers").add({
      name: this.state.username,
      date_create: new Date(),
      amount: this.state.amountToPay
    })
  }

  handleWho = e => {
    const username = e.target.value
    this.setState({
      username
    })
  }


  render() {
    return (
      <div>
        <h1>Keebaht?</h1>
        <h2>Who?
          <input
            type="text"
            onChange={this.handleWho}
          />
        </h2>
        <table class="ui olive table">
          <thead>
            <tr>
              <th>Menu</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
          {this.state.menu.map((menu, index) =>(
            <tr>
              <td>{menu.name}</td>
              <td>
                <input
                  type="text"
                  onChange={ (e) => this.handleOnChange(index, e) }
                />
              </td>
            </tr>
          ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Subtotal</td>
              <td>{this.state.amountToPay}</td>
            </tr>
          </tfoot>
        </table>
        <button
          class="ui secondary button"
          onClick={this.handleOkay}
        >
          Okay
        </button>
      </div>
    )
  }
}

export default Amount