import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import _ from 'lodash'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { HomeOutlined, DeleteOutlined } from '@ant-design/icons'
import { calc, deleteDish } from '../../core/actions/buyProductActions'

import style from './Cart.module.scss'

export default function Cart() {
    const dispatch = useDispatch()

    const card = useSelector(({buyProductReducer: { card }}) => card)
    const language = useSelector(({chooseItemsReducer: { language }}) => language)

    const [cost, setCost] = useState(0)
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [payment, setPayment] = useState('Nakit')
    const [delivery, setDelivery] = useState('Adrese teslim')
    const [address, setAddress] = useState('')

    const allCost = card.length > 0 ? card.map(item => item.cost).reduce((n, m)=> Number(n) + Number(m)) : ''

    // useEffect(() => {
    //     if(card.length > 0){
    //         const summ = card.map(item => item.cost).reduce((n, m)=> Number(n) + Number(m))
    //         setCost(summ)
    //     }
    // }, [card])
    useEffect(() => {
        if(code === 'Yummy'){
            setCost(cost - (cost*0.1))
        }
        if(code !== 'Yummy'){
            setCost(allCost)
        }
    }, [code])
    
    const onPayment = (num) => {
        setPayment(num)
    }
    const onDelivery = (num) => {
        setDelivery(num)
    }
    
    const text = `https://api.whatsapp.com/send?text=${name}, ${card?.map((item, index) => {return (
            ` ${index +1}. ${item.name} - ${item.amount}adet ${item.cost}tl`)})}, 
            Promokodu - ${code},
            Toplam tutar - ${code === 'Yummy' ? cost : allCost},
            Ödemeyi seç - ${payment},
            Teslimat yöntemi - ${delivery},
            Teslimat adresi - ${address}
            &phone=905373535070
        `
    return (
        <div className={style.wrapCart}>
            <Header/>
            <div className={style.wrapMainPageLink}>
                <Link className={style.link} to="/">
                <HomeOutlined className={style.homePic}/>
                <span className={style.textPage}>Menu</span>
                </Link>
            </div>
            <span className={style.title}>
                {
                    language === 'ru' ? 'Корзина' 
                    : language === 'en' ? 'Сart' 
                    : language === 'tr' ? 'Sepet': ''
                }
            </span>
            {
                card?.map(item => {return (
                    <div className={style.cart}
                        key={item.id}
                    >
                        <div className={style.wrapProduct}>
                            <img src={item.image} className={style.product} alt=""/>
                            <span style={{textAlign: 'center'}}>{item.name}</span>
                        </div>
                        <div className={style.wrapCostBlock}>
                            <div className={style.wrapCost}>
                                <span className={style.cost}>{item.cost} tl</span>
                            </div>
                            <div className={style.wrapAmount}>
                                <span className={style.amount}>{item.amount}</span>
                            </div>
                            <div className={style.wrapCounter}>
                                <div className={style.minus}
                                    onClick={() => dispatch(calc({arith: 'minus', id: item.id}))}
                                >-</div>
                                <div className={style.plus}
                                    onClick={() => dispatch(calc({arith: 'plus', id: item.id}))}
                                >+</div>
                            </div>
                        </div>
                        <DeleteOutlined className={style.delete}
                            onClick={() => dispatch(deleteDish({id: item.id}))}
                        />
                    </div>
                )})
            }
            <div className={style.wrapInput} style={{marginTop: 35}}>
                <span style={{marginBottom: 5}}>
                    {
                        language === 'ru' ? 'Применить промокод' 
                        : language === 'en' ? 'Apply a promo code' 
                        : language === 'tr' ? 'Promosyon kodunu uygula ': ''
                    }
                </span>
                <div className={style.promoCodeBlock}>
                    <input type='text' className={style.input} value={code} onChange={(e) => setCode(e.target.value)}/>
                    <div className={style.promoCodeBtn}>
                        {
                            language === 'ru' ? 'Применить' 
                            : language === 'en' ? 'Apply' 
                            : language === 'tr' ? 'Uygula': ''
                        }
                    </div>
                </div>
            </div>
            <div className={style.wrapInput}>
                <span>
                    {
                        language === 'ru' ? 'Введите ваше имя' 
                        : language === 'en' ? 'Enter your name' 
                        : language === 'tr' ? 'Adiniz': ''
                    }
                </span>
                <input type='text' className={style.input} value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className={style.wrapInput}>
                <span>
                    {
                        language === 'ru' ? 'Способ оплаты' 
                        : language === 'en' ? 'Payment method' 
                        : language === 'tr' ? 'Ödemeyi seç': ''
                    }
                </span>
                <div className={style.wrapRadio}>
                    <div className={style.radio}
                        style={{backgroundColor: payment === 'Nakit' ? 'rgba(241,133,0, 0.9)' : ''}}
                        onClick={() => onPayment('Nakit')}
                    />
                    <span>
                        {
                            language === 'ru' ? 'Наличные' 
                            : language === 'en' ? 'Cash' 
                            : language === 'tr' ? 'Nakit': ''
                        }
                    </span>
                    <div className={style.radio}
                        style={{backgroundColor: payment === 'Kart' ? 'rgba(241,133,0, 0.9)' : '', marginLeft: 14}}
                        onClick={() => onPayment('Kart')}
                    /> 
                    <span>
                        {
                            language === 'ru' ? 'Карта' 
                            : language === 'en' ? 'Card' 
                            : language === 'tr' ? 'Kart': ''
                        }
                    </span>
                </div>
            </div>
            <div className={style.wrapInput}>
                <span>
                    {
                        language === 'ru' ? 'Способ доставки' 
                        : language === 'en' ? 'Shipping method' 
                        : language === 'tr' ? 'Teslimat yöntemi': ''
                    }
                </span>
                <div className={style.wrapRadio}>
                    <div className={style.radio}
                        style={{backgroundColor: delivery === 'Adrese teslim' ? 'rgba(241,133,0, 0.9)' : ''}}
                        onClick={() => onDelivery('Adrese teslim')}
                    />
                    <span>
                        {
                            language === 'ru' ? 'Доставка' 
                            : language === 'en' ? 'Delivery' 
                            : language === 'tr' ? 'Adrese teslim': ''
                        }
                    </span>
                    <div className={style.radio}
                        style={{backgroundColor: delivery === 'Gel al' ? 'rgba(241,133,0, 0.9)' : '', marginLeft: 14}}
                        onClick={() => onDelivery('Gel al')}
                    /> 
                    <span>
                        {
                            language === 'ru' ? ' Самовывоз' 
                            : language === 'en' ? 'Pickup' 
                            : language === 'tr' ? 'Gel al': ''
                        }
                    </span>
                </div>
            </div>
            {
                delivery === 'Adrese teslim'
                ?   <div className={style.wrapInput}>
                        <span>
                            {
                                language === 'ru' ? 'Адрес доставки' 
                                : language === 'en' ? 'Delivery Address' 
                                : language === 'tr' ? 'Teslimat adresi': ''
                            }
                        </span>
                        <textarea  className={style.textarea} value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                :   <div className={style.wrapInput}>
                        <span>
                            {
                                language === 'ru' ? 'Адрес:' 
                                : language === 'en' ? 'Address:' 
                                : language === 'tr' ? 'Adres:': ''
                            }
                        </span>
                        <span style={{marginTop: 10}}>Merkez mah. Lise caddesi no 20A</span>
                    </div>
            }
            <div className={style.wrapAllCost}>
                <span>
                    {
                        language === 'ru' ? 'Общая сумма :' 
                        : language === 'en' ? 'The total amount :' 
                        : language === 'tr' ? 'Toplam tutar :': ''
                    }
                </span>
                <div className={style.wrapAllCost}>
                    <span className={style.cost}>{code === 'Yummy' ? cost : allCost} tl</span>
                </div>
            </div>
            <div className={style.wrapInput}>
                <span>
                    {
                        language === 'ru' ? 'Режим работы: 10:00-22:00' 
                        : language === 'en' ? 'Opening hours: 10:00-22:00' 
                        : language === 'tr' ? 'Çalışma saatleri 10:00-22:00': ''
                    }
                    
                </span>
            </div>
            <div className={style.wrapOrder}>
                <a href={text} className={style.sendText}>
                    {
                        language === 'ru' ? 'Отправить заказ' 
                        : language === 'en' ? 'Send an order' 
                        : language === 'tr' ? 'Sipariş mesajı gönder': ''
                    }
                </a>
            </div>

            <div className={style.wrapCalls}>
                <a href="tel:+902428141865" aria-label="phone" style={{textDecoration: 'none'}}>
                    <img src={require('./images/phone.png')} className={style.call} alt=""/>
                </a>
                <a href="https://www.instagram.com/yummy_kemer" aria-label="phone" style={{textDecoration: 'none'}}>
                    <img src={require('./images/insta.png')} className={style.call} alt=""/>
                </a>
                <a href='whatsapp://send?phone=+375259802774' style={{textDecoration: 'none'}}>
                    <img src={require('./images/whatsapp1.png')} className={style.call} alt=""/>
                </a>
            </div>
            <Footer/>
        </div>
  )
}
