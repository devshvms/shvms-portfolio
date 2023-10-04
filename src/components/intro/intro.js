import React from 'react';
import './intro.css';
import bg from '../../assets/image.png'
// import { Link } from 'react-scroll';
// import btnImg from '../../assets/hireme.png'

const Intro
    = () => {
        return (
            <section id="intro">
                <div className="introContent">
                    <span className='hello'>Hello,</span>
                    <span className='introText'>
                        I'm <span className='introName'>Shivam</span>
                        <br />
                        Software Developer
                    </span>
                    <p className='introPara'>Thriving in challenging work environments where 
                    <br />I can make a meaningful impact, 
                    <br/>I am empowered by challenge to grow as a professional and 
                    <br />contribute to organizational success.</p>
                    {/* <Link><button className="btn"><img src={btnImg} className='btnImg' alt="Hire"/>Hire Me</button></Link> */}
                </div>
                <img src={bg} className='bg' alt="Shivam"/>
            </section>
        )
    }

export default Intro;
