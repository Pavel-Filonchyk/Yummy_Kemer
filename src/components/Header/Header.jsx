import React, { useState,  useLayoutEffect, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { changeLanguage } from '../../core/actions/chooseItemsActions'

import style from './Header.module.scss'

export default function Header() {
  const dispatch = useDispatch()

  const language = useSelector(({chooseItemsReducer: { language }}) => language)
  const card = useSelector(({buyProductReducer: { card }}) => card)

  const [mobile, setMobile] = useState(false)
  useLayoutEffect(() => {
    const userAgent = navigator.userAgent
    const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent)
    setMobile(isMobile)
  }, [])

  const onLanguage = (lang) => {
    dispatch(changeLanguage(lang))
  }

  return (
    <div className={style.header}>
      {
        mobile 
        ? ''
        : <div className={style.logo}></div>
      }
      <div className={style.wrapTitle}>
        <span>YUMMY KEMER</span>
        <span className={style.title}>MENU</span>
      </div>
      <div className={style.wrapRightBox}>
        {
          !mobile 
          ? (
            <div className={style.wrapLanguage}>
              <span className={style.language}
                style={{borderBottom: language === 'tr' ? '3px solid rgba(241,133,0, 0.9)' : ''}}
                onClick={() => onLanguage('tr')}
              >tr</span>
              <span className={style.language}>/</span>
              <span className={style.language}
                style={{borderBottom: language === 'ru' ? '3px solid rgba(241,133,0, 0.9)' : ''}}
                onClick={() => onLanguage('ru')}
              >ru</span>
              <span className={style.language}>/</span>
              <span className={style.language}
                style={{borderBottom: language === 'en' ? '3px solid rgba(241,133,0, 0.9)' : ''}}
                onClick={() => onLanguage('en')}
              >en</span>
            </div>
          )
          : (
            <select 
              value={language}
              onChange={(e) => onLanguage(e.target.value)}
              className={style.selectLeng}
            >
              <option value='tr'>tr</option>
              <option value='ru'>ru</option>
              <option value='en'>en</option>
            </select>
          )
        }
        <Link className={style.wrapBasket} to="/cart">
          <ShoppingCartOutlined className={style.basket}/>
          <div className={style.circle}>
            <span>{card.length}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
