import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import { MenuUnfoldOutlined, CloseSquareOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { moveSideBar } from '../../core/actions/chooseItemsActions'

import style from './Sidebar.module.scss'

export default function Sidebar() {
    const dispatch = useDispatch()

    const menu = useSelector(({restMenuReducer: { menu }}) => menu)
    const showSideBar = useSelector(({chooseItemsReducer: { moveSideBar }}) => moveSideBar)

    const onShowSideBar = (arg) => {
        dispatch(moveSideBar(arg))
    }

    return (
        ''
        // <div className={style.sideBar} style={{left: showSideBar ? 0 : -180, transition: 'all 1s ease'}}> 
        //     {
        //         // _.filter(menu, elem => elem.nameDish)
        //         imagesMenu.map((item, index) => {
        //             return (
        //             <div className={style.wrapDish}
        //                 key={item.blockId}
        //                 //onClick={onDishes}
        //             >
        //                 {/* <img src={item.image} className={style.menu} alt=""/>
        //                 <span className={style.nameDish}>{item.nameDish}</span> */}
        //                 {imagesMenu[index]}
        //                 <div className={style.wrapNameDish}>
        //                     <span className={style.nameDish}>{namesMenu[index]}</span>
        //                 </div>
        //             </div>
        //             )
        //         })
        //     }
        //     {
        //         showSideBar ?
        //         <CloseSquareOutlined 
        //         className={style.burger}
        //         style={{top: -3}}
        //         onClick={() => onShowSideBar(false)}
        //         />
        //         : <MenuUnfoldOutlined 
        //             className={style.burger}
        //             style={{top: -4}}
        //             onClick={() => onShowSideBar(true)}
        //         /> 
        //     }
        // </div>
    )
}
