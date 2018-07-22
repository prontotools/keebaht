import React, { Component } from 'react'
import { Container, Form, Header, Table } from 'semantic-ui-react'
import { db } from './firebase'

class Billing extends Component {
  state = {
    name: '',
    amount: '',
    total: '',
    sumTotal: 0,
    menus: []
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleAmount = (e) => {
    this.setState({
      amount: e.target.value
    })
  }

  handleTotal = (e) => {
    this.setState({
      total: e.target.value
    })
  }

  handleSubmit = () => {
    this.setState(prevState => ({
      sumTotal: prevState.sumTotal + +this.state.total,
      menus: prevState.menus.concat({
        name: this.state.name,
        amount: this.state.amount,
        total: this.state.total
      })
    }))

    this.setState({
      name: '',
      amount: '',
      total: ''
    })

    db.collection('menus').add({
      name: this.state.name,
      amount: +this.state.amount,
      total: +this.state.total,
      unitPrice: +this.state.total / +this.state.amount
    })
  }

  componentDidMount() {
    db.collection('menus').onSnapshot(querySnapshot => {
      this.setState({
        menus: []
      })
      let sumTotal = 0

      querySnapshot.forEach(doc => {
        this.setState(prevState => ({
          menus: [
            ...prevState.menus,
            {
              name: doc.data().name,
              amount: doc.data().amount,
              total: doc.data().total
            }
          ]
        }))
        sumTotal += doc.data().total
      })

      this.setState({
        sumTotal
      })
    })
  }

  render() {
    return (
      <Container text>
        <Header as='h1'>Keebaht?</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              placeholder='Name'
              value={this.state.name}
              onChange={this.handleName}
            />
            <Form.Input
              fluid
              placeholder='#'
              value={this.state.amount}
              onChange={this.handleAmount}
            />
            <Form.Input
              fluid
              placeholder='Total'
              value={this.state.total}
              onChange={this.handleTotal}
            />
            <Form.Button content='+' />
          </Form.Group>
        </Form>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              this.state.menus.map(item => (
                <Table.Row>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.amount}</Table.Cell>
                  <Table.Cell>{item.total}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell>{this.state.sumTotal}</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    )
  }
}

export default Billing
