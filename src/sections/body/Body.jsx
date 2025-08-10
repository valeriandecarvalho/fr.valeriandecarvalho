import Hero from './hero/Hero.jsx';
import About from './about/grid/About.jsx';
import BeforeAbout from "./about/banner/BeforeAbout.jsx";
import Project from './project/Project.jsx';
import Formation from './formation/Formation.jsx';
import Experience from './experience/Experience.jsx';
import Contact from './contact/Contact.jsx';

const Body = () => {
    return (
        <>
            <Hero/>
            <BeforeAbout/>
            <About/>
            <Project/>
            <Formation/>
            <Experience/>
            <Contact />
        </>
    );
};

export default Body;