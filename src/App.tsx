import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import {Col, Container, Row} from "react-bootstrap";
import Countries from "./components/Countries";
import TotalInfo from "./components/TotalInfo";
import LastDaysInfo from "./components/LastDaysInfo";
import "leaflet/dist/leaflet.css";
import WorldMap from "./components/WorldMap";


function App() {
  return (

      <Container fluid className="px-container">
        <Header/>
        <Row className="content">
          <Col sm={4}>
              <Countries/>
              <TotalInfo/>
          </Col>
          <Col sm={8}>
              <WorldMap/>
              <LastDaysInfo/>
          </Col>
        </Row>
      </Container>
  );
}

export default App;
