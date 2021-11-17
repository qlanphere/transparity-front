import React from 'react'
import './Footer.css'
import { HiCubeTransparent } from "react-icons/hi";
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import { useThemeContext } from '../../contexts/ThemeContext';

const Footer = () => {


    return (
        <>
            <footer className="footer" >
                <div className="footer-text">
                    <div className="footer-title">
                        <h2>Transparity</h2>
                        <HiCubeTransparent />
                    </div>
                    <h4>Copyright &copy; 2021 </h4>
                </div>

                <div className="footer-transp-container">
                    <ul>
                        <li><a href="https://transparity.netlify.app/timeline">Timeline</a></li>
                        <li><a href="https://transparity.netlify.app/tickets">Tickets</a></li>
                        <li><a href="https://transparity.netlify.app/feedbackForm">Feedback</a></li>
                        <li><a href="https://transparity.netlify.app/donations">Donations</a></li>
                    </ul>
                    <ul>
                        <li><a href="https://transparity.netlify.app/home">Home</a></li>
                        <li><a href="#">Partners</a></li>
                        <li><a href="#">Help</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>

                </div>


                <div class="footer-social-media-banner">
                    <h5>Follow Us:</h5>
                    <a href="" target="_blank"><AiIcons.AiFillFacebook /></a>
                    <a href="" target="_blank"><IoIcons.IoLogoInstagram /></a>
                    <a href="" target="_blank"><RiIcons.RiLinkedinFill /></a>
                    <a href="" target="_blank"><AiIcons.AiFillYoutube /></a>
                </div>
            </footer>
            <div class="bottom-separator"></div>
        </>
    )
}

export default Footer
