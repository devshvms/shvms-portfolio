import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';

import './contacts.css'
import drdo from '../../assets/drdo.png'
import capgemini from '../../assets/capgemini.png'
import eik from '../../assets/eik.png'
import moxey from '../../assets/moxey.jpeg'
import trukker from '../../assets/trukker.png'

import linkedin from '../../assets/linkedin.png'
import twitterIcon from '../../assets/logo-white.png'
import github from '../../assets/github.png'


const Contacts = () => {

    const form = useRef();

    // This sevice can be configured on https://dashboard.emailjs.com/admin 
    // currently linked with dev mail.
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_ts0gypl', 'template_be16063', form.current, 'PUwB1EoL5x4lcf27V')
            .then((result) => {
                console.log(result.text);
                e.target.reset();
                alert('Email Sent !')
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <section id="contactPage">
            <div id="clients">
                <h1 className="contactPageTitle">Worked with</h1>
                <p className="clientDescription">I have had the opportunity to work with several diverse companies and learn there culture and new skills.</p>
                <div className="clientImgs">
                    <img src={drdo} alt="DEAL" className='clientImg' />
                    <img src={capgemini} alt="Capgemini" className='clientImg' />
                    <img src={eik} alt="Eik" className='clientImg' />
                    <img src={trukker} alt="trukker.com" className='clientImg' />
                    <img src={moxey} alt="moxey.ai" className='clientImg' />
                </div>
            </div>
            <div id="contact">
                <h1 className="contactPageTitle">Contact Me</h1>
                <span className="contactDesc">Please fill out the form to discuss any work opportunity</span>
                <form className='contactForm' ref={form} onSubmit={sendEmail}>
                    <input type="text" className="name" placeholder='Your name' name= 'from_name' required/>
                    <input type="email" className="email" placeholder='Your email' name='from_email' required />
                    <textarea name="message" className="msg" rows="5" placeholder='Your message'></textarea>
                    <button type="submit" className="submitBtn">Submit</button>
                    <div className='links'>
                        <a href="https://www.linkedin.com/in/shivamsingh361/"><img src={linkedin} alt="LinkedIn" className="contactLinks" /></a>
                        <a href="https://twitter.com/"><img src={twitterIcon} alt="X" className="contactLinks" /></a>
                        <a href="https://github.com/shivamsingh361"><img src={github} alt="Github" className="contactLinks" /></a>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contacts