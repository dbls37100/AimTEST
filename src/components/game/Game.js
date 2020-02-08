import React, { useState, useEffect } from 'react';
import './Game.css';
import cible from '../img/cible.png';
import UIfx from 'uifx';
import shootmp3 from "../sound/shoot.mp3"

const Counter = () => {

    const [ count, setCount ] = useState(0);
    const [ seconds, setSeconds ] = useState(30);
    const [ isActive, setIsActive ] = useState(false);
    const [ testactive, settestactive ] = useState(false);
    const [ testactive2, settestactive2 ] = useState(false);
    const [ cibleactive, setcibleactive ] = useState(false);
    const [ cibleactive2, setcibleactive2 ] = useState(false);
    const [ cibleactive3, setcibleactive3 ] = useState(false);

    const shoot = new UIfx(
        shootmp3,
        {
          volume: 0.4, // number between 0.0 ~ 1.0
          throttleMs: 100
        }
      )



    const setClass = () => {
        settestactive(!testactive);
    }

    const setClass2 = () => {
        settestactive2(!testactive2);
    }
    
    const setClass3 = () => {
        setcibleactive(!cibleactive);
    }
 
    const setClass4 = () => {
        setcibleactive2(!cibleactive2);
    }

    const setClass5 = () => {
        setcibleactive3(!cibleactive3);
    }

    const changeClass = () => {
      countClick();
      setClass();
   }

    const changeClass2 = () => {
    countClick();
    setClass2();
    }


    const changeClassCible1 = () => {
        countClick();
        setClass3();
    }

    const changeClassCible2 = () => {
        countClick();
        setClass4();
    }
    
    const changeClassCible3 = () => {
        countClick();
        setClass5();
        shoot.setVolume(0.8).play();
    }

    const countClick = () => {
        if (isActive) {
        setCount(count + 1);
        window.navigator.vibrate(200);
        shoot.setVolume(0.25).play()
        } else {
        setCount(count);
        window.navigator.vibrate(200);
        }
    }

    
    function toggle() {
        setIsActive(!isActive);
        window.navigator.vibrate(200);
        shoot.setVolume(0.25).play()
    }

    
    function reset() {
        setSeconds(30);
        setIsActive(false);
        setCount(0);
        shoot.setVolume(0.25).play()
    }


    useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
          }, 1000);
        } else if (!isActive && seconds !== 0) {
          clearInterval(interval);
        } if (seconds === 0) {
            clearInterval(interval);
            setSeconds(30);
            setIsActive(false);
        }
        return () => clearInterval(interval);
      }, [isActive, seconds]);


    return(
        <div className="Controle-size">
            <div className="style-Menu">
                <h1>{seconds}</h1>
                <h1>score : {count}</h1>
                <div className="structure-style">
                    <h2 onClick={reset}>Reset</h2>
                    <h2 onClick={toggle}>
                        {isActive ? 'Pause' : 'Start'}
                    </h2>
                </div>
            </div>
            <div className={!isActive ? 'displayGame' : ''}>
                <div>
                    <div onClick={changeClass} className={!testactive ? 'kill-zone1' : 'kill-zone1-1'}><img className="sizeTarget" src={cible} alt="cible" /></div>
                </div>
                <div>
                    <div onClick={changeClass2} className={!testactive2 ? 'kill-zone4' : 'kill-zone4-1'}> <img className="sizeTarget" src={cible} alt="cible" /></div>
                </div>
                <div className="cible-gestion">
                    <img onClick={changeClassCible1} src={cible} className={!cibleactive ? 'Displaying-target2' : 'Displaying-target'} alt="cible" />
                    <img onClick={changeClassCible2} src={cible} className={!cibleactive2 ? 'Displaying-target targetMobile' : 'Displaying-target2 targetMobile'} alt="cible" />
                    <img onClick={changeClassCible3} src={cible} className={!cibleactive3 ? 'Displaying-target2 targetMobile' : 'Displaying-target targetMobile'} alt="cible" />
                </div>
            </div>
        </div>
    )
}

export default Counter;