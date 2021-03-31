import React,{useState, useEffect} from 'react'
import './App.css'
import {Card, Row,Col} from 'react-bootstrap'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const App = () => {

    const [query, setQuery] = useState('chennai')
    const [value, setValue] = useState('')
    const [weather, setWeather] = useState({    
        description: String,  
        main: {
            temp: Number,
            temp_max: Number,
            temp_min: Number
        },
        city : String,
        wind: {
            speed : Number,
            dir: Number
        },
        sun: {
            rise: Number,
            set : Number
        },
        humidity: Number,
        pressure: Number
    })

    useEffect(()=> {
        getWeather();
    },[query])

    const handleChange = e => {
        setValue(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        setQuery(value);
    }

    const getWeather = async () => {
        const {data}= await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=d4322d02d43674a2ba6921210b9c9e3a`)
        setWeather({
            description : data.weather[0].description,
            main: {
                temp: data.main.temp,
                temp_min : data.main.temp_min,
                temp_max: data.main.temp_max
            },
            name: data.name,
            wind:{
                speed: data.wind.speed,
                dir: data.wind.dir
            },
            sun:{
                rise: data.sys.sunrise,
                set: data.sys.sunset
            },
            pressure: data.main.pressure,
            humidity: data.main.humidity
        })

    }

    return (
        <div id="App">
            <div>
                <form className="input-field" onSubmit={handleSubmit} >
                    <input onChange={handleChange} type='text' value={value} className="input"></input>
                    <button type="submit"><i class="fas fa-search"></i></button>
                </form>
            </div>
            <Card className="card center">
                <Card.Body>
                    <div>
                        <Row className="section-1">
                            <Col className="temp-num" >{weather.main.temp} °C</Col>
                        </Row>
                        <Row className="section-2"><h2>{weather.description}</h2></Row>
                        <Row className="section-3"><p><i class="fas fa-map-marker-alt"></i> {weather.name}</p></Row>
                        <Row className="section-4">
                            <Col><h6><i class="fas fa-wind"></i> {weather.wind.speed} m/s</h6></Col> 
                            <Col><h6><i class="fas fa-tint"></i>  {weather.humidity} %</h6></Col>
                        </Row>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default App
