import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ModalWrapper from '../../wrappers/ModalWrapper/ModalWrapper'
import { HomeOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { getMenu } from '../../core/actions/restMenuActions'
import { card } from '../../core/actions/buyProductActions'


import style from './Dishes.module.scss'

export default function Dishes() {
  const dispatch = useDispatch()

  const menu = useSelector(({restMenuReducer: { menu }}) => menu)
  const dishId = useSelector(({chooseItemsReducer: { dishId }}) => dishId)
  const language = useSelector(({chooseItemsReducer: { language }}) => language)

  const findDish = menu?.find(item => item.blockId === dishId)

  const [nameDish, setNameDish] = useState('nameDishTr')
  const [name, setName] = useState('nameTr')
  const [discriptions, setDiscriptions] = useState('discriptionsTr')
  const [showModal, setShowModal] = useState(false)

  const showSideBar = useSelector(({chooseItemsReducer: { moveSideBar }}) => moveSideBar)

  useEffect(() => {
    dispatch(getMenu())
  }, [])

  useEffect(() => {
    if (language === 'ru'){
      setNameDish('nameDishRu')
      setName('nameRu')
      setDiscriptions('discriptionsRu')
    }
    if (language === 'en'){
      setNameDish('nameDishEn')
      setName('nameEn')
      setDiscriptions('discriptionsEn')
    }
    if (language === 'tr'){
      setNameDish('nameDishTr')
      setName('nameTr')
      setDiscriptions('discriptionsTr')
    }
  }, [language])

  const onAddToCart = (cardBlock) => {
    dispatch(card(cardBlock))
    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
    }, 800)
  }

  return (
    <div className={style.wrapDishes}>
      <Header/>
      <div className={style.wrapMainPageLink}>
        <Link className={style.link} to="/">
          <HomeOutlined className={style.homePic}/>
          <span className={style.textPage}>Menu</span>
        </Link>
      </div>
      <span className={style.mainTitle}>{findDish?.[nameDish]}</span>
      <div className={style.blockDishes}>
        {
          findDish?.dishes?.filter(item => item !== null).map(item => {return(
            <div className={style.dishes} key={item.id}>
              <img src={item.image} className={style.picDishes} alt=""/>
              <div className={style.wrapDiscriptions}>
                <span className={style.title}>{item[name]}</span>
                <span className={style.discriptions}>{item[discriptions]}</span>
              </div>
              <div className={style.wrapBuy}>
                <span className={style.cost}>{item.amount} {
                    language === 'ru' ? 'порция' 
                    : language === 'en' ? 'portion' 
                    : language === 'tr' ? 'porsiyon': ''
                  } -  </span>
                <span className={style.cost}>{item.cost} tl</span>
              </div>
              <div className={style.wrapBtn}
                onClick={() => onAddToCart({
                  name: item[name],
                  discriptions: item[discriptions],
                  amount: item.amount,
                  cost: item.cost,
                  image: item.image,
                  id: item.id,
                  blockId: dishId
                })}
              >
                <div className={style.btn}>
                  <span>
                    {
                      language === 'ru' ? 'Добавить в корзину' 
                      : language === 'en' ? 'Add to cart' 
                      : language === 'tr' ? 'Sepete ekle': ''
                    }
                  </span>
                </div>
              </div>
            </div>
          )})
        }
      </div>
      <ModalWrapper showModal={showModal}>
        <div className={style.wrapAddedCart}>
          <span>
            {
              language === 'ru' ? 'Добавлено в корзину!' 
              : language === 'en' ? 'Product added to cart!' 
              : language === 'tr' ? 'Ürün sepete eklendi!': ''
            } 
          </span>
          <CheckCircleOutlined style={{color: 'yellowgreen', fontSize: 52}}/>
        </div>
      </ModalWrapper>
      <Footer/>
    </div>
  )
}
