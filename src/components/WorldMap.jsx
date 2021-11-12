import React, {useEffect, useState} from 'react';
import {Circle, MapContainer, Popup, TileLayer} from "react-leaflet";
import "../Map.css";
import axios from "axios";
import NumberFormat from "react-number-format";
import {useSelector} from "react-redux";


function WorldMap() {

    const {selectedCountry} = useSelector(state => state.country);
    const {activeCountry} = useSelector(state => state.country);
    const [countries, setCountries] = useState([]);
    const [position, setPosition] = useState([39.925533, 32.866287]); // Ankara
    const [zoom, setZoom] = useState(2);
    const [map, setMap] = useState(null);

    const getCountries = async () => {

        const {data} = await axios.get("https://disease.sh/v3/covid-19/countries");
        data.sort(function (c1, c2) {return c2.cases - c1.cases});
        setCountries(data);
    };

    useEffect(() => {

        getCountries();
    }, []);

    useEffect(() => {

        setPosition(selectedCountry !== "all" ? [activeCountry.countryInfo.lat, activeCountry.countryInfo.long] : [39.925533, 32.866287]);
        setZoom(selectedCountry !== "all" ? 5 : 2);
    }, [activeCountry]);

    if (map) {
        map.setZoom(zoom);
        map.flyTo(position);
    }



    return (
            <MapContainer  whenCreated={setMap} center={position} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {countries.map((country, index) => {

                    let percentage = (country.active / 18010074) * 5000000;
                    let color = "red";
                    return <Circle key={country.country} center={[country.countryInfo.lat, country.countryInfo.long]} color={color} weight={2} fillColor={color} radius={ percentage}>
                        <Popup>
                            <div className="info-container">
                                <div
                                    className="info-flag"
                                    style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                                />
                                <div className="info-name">{country.country}</div>
                                <div className="info-confirmed">
                                    Cases:  <NumberFormat value={country.cases} thousandSeparator={true} displayType={'text'}  />
                                </div>
                                <div className="info-recovered">
                                    Recovered: <NumberFormat value={country.recovered} thousandSeparator={true} displayType={'text'}  />
                                </div>
                                <div className="info-deaths">
                                    Deaths: <NumberFormat value={country.deaths} thousandSeparator={true} displayType={'text'}  />
                                </div>
                            </div>
                        </Popup>

                    </Circle>

                })}

            </MapContainer>
    );
}



export default WorldMap;
