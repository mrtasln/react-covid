import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Table} from "react-bootstrap";
import {PieChart, Pie, Tooltip, Cell} from 'recharts';
import {Worldwide} from "../types/worldwide";
import axios, {AxiosResponse} from "axios";
import {Country} from "../types/country";
import NumberFormat from "react-number-format";
import {useSelector} from "react-redux";
import {AppState} from "../store";
import {useTranslation} from "react-i18next";

interface ChartData {
    name:string,
    value: number
}

function TotalInfo() {

    const { t } = useTranslation();
    const {selectedCountry} = useSelector((state:AppState) => state.country);
    const [worldwide, setWorldwide] = useState<Worldwide>();
    const [data, setData] = useState<ChartData[]>([]);
    const getWorldwideData = async () => {

        let param = "";
        if(selectedCountry !== "all") {

            param = "countries/"
        }
        const {data}: AxiosResponse<Worldwide> = await axios.get<Worldwide>("https://disease.sh/v3/covid-19/" + param + selectedCountry);
        setWorldwide(data);
        let chartData = buildChartData(data);
        setData(chartData);
    };

    const buildChartData = (data: Worldwide) => {

      let chartData = [];
      chartData.push({name : "Aktif", value: data.active});
      chartData.push({name : "Ölüm", value: data.deaths});
      chartData.push({name : "İyileşen", value: data.recovered});

      return chartData;
    };

    useEffect(() => {

        console.log(selectedCountry)
        getWorldwideData();
    }, [selectedCountry]);


    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        console.log(percent)
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${Math.floor(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const COLORS = ['#0d6efd', '#d8343f', '#ffc62a'];
    return (
        <div >
            <Card className="mt-4">
                <Card.Body>
                    <Row>
                        <Col>
                            <div  >
                                <div>
                                    <Row>
                                        <Col>
                                            <label>
                                                <i className="fa fa-circle text-warning" /> <span>{t('recovered')} : </span>
                                                <NumberFormat value={worldwide?.recovered} thousandSeparator={true} displayType={'text'}  />
                                            </label>
                                        </Col>
                                        <Col>
                                            <label>
                                                <i className="fa fa-circle text-primary" /> <span>{t('active')} : </span>
                                                <NumberFormat value={worldwide?.active} thousandSeparator={true} displayType={'text'}  />
                                            </label>
                                        </Col>
                                        <Col>
                                            <label> <i className="fa fa-circle text-danger" /> <span>{t('deaths')} : </span>
                                                <NumberFormat value={worldwide?.deaths} thousandSeparator={true} displayType={'text'}  />
                                            </label>
                                        </Col>
                                    </Row>
                                </div>
                                <PieChart width={400} height={330}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={true}
                                        data={data}
                                        outerRadius={150}
                                        fill="#8884d8"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        // label
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </div>
                        </Col>

                    </Row>


                </Card.Body>
            </Card>
        </div>
    );
}

export default TotalInfo;