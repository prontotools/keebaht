import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from './firebase'

class Amount extends Component {
  state = {
    username:'',
    menu: [],
    amountToPay: 0
  }

  componentDidMount() {
    db.collection("menus").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          this.setState(prevState => ({
            menu: [{
              name: doc.data().name,
              amount: doc.data().amount,
              total: doc.data().total,
              unitPrice: doc.data().unitPrice,
              yourAmount: 0
            }, ...prevState.menu]
          }))
      });
    });
  }

  handleOnChange = (menuIndex, e) => {
    const amount = e.target.value
    this.computePrice(menuIndex, amount)
  }

  computePrice = (menuIndex, amount) => {
    this.state.menu[menuIndex].yourAmount = amount
    const newArray = this.state.menu.map((menu) => (
      menu.unitPrice * menu.yourAmount
    ))
    this.setState({
      amountToPay: newArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    })
  }

  handleOkay = () => {
    console.log('okay')
    db.collection("payers").add({
      name: this.state.username,
      date_create: new Date(),
      amount: this.state.amountToPay,
      menu: this.state.menu
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
        <h1>กี่บาท?</h1>
        <h2>Who?
        <div class="ui input focus">
        <input
            type="text"
            onChange={this.handleWho}
          />
        </div>
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
                <div class="ui input focus">
                  <input
                    type="text"
                    onChange={ (e) => this.handleOnChange(index, e) }
                  />
                </div>
              </td>
            </tr>
          ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{this.state.amountToPay}</td>
            </tr>
          </tfoot>
        </table>
        <Link to='/summary'>
          <button
            class="ui secondary button"
            onClick={this.handleOkay}
          >
            Okay
          </button>
        </Link>
      </div>
    )
  }
}

export default Amount