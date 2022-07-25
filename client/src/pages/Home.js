import MyNavbar from "../components/Navbar"
import { Link } from 'react-router-dom'
import './stylesPages/HomeStyle.css'



export default function Home() {

	return (
    <>
        <MyNavbar />
        <div>
           <div>
                <Link to='/donate'>
                    <div className="container">
                        <img className="homeImg" src="images/pic-donation.jpg" alt="Donation" />
                        <div className="overlay">Donate Food</div>
                    </div>
                    {/* <button>
                        Donate
                    </button> */}
                </Link>
           </div>
           <div>
                <Link to='/save-food'>
                    <button>
                        Save food
                    </button>
                </Link>
           </div>
        </div>
    </>
	)
}