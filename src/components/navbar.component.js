import React from 'react';
import styled from 'styled-components';
import {FiMoon } from 'react-icons/fi';
import {Link}  from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const HeaderWrapper = styled.nav`
    width: 100%;
    white-space: nowrap;
    padding: 20px;
    box-shadow: 0 2px 1px 0 rgba(0,0,0,0.05), 0 2px 1px -4px rgba(0,0,0,1), 0 1px 3px 0 rgba(0,0,0,0.05);
    display: flex;
    background: ${props => props.isDark ? '#202C37' : '#fff'};
    color: ${props => props.isDark ? '#fff' : '#202C37'};
`;

const Heading = styled.span`
    color: ${props => props.isDark ? '#fff' : '#202C37'};
    font-size: 1rem;
    font-weight: bold;
`;

const DarkMode = styled.span`
    margin: 3px 6px;
`;

const DarkModeBtn = styled.button`
    border: none;
    padding: 0.2rem;
    background: ${props => props.isDark ? '#202C37' : '#fff'};
    color: ${props => props.isDark ? '#fff' : '#202C37'};
    font-size: 1rem;
    cursor: pointer;
    &:focus {
        outline: none;
        box-shadow: none;
    }
`;

const NavEnd = styled.div`
    justify-content: flex-end;
    margin-left: auto;
    align-items: stretch;
`;

export default function Navbar(){

    let isDarkMode = useSelector(state => state.isDark);
    const dispatch = useDispatch();

    const toggleDarkMode = () => {
        dispatch({type: 'TOGGLE' });
    }

    return(
        <HeaderWrapper isDark={isDarkMode} className="navbar" role="navigation" aria-label="main navigation">
                <div>
                    <Link to="/" ><Heading isDark={isDarkMode}>Where in the world? </Heading></Link>
                </div>
                <NavEnd>
                    <DarkModeBtn isDark={isDarkMode} type="button" onClick={toggleDarkMode}>
                        <FiMoon/> <DarkMode/> Dark Mode
                    </DarkModeBtn>
                </NavEnd>
        </HeaderWrapper>
        
    );
}

