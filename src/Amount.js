import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { assoc, when, map, propEq } from 'ramda'
import { Container, Form, Input } from 'semantic-ui-react'
import Header from './Header'
import { db } from './firebase'

class Amount extends Component {
  state = {
    username:'',
    menus: [],
    amountToPay: 0
  }

  componentDidMount() {
    db.collection('menus').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.setState(prevState => ({
          menus: [
            {
              id: doc.id,
              name: doc.data().name,
              amount: doc.data().amount,
              total: doc.data().total,
              unitPrice: doc.data().unitPrice,
              yourAmount: 0
            },
            ...prevState.menus
          ]
        }))
      });
    });
  }

  handleOnChange = (menuId, e) => {
    const amount = +e.target.value
    this.computePrice(menuId, amount)
  }

  computePrice = (menuId, amount) => {
    const currentMenu = this.state.menus
    const alter = (key, value, items) => map(
      when(propEq('id', key), assoc('yourAmount', value)),
      items
    )
    const newMenu = alter(menuId, amount, currentMenu)
    this.setState({
      menus: newMenu
    })
    const newArray = newMenu.map(menu => (
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
    db.collection('payers').add({
      name: this.state.username,
      date_create: new Date(),
      amount: this.state.amountToPay,
      menus: this.state.menus
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
      <div className="margin-main">
        <Header />
        <Container text>
          <div>
            <Form>
              <Form.Group inline>
                <Form.Field>
                  <label>Who?</label>
                  <Input
                    onChange={this.handleWho}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
            <table class="ui olive table">
              <thead>
                <tr>
                  <th>Menu</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
              {this.state.menus.map((menu) =>(
                <tr>
                  <td>{menu.name}</td>
                  <td>
                    <div class="ui input focus">
                      <input
                        type="text"
                        onChange={e => this.handleOnChange(menu.id, e) }
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
        </Container>
      </div>
    )
  }
}

export default Amount
