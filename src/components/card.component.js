import React from 'react';
import styled from 'styled-components';
import {Link}  from 'react-router-dom';

const Container = styled.div`
    margin: 2rem 0.5rem;
    max-width: 400px;
    max-height: 600px;
    border-radius: 10px;
`;

const Title = styled.h2`
    color: #222;
    font-weight: bold;
    font-size: 2rem;
    &:hover {
        color: #666;
    }
`;

export default function Card(props){
    return(
        <div className="column is-one-quarter">
            <Container className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={props.flag} alt="Flag" style={{"borderRadius": "10px 10px 0 0"}}/>
                    </figure>
                </div>
                <div className="card-content">
                    <div className="content">
                        <Link to={'/'+props.code.toLowerCase()}>
                            <Title>
                                {props.countryName}
                            </Title>
                        </Link> 
                        <p><strong>Population: </strong> {props.population} </p>
                        <p><strong>Region:   </strong> {props.region}</p>
                        <p><strong>Capital:  </strong> {props.capital} </p>
                    </div>
                </div>
            </Container>
        </div> 
    );
}