import React, { Component } from 'react'
import ResTypeChart from './charts/ResTypeChart'
import ResCuisineChart from './charts/ResCuisineChart'
import ResCategoryChart from './charts/ResCategoryChart'

export default class ViewReports extends Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurantdata: this.props.location.state.restaurant,
            Veg: 0,
            Nonveg: 0,
            Indian: 0,
            Chinese: 0,
            SouthIndian: 0,
            Accomplishments: 0,
            Beverages: 0,
            Starters: 0,
            Snacks: 0,
            MainCourse: 0
        }
    }
    componentDidMount() {
        const resmenu = this.state.restaurantdata.resMenu
        var veg = 0
        var nonveg = 0
        var chinese = 0
        var indian = 0
        var southindian = 0
        var accomplishments = 0
        var beverages = 0
        var starters = 0
        var maincourse = 0
        var snacks = 0

        resmenu.map(eachmenu => {
            if (eachmenu.restype === "Veg") {
                veg++
            }
            else {
                nonveg++
            }
        })
        resmenu.map(eachmenu => {
            switch (eachmenu.resCuisine) {
                case "Chinese":
                    chinese++
                    break;
                case "Indian":
                    indian++
                    break;
                case "South Indian":
                    southindian++
                    break;
                default:
                    break;
            }
        })
        resmenu.map(eachmenu => {
            switch (eachmenu.resCategory) {
                case "Accomplishments":
                    accomplishments++
                    break;
                case "Beverages":
                    beverages++
                    break;
                case "Main Course":
                    maincourse++
                    break;
                case 'Snacks':
                    snacks++
                    break;
                case 'Starters':
                    starters++
                    break;
                default:
                    break;
            }
        })
        this.setState({ Veg: veg })
        this.setState({ Nonveg: nonveg })
        this.setState({ Chinese: chinese })
        this.setState({ Indian: indian })
        this.setState({ SouthIndian: southindian })
        this.setState({ Accomplishments: accomplishments })
        this.setState({ Beverages: beverages })
        this.setState({ MainCourse: maincourse })
        this.setState({ Snacks: snacks })
        this.setState({ Starters: starters })
    }

    render() {

        return (
            <div>
                {/* 
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text"></p>

                            </div>
                        </div>
                    </div>

                </div> */}










                <ResTypeChart veg={this.state.Veg} nonveg={this.state.Nonveg} />
                <ResCuisineChart chinese={this.state.Chinese} indian={this.state.Indian} southindian={this.state.SouthIndian} />
                <ResCategoryChart accomplishments={this.state.Accomplishments} beverages={this.state.Beverages} maincourse={this.state.MainCourse} snacks={this.state.Snacks} starters={this.state.Starters}

                />
            </div>
        )
    }
}
