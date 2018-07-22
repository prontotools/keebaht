import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

class Main extends Component {
  render() {
    return(
      <div className="margin-main">
        <Header />
        <div className="ui container shadow">
          <div class="ui three steps no-border">
            <div className="step">
              <Link to="/billing">
                <div className="content center-content">
                  <img src="https://image.flaticon.com/icons/svg/945/945935.svg" width="50px;"/>
                  <div className="title head-space">Billing</div>
                  <div className="description">Enter billing information</div>
                </div>
              </Link>
            </div>

            <div className="step">
              <Link to="/amount">
                <div className="content center-content">
                  <img src="https://image.flaticon.com/icons/svg/945/945920.svg" width="50px;"/>
                  <div className="title head-space">Keebaht</div>
                  <div className="description">Show you have to pay Keebaht</div>
                </div>
              </Link>
            </div>

            <div className="step">
              <Link to="/summary">
                <div className="content center-content">
                  <img src="https://image.flaticon.com/icons/svg/945/945929.svg" width="50px;"/>
                  <div className="title head-space">Summary</div>
                  <div className="description">Show your summaryKeebaht</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
