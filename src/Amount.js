import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { assoc, when, map, propEq } from 'ramda'
import { Container, Button, Form, Input } from 'semantic-ui-react'
import Header from './Header'
import { db } from './firebase'
import { List } from 'semantic-ui-react'

class Amount extends Component {
  state = {
    username: '',
    menus: [],
    amountToPay: 0,
    error: false,
    redirect: false
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
    if (this.state.username === '') {
      this.setState({
        error: true
      })
    } else {
      db.collection('payers').add({
        name: this.state.username,
        date_create: new Date(),
        amount: this.state.amountToPay,
        menus: this.state.menus
      })
      this.setState({
        redirect: true
      })
    }
  }

  handleWho = e => {
    const username = e.target.value
    this.setState({
      username
    })
    if (this.state.error) {
      this.setState({
        error: false
      })
    }
  }

  render() {
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/summary'/>
    }
    return (
      <div className="margin-main">
        <Header />
        <Container text>
          <div>
            <Form>
              <Form.Group inline>
                <Form.Field>
                   {!this.state.error?(
                    <Form.Input
                      onChange={this.handleWho}
                      label="Who?"
                      placeholder='Your Name...'
                    />
                  ):
                    <Form.Input
                      onChange={this.handleWho}
                      error
                      label="Who?"
                      placeholder='Your Name...'
                    />
                  }
                </Form.Field>
              </Form.Group>
            </Form>
           
          </div>

           <div className="ui shadow ui card link card-section fluid">
             <List  divided relaxed >
             {this.state.menus.map((menu) =>(
                <List.Item >
                  <List.Content>
                    <div class="ui form">
                    <List.Description as='p'>{menu.name}
                    <div class="ui four wide field right floated">
                      <input type="text" placeholder="Amount.." onChange={e => this.handleOnChange(menu.id, e) } />
                    </div>
                    </List.Description>
                  </div>
                  </List.Content>
                  
                </List.Item>
                ))}
   
                </List>
                
                  <p>Total</p>
                  <p>{this.state.amountToPay}</p>
             <Button
              floated='right'
              size='big'
              color='grey'
              onClick={this.handleOkay}
            >
              Okay
            </Button>
             </div>
  
        </Container>
       
      </div>
    )
  }
}

export default Amount
