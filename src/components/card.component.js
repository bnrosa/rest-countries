import React from 'react';
import styled from 'styled-components';
import {Link}  from 'react-router-dom';
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';

const Container = styled.div`
    margin: 2rem 0.5rem;
    max-width: 400px;
    max-height: 600px;
    border-radius: 10px;
    background: ${props => props.isDark ? '#2B3945' : '#fff'};
    color: ${props => props.isDark ? '#fff' : '#202C37'};
`;

const Title = styled.h2`
    color: ${props => props.isDark ? '#fff' : '#202C37'};
    font-weight: bold;
    font-size: 2rem;
    &:hover {
        color: #666;
    }
`;

const MyStrong = styled.strong`
    color: ${props => props.isDark ? '#fff' : '#202C37'};
    font-weight: 800
`;

export default function Card(props){

    let isDarkMode = useSelector(state => state.isDark);

    return(
        <div className="column is-one-quarter">
            <Container isDark={isDarkMode} className="card">
                <div className="card-image">
                    
                        <LazyLoad height={140} once>
                        <figure className="image is-4by3">
                        <img src={props.flag} alt={`${props.countryName} Flag`} style={{"borderRadius": "10px 10px 0 0"}}/>
                        </figure>
                        </LazyLoad>
                    
                </div>
                <div className="card-content">
                    <div className="content">
                        <Link to={'/'+props.code.toLowerCase()}>
                            <Title isDark={isDarkMode}>
                                {props.countryName}
                            </Title>
                        </Link> 
                        <p><MyStrong isDark={isDarkMode}>Population: </MyStrong> {props.population} </p>
                        <p><MyStrong isDark={isDarkMode}>Region:   </MyStrong> {props.region}</p>
                        <p><MyStrong isDark={isDarkMode}>Capital:  </MyStrong> {props.capital} </p>
                    </div>
                </div>
            </Container>
        </div> 
    );
}