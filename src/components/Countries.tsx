import React, {useEffect, useState} from 'react';
import {Card, Col, ListGroup, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Country} from "../types/country";
import axios, {AxiosResponse} from "axios";
import NumberFormat from 'react-number-format';
import {Worldwide} from "../types/worldwide";
import {changeActiveCountry, selectCountry, setWorldWideInfo} from "../store/actions/countryAction";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../store";
import {selectActiveCovidState} from "../store/actions/covidStateAction";
import ApiService from "../services/apiService";

function Countries() {

    const {activeState} = useSelector((state:AppState) => state.covidState);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [countries, setCountries] = useState<Country[]>([]);
    const [worldWide, setWorldwide] = useState<Worldwide>();

    const getWorldwide = async () => {
        const {data}: AxiosResponse<Worldwide> = await axios.get<Worldwide>("https://disease.sh/v3/covid-19/all");
        setWorldwide(data);
        dispatch(setWorldWideInfo(data))
    };

    useEffect(() => {

        let apiService = new ApiService();
        apiService.getAllCountries(activeState).then(value => {
             setCountries(value);
         }).catch(err => console.log(err));

        getWorldwide();
    }, [activeState]);


    function handleOnClick(country:Country) {
        dispatch(selectCountry(country !== undefined && country ? country.countryInfo.iso2 : "all"));
        dispatch(changeActiveCountry(country));
    }

    function handleCovidStateClick(state: string) {
        dispatch(selectActiveCovidState(state));
    }

    return (
        <div>
            <Row className="mb-2">

                <Col onClick={ () => handleCovidStateClick("cases")} className="d-flex align-items-stretch covid-state">
                    <Card className={activeState === "cases" ? "active-state w-100" : "w-100"}>
                        <Card.Body>{t('total')}</Card.Body>
                    </Card>
                </Col>
                <Col onClick={ () => handleCovidStateClick("active")} className="d-flex align-items-stretch covid-state">
                    <Card className={activeState === "active" ? "active-state w-100" : "w-100"}>
                        <Card.Body>{t('active')}</Card.Body>
                    </Card>
                </Col>
                <Col onClick={ () => handleCovidStateClick("deaths")} className="d-flex align-items-stretch covid-state">
                    <Card className={activeState === "deaths" ? "active-state w-100" : "w-100"}>
                        <Card.Body>{t('deaths')}</Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card style={{height: "530px"}}>
                {/*<Card.Header className="bg-white p-3"><h3> {t('countries')} </h3> </Card.Header>*/}
                <ListGroup.Item variant="primary" style={{cursor: "pointer"}}  onClick={() => handleOnClick({} as Country)} className="border-0 fw-bold d-flex justify-content-between align-items-start ">
                    <div>Dünya Geneli</div>
                    <span ><NumberFormat value={worldWide?.cases} thousandSeparator={true} displayType={'text'}  /></span>
                </ListGroup.Item>
                <ListGroup style={{cursor: "pointer"}} variant="flush" className="country-list">

                    {countries.map((country, index) => {

                        let className = "d-flex justify-content-between align-items-start ";
                        if(index %2 === 0) {
                            className += "list-group-item-secondary";
                        }

                        let data= country.cases;
                        if(activeState === "active") {

                            data = country.active;
                        } else if (activeState === "deaths") {

                            data = country.deaths;
                        }

                        return <ListGroup.Item key={country.country} onClick={() => handleOnClick(country)} className={className}>

                            <div >
                                <img src={country.countryInfo.flag} height={15} alt={country.countryInfo.iso2} />
                                <span style={{marginLeft: "5px"}}>{country.country}</span>
                            </div>
                           <span className="fw-bold"> <NumberFormat value={data} thousandSeparator={true} displayType={'text'}  /></span>
                        </ListGroup.Item>;
                    })}
                </ListGroup>
            </Card>

        </div>
    );
}

export default Countries;