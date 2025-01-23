import { useState } from 'react'
import NavBar from './components/navbar/NavBar'
import './App.css'

function App() {
  const handleNotificationClick = () => {
    alert('Notifications clicked!');
  };

  const handleMenuItemClick = (menuItem: string) => {
    console.log(`Menu item clicked: ${menuItem}`);
  };

  return (
    <>
      <div>
       
      <NavBar
        brandName="Marketplace"
        userBalance="0.012 BTC"
        userWallet="xfs...fas"
        onNotificationClick={handleNotificationClick}
        onMenuItemClick={handleMenuItemClick}
        menuItems={['Home', 'Profile', 'Settings']}
      />
      </div>
    </>
  )
}

export default App
