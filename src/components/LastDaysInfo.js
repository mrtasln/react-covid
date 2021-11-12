import React, {useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import axios from "axios";
import {useSelector} from "react-redux";

function LastDaysInfo() {

    const {selectedCountry} = useSelector((state) => state.country);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        const response = axios.get("https://disease.sh/v3/covid-19/historical/"+ selectedCountry +"?lastdays=30").then(result => {

            try {
                var cases = [];
                var deaths = [];
                if(selectedCountry === "all") {

                    cases = result.data.cases;
                    deaths = result.data.deaths;
                } else {

                    cases = result.data.timeline.cases;
                    deaths = result.data.timeline.deaths;
                }

                var data = [];
                let yesterdayIndex;
                for(var name in cases) {

                    let vaka = 0, death = 0;
                    if(yesterdayIndex === undefined) {

                        yesterdayIndex = name;
                    }
                    vaka = cases[name] - cases[yesterdayIndex];
                    death = deaths[name] - deaths[yesterdayIndex];
                    data.push({name: name, vaka: vaka, death: death});

                    yesterdayIndex = name;
                }

                setChartData(data);
            } catch (e) {

            }

        });

    }, [selectedCountry]);


    return (
        <div className="mt-4">
            <Card >
                <Card.Body>
                    <h4 className="mb-4">{selectedCountry} - son 30 Gün</h4>

                    <div style={{height: "280px"}}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={chartData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="vaka" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="death" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
}
export  default LastDaysInfo;
