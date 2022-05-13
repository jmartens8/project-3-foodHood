import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom'


export default function Home() {

	return (
    <>
        <Navbar />
        <div>
           <div>
                <Link to='/donate'>
                    <button>
                        Donate
                    </button>
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