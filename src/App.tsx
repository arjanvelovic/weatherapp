import { HashRouter, Routes, Route} from 'react-router-dom';
import routes from './config/routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  return (
    <HashRouter>
        <div id="page-container" className='bg-slate-50'>
          <div id="content-wrap">
            <Navbar/>
            <div className='my-20'/>
              <Routes>
                { routes.map((route: any, index: any) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <route.component />
                    }
                  />
                )) }
              </Routes>
              </div>
            <Footer/>
        </div>
      </HashRouter>
  )
}

export default App
