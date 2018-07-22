import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { db } from './firebase'

class OverallProgress extends Component {
  state = {
    menus: []
  }

  componentDidMount() {
    let menus = []
    db.collection('menus').onSnapshot(querySnapshot => {
      this.setState({
        menus: []
      })
      querySnapshot.forEach(doc => {
        menus = [
          ...menus,
          {
            id: doc.id,
            name: doc.data().name,
            currentAmount: 0,
            totalAmount: doc.data().amount
          }
        ]
      })
      let payers = []
      db.collection('payers').onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          payers = [
            ...payers,
            {
              menus: doc.data().menus
            }
          ]
        })

        menus.forEach(menu => {
          let currentAmount = 0
          payers.forEach(payer => {
            const matchedMenu = payer.menus.filter(eachMenu => eachMenu.id === menu.id)
            currentAmount += matchedMenu[0] ? matchedMenu[0].yourAmount : 0
          })
          this.setState(prevState => ({
            menus: [
              ...prevState.menus,
              {
                id: menu.id,
                name: menu.name,
                currentAmount: currentAmount,
                totalAmount: menu.totalAmount
              }
            ]
          }))
        })
      })
    })
  }

  render() {
    return(
      <div className="ui container" style={{marginTop: '20px'}}>
        <h1 className="ui center aligned header">
          ลงกันครบยัง?
        </h1>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>#</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              this.state.menus.map(item => (
                <Table.Row>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell
                    style={
                      item.currentAmount > item.totalAmount ? { color: 'red' } : item.currentAmount === item.totalAmount ? { color: 'green' } : {}
                    }
                  >{item.currentAmount}/{item.totalAmount}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default OverallProgress
