import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Jumbotron from './components/jumbotron/Jumbotron';
import Dashboard from './components/dashboard/Dashboard'; 

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
            <>
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
                backgroundImage="https://www.appdupe.com/blog/wp-content/uploads/2021/05/Untitled-design-9.jpg"
              />
            </>
          }
        />

        {/* Route for the Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
