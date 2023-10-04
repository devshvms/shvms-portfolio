import React from 'react'
import './works.css'
import Portfolio1 from '../../assets/wip.png';


const Works = () => {
  return (
    <section id='works'>
        <h2 className='worksTitle'>My Portfolio</h2>
        <span className='worksDesc'>
          You will find my projects here, once this page is designed and deployed.  
        </span>
        <div className="worksImgs">
            <img src={Portfolio1} alt="Portfolio1" className="worksImg" />
        </div>
        <button className="worksBtn">See more</button>
    </section>
  )
}
export default Works;