import React from 'react'

import style from './Footer.module.scss'

export default function Footer() {
  return (
    <div className={style.wrapCreatedPF}>
      <img src={require('./images/site.webp')} style={{marginRight: 10}} width='28' height='25' alt='mobile app'/>
      <span>Created by&nbsp;&nbsp;</span>
      <a style={{color: 'black'}} href="https://create-site.by/">https://create-site.by</a>
    </div>
  )
}
