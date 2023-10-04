import Intro from "./components/intro/intro";
import Navbar from "./components/navbar/navbar";
import Skills from "./components/skills/skills";
import Works from "./components/works/works";
import Contacts from "./components/contacts/contacts";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="App">
     <Navbar/>
     <Intro/>
     <Skills/>
     <Works/>
     <Contacts/>
     <Footer/>
    </div>
  );
}

export default App;
