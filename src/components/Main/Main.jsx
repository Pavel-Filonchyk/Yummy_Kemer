import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import _ from 'lodash'
import uuid from 'react-uuid'

import { auth } from '../../firebase.config'
import Header from '../Header/Header'
import SliderMobile from '../Slider/SliderMobile'
import SliderPC from '../Slider/SliderPC'
import Footer from '../Footer/Footer'
import { postMenu, getMenu } from '../../core/actions/restMenuActions'
import { postDishes } from '../../core/actions/restDishesActions'
import { chooseDishes } from '../../core/actions/chooseItemsActions'

import style from './Main.module.scss'

export default function Main() {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const menu = useSelector(({restMenuReducer: { menu }}) => menu)
  const language = useSelector(({chooseItemsReducer: { language }}) => language)
  
  const [user, setUser] = useState(null)

  const [mobile, setMobile] = useState(false)
  const [nameDish, setNameDish] = useState('nameDishTr')
  
  useLayoutEffect(() => {
    const userAgent = navigator.userAgent
    const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent)
    setMobile(isMobile)
  }, [])

  useEffect(() => {
    dispatch(getMenu())
  }, [])
  useEffect(() => {
    signInWithEmailAndPassword(auth, 'p_filonchyk@mail.ru', '')
    .then(data => setUser(data))
    .catch(data => console.log(data))
  }, [])
  
  useEffect(() => {
    if (language === 'ru'){
      setNameDish('nameDishRu')
    }
    if (language === 'en'){
      setNameDish('nameDishEn')
    }
    if (language === 'tr'){
      setNameDish('nameDishTr')
    }
  }, [language])

  const onDishes = (id) => {
    dispatch(chooseDishes(id))
    setTimeout(() => {
      navigate('/dishes')
    }, 100) 
  }

  const onPostMenu = () => {
    dispatch(postMenu(
      {
        nameDishRu: 'Напитки',
        nameDishEn: 'Drinks',
        nameDishTr: 'İçecekler',
        dishes: [''],
        image: 'https://i.ibb.co/59PQ0sD/image.jpg'
      }
    ))
  
  }

  const onPutMenu = () => {

    dispatch(postDishes(
      {
        nameDishRu: 'Напитки',
        dishes: 
          { 
            nameRu: 'Ледяной шэйк',
            discriptionsRu: '',

            nameEn: 'Ice shake',
            discriptionsEn: '',

            nameTr: 'Ice shake',
            discriptionsTr: '',

            cost: 180,
            amount: 1,
            id: uuid(),
            image: ''
          },
        token: user?.user.accessToken
      }
    ))
  } 

  return (
    <div className={style.mainContainer} ref={ref}>
      <Header/>
      {
        mobile ? <SliderMobile currentRef={ref}/> :  <SliderPC currentRef={ref}/>
      }
      <span className={style.title}>
        {
            language === 'ru' ? 'Меню' 
            : language === 'en' ? 'Menu' 
            : language === 'tr' ? 'Menü': ''
        }
      </span>
      <div className={style.wrapMenu} >
        {
          _.filter(menu, elem => elem[nameDish]).map((item, index) => {
            return (
              <div className={style.wrapDish}
                key={item.blockId}
                onClick={() => onDishes(item.blockId)}
              >
                <img src={item.image} className={style.menu} alt=""/>
                <div className={style.wrapNameDish}>
                  <span className={style.nameDish}>{item[nameDish]}</span>
                </div>
              </div>
            )
          })
        }
      </div>
      <Footer/>
      
      {/* <div style={{width: 200, height: 80, backgroundColor: 'gray'}}
        onClick={onPostMenu}
      /> */}
      {/* <div style={{width: 200, height: 80, backgroundColor: 'orange'}}
        onClick={onPutMenu}
      /> */}
    </div>
  )
}
