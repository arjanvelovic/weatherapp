import AppInfo from '../assets/AppInfo.tsx'
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import ColorButton from '../components/ColorButton.tsx';
import { Link } from 'react-router-dom';

// interface props {
// }

function Navbar() {

    const AInfo:any = {AppInfo}
    const navInfo = AInfo['AppInfo']['navbar']
    
    const [open, setState] = useState(false);

    const toggleDrawer = (open:any) => (event:any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        setState(open);
    };


    return (
    <nav className='fixed top-0 w-full left-0 shadow-gray-200 shadow-lg h-20 flex justify-center font-bold text-gray-800 z-50 bg-white'>
        <div className='grid grid-cols-2 container max-w-6xl'>
            <div className='flex justify-start items-center mx-6'>
                <img src={navInfo['logo']} className='h-16' alt='navlogo'/>
                <div className='uppercase'>{navInfo['name']}</div>
            </div>
            <div className='hidden sm:flex items-center justify-end text-end'>
                {navInfo['pages'].map((page:any) => (
                    <button key={page['name']} className='m-1 md:m-4 px-3 md:px-4 py-2 hover:text-green-700 underline-offset-4 hover:underline transition duration-300 uppercase'>
                    <Link to={page['route']}>{page['name']}</Link>
                    </button>
                ))}
            </div>

            <div className="sm:hidden grid justify-end me-10 items-center">
                <ColorButton children = {<i className='fas fa-bars'></i>} className={'py-2 px-4'} onClick={toggleDrawer(true)}/>
            </div>

        </div>

        <Drawer
            anchor="top"
            open={open}
            onClose={toggleDrawer(false)}
            //@ts-ignore
            onOpen={toggleDrawer(true)}
            className='sm:hidden'
            transitionDuration= {500}
        >
            <div className='bg-gray-50'>
                <div className='text-start my-3 mx-5'>
                    <ColorButton children = {<i className="fa-solid fa-x"></i>} className={'py-2 px-4'} onClick={toggleDrawer(false)}/>
                </div>
                
                <div>
                    {navInfo['pages'].map((page:any) => (
                        <div key={page['name']} className='py-2 text-end pe-6 border-b border-t-2 border-gray-300' >
                            <button className='py-2 px-4 hover:text-green-700 underline-offset-4 hover:underline transition duration-300 uppercase' onClick={toggleDrawer(false)}><Link to={page['route']}>{page['name']}</Link></button>
                        </div>
                    ))}
                </div>
            </div>
        </Drawer>

    </nav>
);}

export default Navbar