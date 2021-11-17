import { slide as Menu } from 'react-burger-menu'
import React, { Profiler, useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import 'font-awesome/css/font-awesome.min.css';
import { FaHeart, FaSignOutAlt, FaSignInAlt, FaUserCircle, FaDonate, FaTicketAlt, FaBars, FaIdBadge } from 'react-icons/fa';
import { IoHome } from "react-icons/io5";
import { BiDonateHeart } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { HiCubeTransparent } from "react-icons/hi";
import { Nav } from 'react-bootstrap'
import { useAuthContext } from "../../contexts/auth";
import './BurgerMenu.css'

function BurgerMenu() {

    const { currentUser, logout } = useAuthContext()
    console.log(currentUser)

    const profile = () => {
        try {
            return currentUser.sub.user == 'charity' ? <div className='m-item'><span className="icon-wrapper"><FaIdBadge /></span><Nav.Link href={`/charities/${currentUser.sub.name}`}>Profile</Nav.Link></div> : <></>
        }
        catch { return <></> }
    }

    return (
        <div>
            <Menu>
                <div className="m-title">Transparity <HiCubeTransparent /></div>
                <div className="m-item"><span className="icon-wrapper"><IoHome /></span><Nav.Link href="/home">Home</Nav.Link></div>
                <div className="m-item"><span className="icon-wrapper"><BsBook /></span><Nav.Link href="/timeline">Timeline</Nav.Link></div>
                {currentUser && <div className="m-item"><span className="icon-wrapper"><FaTicketAlt /></span><Nav.Link href="/tickets">Tickets</Nav.Link></div>}
                {currentUser && <div className="m-item"><span className="icon-wrapper"><FaSignOutAlt /></span><Nav.Link href="/home" onClick={logout}>Logout</Nav.Link></div>}
                {profile()}

                {!currentUser && <div className="m-item"><span className="icon-wrapper"><FaSignInAlt /></span><Nav.Link href="/login">Sign in</Nav.Link></div>}
                {!currentUser && <div className="m-item"><span className="icon-wrapper"><FaUserCircle /></span><Nav.Link href="/register">Register</Nav.Link></div>}
                {/* {currentUser && <div className="m-item"><span className="icon-wrapper"><FaHeart /></span><Nav.Link href="/feedbackForm">Feedback Page</Nav.Link></div>} */}
                {currentUser && <div className="m-item"><span className="icon-wrapper"><BiDonateHeart /></span><Nav.Link href="/donations">Donations</Nav.Link></div>}
            </Menu >
        </div >
    )
}

export default BurgerMenu
