import React from 'react'
import {Route,  Routes} from 'react-router-dom'

import ScrollToTop from './ScrollToTop'
import Main from '../Main/Main'
import Dishes from '../Dishes/Dishes'
import Cart from '../Cart/Cart'


export default function App() {

    return (
        <>
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/dishes" element={<Dishes/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
        </>
    )
}