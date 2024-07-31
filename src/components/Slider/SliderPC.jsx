import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import style from './Slider.module.scss'

export default function SliderPC({currentRef}) {
  const navigate = useNavigate()

  const language = useSelector(({chooseItemsReducer: { language }}) => language)

  const [width, setWidth] = useState(false)

  const [calc, setCalc] = useState(0)
  const [margin, setMargin] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  useEffect(() => {
      setWidth(currentRef.current ? currentRef.current.offsetWidth : 0)
  }, [currentRef.current])

  useEffect(() => {
    if (touchStart === null){
    if(calc === 0){
      setTimeout(() => {
        setCalc(calc +1)
      }, 2500) 
      setMargin(0)
    }
    if(calc === 1){
      
      setTimeout(() => {
        setCalc(calc +1)
      }, 2500) 
      setMargin('-100%')
    }
    if(calc === 2){
      setTimeout(() => {
        setCalc(0)
      }, 2500)
      setMargin('-200%')
    }

  }
  }, [calc])
  
  return (
    <div className={style.wrapSlider} style={{width: width}}
        onClick={() => navigate('/cart')}
      >
      <div style={{display: 'flex', marginLeft: margin, transition: 'all 1s ease'}}> 
        {
          language === 'tr'
          ? <>
              <img src={require('./images/PC/1.tr.png')} style={{ width: width, height: '100%'}} alt=""/>
              <img src={require('./images/PC/2.tr.png')} style={{ width: width, height: '100%'}} alt=""/>
              <img src={require('./images/PC/3.tr.png')} style={{ width: width, height: '100%'}} alt=""/>
            </>
          : language === 'ru' 
          ? <>
              <img src={require('./images/PC/1.ru.png')} style={{ width: width, height: '100%'}} alt=""/>
              <img src={require('./images/PC/2.ru.png')} style={{ width: width, height: '100%'}} alt=""/>
              <img src={require('./images/PC/3.ru.png')} style={{ width: width, height: '100%'}} alt=""/>
            </>
          : <>
              <img src={require('./images/PC/1.en.png')} style={{ width: width, height: '100%'}} alt=""/>
              <img src={require('./images/PC/2.en.png')} style={{ width: width, height: '100%'}} alt=""/>
              <img src={require('./images/PC/3.en.png')} style={{ width: width, height: '100%'}} alt=""/>
            </>
        }
        
      </div>
    </div> 
  )
}
