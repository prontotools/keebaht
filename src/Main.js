import React, { Component } from 'react'
import './style.css'

class Main extends Component {
    render() {
        return(
            <div className="margin-main">
                <h1 className="ui center aligned header">Keebaht ?</h1>
                <div className="ui container shadow">
                    <div class="ui two steps no-border">
                        
                        <div className="step">
                                <a href="/Billing">
                                    <div className="content">
                                    <img src="https://image.flaticon.com/icons/svg/942/942803.svg" width="50px;"/>
                                        <div className="title">Billing</div>
                                        <div className="description">Enter billing information</div>
                                    </div>
                                </a>
                        </div>

                        <div className="step">
                            <a href="/Amount">
                                <div className="content">
                                <img src="https://image.flaticon.com/icons/svg/945/945971.svg" width="50px;"/>
                                    <div className="title">Keebaht</div>
                                    <div className="description">Show you have to pay Keebaht</div>
                                </div>
                            </a>
                        </div> 
                        </div>
                       
                    </div>
                </div>
        )
    }
}
export default Main
