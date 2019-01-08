import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Left from "../../../icons/icons/left.png"
import Nav from "../../Nav/Nav.jsx"
import './FilterPlans.css'


export default class FilterPlans extends Component {

    constructor(props) {
        super(props)

        this.state = {
            date: new Date(),
            classNameButton: "add-filters-button button-visibility-hidden",
            redirect: false
        }

        this.filters = {
            days: [],
            time: []
        }

       
    }


    

    showButton = () => {
        this.setState({...this.state,classNameButton: "add-filters-button button-visibility-visible"})
    }

    buttonClicked = () => {
        console.log(this.filters.days, this.filters.time)
        this.setState({...this.state,redirect:true})
    }

    numberClicked = (e,day) => {
        
        if( this.filters.days.includes(day)){
           let index = this.filters.days.indexOf(day);
            this.filters.days.splice(index,1)
            e.target.className = "number no-selected";
        }else{
            this.filters.days.push(day);
            e.target.className = "number day-selected";
        }
       
        this.showButton()
    }

    comproveTimeToggle = (e,filter) => {
        if(filter === 'h-menor' && this.filters.time.includes('h-mayor')){
            let index  = this.filters.time.indexOf('h-mayor');
            this.filters.time.splice(index,1)
            e.target.parentNode.childNodes[3].className = "no-p-selected"
        }else if(filter === 'h-mayor' && this.filters.time.includes('h-menor')){
            let index  = this.filters.time.indexOf('h-menor');
            this.filters.time.splice(index,1)
            e.target.parentNode.childNodes[2].className = "no-p-selected"
        }else if(filter === 'assistance-asc' && this.filters.time.includes('assistance-desc')){
            let index  = this.filters.time.indexOf('assistance-desc');
            this.filters.time.splice(index,1)
            e.target.parentNode.childNodes[5].className = "no-p-selected"
        }else if(filter === 'assistance-desc' && this.filters.time.includes('assistance-asc')){
            let index  = this.filters.time.indexOf('assistance-asc');
            this.filters.time.splice(index,1)
            e.target.parentNode.childNodes[4].className = "no-p-selected"
        }
    }

    timeClicked = (e,filter) => {
        console.log("antes de nada", this.filters.time)
        if(this.filters.time.includes(filter)){
            let index = this.filters.time.indexOf(filter);
            this.filters.time.splice(index,1)
            e.target.className = "no-p-selected"
        }else{
           
            e.target.className = "p-selected"
            this.filters.time.push(filter)
            this.comproveTimeToggle(e,filter);
        }

        console.log("cuando salgo", this.filters.time)
        this.showButton()
    }

    transformDate = (currentDay, valueDay) => {
        let newDay = 0;
        let day = new Date(2019, this.state.date.getMonth(), 0);
        console.log('tranform '+currentDay,valueDay,day)
        if (currentDay - valueDay <= 0) {
            let res = - (currentDay - valueDay)
            newDay = day.getDate() - res;

        } else if (currentDay - valueDay >= day) {

        }else{
            newDay = currentDay-valueDay;
        }
        
        return newDay;
    }


    printCalendar = () => {
        let monday = 0;
        let currentDay = this.state.date.getDay();
        let arrayDays = []
        let lastDay = new Date(2019, this.state.date.getMonth() + 1, 0).getDate();
        let arrayNameDay = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
        let auxCurrentDay = currentDay;

        console.log(currentDay)

        switch (currentDay) {
            case 0:
                monday = this.transformDate(this.state.date.getDate(), 6)
                break;
            case 1:
                monday = this.state.date.getDate();
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

        console.log(this.state.date.getDay())

        return (
            <React.Fragment>
                <div className="calendarTitle">
                    <p>Seleccionar días en concreto</p>
                </div>
                <div className="calendar">

                    {arrayDays.map((day, index) => {
                        return (
                            <div className="days">
                                {index === ((this.state.date.getDay() + 6) !== 6 ? (this.state.date.getDay() + 6) % 6 : (this.state.date.getDay() + 6))
                                    ?
                                    <React.Fragment>
                                        <p className="name current-day">{arrayNameDay[index]}</p>
                                        <div className="oval">
                                            <p className="number current-day"  onClick={e => this.numberClicked(e,day)}>{day}</p>
                                        </div>
                                    </React.Fragment>

                                    :
                                    <React.Fragment>
                                        <p className="name no-selected">{arrayNameDay[index]}</p>
                                        <div className="oval">
                                            <p className="number no-selected"  onClick={e => this.numberClicked(e,day)}>{day}</p>
                                        </div>
                                    </React.Fragment>
                                }

                            </div>
                        )
                    })}
                </div>
                <div className="filterList">
                    <h3>Ordenar por</h3>
                    <p className="no-p-selected" onClick={e=>this.timeClicked(e,'M-assistance')}>Mayor asisentcia de mis conexiones</p>
                    <p className="no-p-selected" onClick={e=>this.timeClicked(e,'h-menor')}>Hora - de más pronto a más tarde</p>
                    <p className="no-p-selected" onClick={e=>this.timeClicked(e,'h-mayor')}>Hora - de mas tarde a más pronto</p>
                    <p className="no-p-selected" onClick={e=>this.timeClicked(e,'assistance-asc')}>Número de asistentes - Ascendente</p>
                    <p className="no-p-selected" onClick={e=>this.timeClicked(e,'assistance-desc')}>Número de asistentes - Descendente</p>
                </div>

                <div className="button-div">
                    <button className={this.state.classNameButton} onClick = {e=>this.buttonClicked(e)}>Aplicar filtros</button>
                </div>
            </React.Fragment>

        )
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={{
                pathname: '/plans',
                filters: { 
                    days: this.filters.days,
                    time: this.filters.time
                }
            }} />
        }else{
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
}
