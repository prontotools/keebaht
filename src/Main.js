import React, { Component } from 'react'
import './style.css'

class Main extends Component {
    render() {
        return(
            <div class="margin-main">
                <h1 class="ui center aligned header">Keebaht ?</h1>
                <div class="ui container">
                    <div class="ui two steps">
                        
                            <div class="step">
                                <a href="/Billing">
                                    <div class="content">
                                        <div class="title">Billing</div>
                                        <div class="description">Enter billing information</div>
                                    </div>
                                </a>
                            </div>
                      
                        
                        <div class="step">
                            <a href="/Amount">
                                <div class="content">
                                    <div class="title">Keebaht</div>
                                    <div class="description">Show you have to pay Keebaht</div>
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
