import React from 'react'
import './skills.css'
import beStack from '../../assets/beStack.png';
import feStack from '../../assets/frontendStack.png';
import softSkill from '../../assets/softSkill.png';
import systemDesign from '../../assets/systemDesign.png'
import devopsStack from '../../assets/devopsStack.png'

const Skills = () => {
    return (
        <section id='skills'>
            <span className='skillTitle'> What I Do</span>
            <span className='skillDescription'>
            I design, develop, and maintain efficient, scalable, and user-friendly backend systems, data flow architectures, and user interfaces. 
            I automate tasks and configure infrastructure, and monitor systems for performance and availability.</span>
            <div className="skillBars">
                <div className="skillBar">
                    <img src={systemDesign} alt="Software System Design" className="skillBarImg" />
                    <div className="skillBarText">
                        <h2>Data Flow & s/w System Design</h2>
                        <p>As a data flow and software system designer, I help companies build systems that efficiently move and process data.
                            I do this by listening to the needs of the users and stakeholders, designing a data flow architecture,
                            choosing the right data storage and processing technologies, and designing the system's user interface and APIs.</p>
                    </div>
                </div>
                <div className="skillBar">
                    <img src={beStack} alt="Backend" className="skillBarImg" />
                    <div className="skillBarText">
                        <h2>Backend Web Development</h2>
                        <p>As a REST API developer, I specialize in building the digital bridges that allow different software applications to communicate and share data seamlessly.
                            I play a key role in making sure these interactions happen flawlessly. I'm passionate about crafting elegant and reliable APIs that enhance the functionality of digital experiences.
                        </p>
                    </div>
                </div>
                <div className="skillBar">
                    <img src={feStack} alt="FrontEnd" className="skillBarImg" />
                    <div className="skillBarText">
                        <h2>Frontend Web Development</h2>
                        <p>As a beginner front-end developer, I help companies build the user-facing interfaces of their websites and web applications.
                            I do this by using HTML, CSS, and JavaScript to create visually appealing and interactive experiences.
                            Like this portfolio website you would have noticed.</p>
                    </div>
                </div>
                <div className="skillBar">
                    <img src={devopsStack} alt="DevOpsCloud" className="skillBarImg" />
                    <div className="skillBarText">
                        <h2>Integration, Deployments & Cloud</h2>
                        <p>I believe that by automating tasks and breaking down silos between development and operations teams, we can create a more efficient and agile software development process.
                            I want to be able to help companies choose the right cloud platform for their needs and optimize their cloud deployments for performance and cost.
                            I'm committed to continuous learning and improvement. I'm always looking for new ways to improve my skills and knowledge so that I can be a valuable asset to my team and my company.</p>
                    </div>
                </div>
                <div className="skillBar">
                    <img src={softSkill} alt="ProblemSolving" className="skillBarImg" />
                    <div className="skillBarText">
                        <h2>Inventiveness</h2>
                        <p>As a creative problem solver, curious tech enthusiast, and inventive thinker,
                            I'm passionate about finding new and innovative ways to solve complex problems. I'm still learning, but I'm excited to use my skills to think outside the box and come up with creative solutions.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills