import React from 'react'
import './Footer.css'
import { HiCubeTransparent } from "react-icons/hi";
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

const index = () => {
    return (
        <div>
            <footer className="footer">
                <div className="footer-text">
                    <div className="footer-title">
                        <h2>Transparity</h2>
                        <HiCubeTransparent />
                    </div>
                    <h4>Copyright &copy; 2021 </h4>
                </div>


                <div class="footer-social-media-banner">
                    <h5>Follow Us:</h5>
                    <a href="" target="_blank"><AiIcons.AiFillFacebook /></a>
                    <a href="" target="_blank"><IoIcons.IoLogoInstagram /></a>
                    <a href="" target="_blank"><RiIcons.RiLinkedinFill /></a>
                    <a href="" target="_blank"><AiIcons.AiFillYoutube /></a>
                </div>
            </footer>
        </div>
    )
}

export default index
