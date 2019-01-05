import React, { Component } from 'react'
import Left from "../../../icons/icons/left.png"
import Nav from "../../Nav/Nav.jsx"
import './FilterPlans.css'

export default class FilterPlans extends Component {

    constructor(props) {
        super(props)

        this.state = {
            date: new Date(),
            classNumber: 'number no-selected',
            className: 'name no-selected'
        }
    }


    numberClicked = () =>{
        
    }

    transformDate = (currentDay, valueDay) => {
        let newDay = 0;
        let day = new Date(2019, this.state.date.getMonth(), 0);
        if (currentDay - valueDay <= 0) {
            let res = - (currentDay - valueDay)
            newDay = day.getDate() - res;
            console.log(newDay)

        } else if (currentDay - valueDay >= day) {

        }

        return newDay;
    }


    printCalendar = () => {
        let monday = 0;
        let currentDay = this.state.date.getDay();
        let arrayDays = []
        let lastDay = new Date(2019, this.state.date.getMonth() + 1, 0).getDate();
        let arrayNameDay = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];


        switch (currentDay) {
            case 0:
                monday = this.transformDate(this.state.date.getDate(), 6)
                break;
            case 1:
                monday = currentDay;
                break;
            case 2:
                monday = this.transformDate(this.state.date.getDate(), 1)
                break;
            case 3:
                monday = this.transformDate(this.state.date.getDate(), 2)
                break;
            case 4:
                monday = this.transformDate(this.state.date.getDate(), 3)
                break;
            case 5:
                monday = this.transformDate(this.state.date.getDate(), 4)
                break;
            case 6:
                monday = this.transformDate(this.state.date.getDate(), 5)
                break;
            default:
                monday = currentDay;
                break;
        }

        currentDay = 0;
        while (currentDay <= 6) {
            if (monday === lastDay) {
                arrayDays.push(monday);
                monday = 1;
                currentDay++;
            } else {
                arrayDays.push(monday);
                currentDay++;
                monday++;
            }
        }


        return (
            <div className="calendar">

                {arrayDays.map((day, index) => {
                    return (
                        <div className="days">
                            <p className={this.state.className}>{arrayNameDay[index]}</p>
                            <div className="oval">
                                <p className={this.state.classNumber} onClick={this.numberClicked}>{day}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Nav
                    title={"Filtrar resultados"}
                    iconleft={Left}
                    widthL={"9px"}
                    heigthL={"15px"}
                />

                <div>
                    {this.printCalendar()}
                </div>
            </React.Fragment>
        )
    }
}
