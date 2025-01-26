import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import './index.css';
import Jumbotron from './components/jumbotron/Jumbotron';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/footer/Footer';

function App() {
  const handleNotificationClick = () => {
    alert('Notifications clicked!');
  };

  const handleMenuItemClick = (menuItem: string) => {
    console.log(`Menu item clicked: ${menuItem}`);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ 
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              width: '100vw',
              overflowX: 'hidden'
            }}>
              <NavBar
                brandName="Marketplace"
                userBalance="0.012 BTC"
                userWallet="xfs...fas"
                onNotificationClick={handleNotificationClick}
                onMenuItemClick={handleMenuItemClick}
                menuItems={['Home', 'Profile', 'Settings']}
              />

              <Jumbotron
                title="Welcome to the Marketplace"
                subtitle="Discover and trade NFTs"
                backgroundImage="url_to_background_image"
              />
              
              <Footer />
            </div>
          }
        />

        <Route 
          path="/dashboard" 
          element={
            <div style={{ 
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              width: '100vw',
              overflowX: 'hidden'
            }}>
              <Dashboard />
             
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;