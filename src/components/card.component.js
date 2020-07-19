import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 2rem 0.5rem;
    max-width: 300px;
    max-height: 600px;
`;

export default function Card(props){
    return(
        <div className="column is-one-quarter">
            <Container className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={props.flag} alt="Flag"/>
                    </figure>
                </div>
                <div className="card-content">
                    <div className="content">
                        <h3 className="title is-3"> {props.countryName} </h3>
                        <p><strong>Population: </strong> {props.population} </p>
                        <p><strong>Region:   </strong> {props.region}</p>
                        <p><strong>Capital:  </strong> {props.capital} </p>
                    </div>
                </div>
            </Container>
        </div>
       
    );
}