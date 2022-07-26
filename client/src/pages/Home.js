import MyNavbar from "../components/Navbar"
import { Link } from 'react-router-dom'
import './stylesPages/HomeStyle.css'



export default function Home() {

	return (
    <>
        <MyNavbar />
        <header>
           <div className="container">
                <Link to='/donate'>
                    <img className="homeImg" src="images/pic-donation2.jpg" alt="donation" />
                    <h2 className="overlay">Donate Food</h2>
                </Link>
             
           </div>
           <div className="container">
                <Link to='/save-food'>
                    <img className="homeImg" src="images/pic-familyDinner.jpg" alt="save food" />
                    <h2 className="overlay">Save Food</h2>
                </Link>
           </div>
        </header>
    </>
    
        // <MyNavbar />
        // <header>
        //    <div className="container">
        //         <Link to='/donate'>
        //             <img className="homeImg" src="images/pic-donation2.jpg" alt="donation" />
        //             <div className="overlay">Donate Food</div>
        //         </Link>
        //    </div>
        //    <div className="container">
        //         <Link to='/save-food'>
        //             <img className="homeImg" src="images/pic-familyDinner.jpg" alt="save food" />
        //             <div className="overlay">Save Food</div>
        //         </Link>
        //    </div>
        // </header>
    
	)
}