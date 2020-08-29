import React, { useState } from 'react';
import Header from './components/layout/Header';
import Content from './components/layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context/index';
import Login from './Login'



function App({ darkModeDefault = false }) {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [imageUrl, setImageUrl] = useState('/static/images / avatar / 1.jpg')

  // if (user === true) {
    localStorage.setItem('userId', userId)
  // }



  return (

    <div className="">
      {user ?
        (<SelectedProjectProvider>
          <ProjectsProvider>
            <main
              data-testid='application'
              className={darkMode ? 'darkmode' : undefined}>
              <Header imageUrl={imageUrl} darkMode={darkMode} userId={userId} user={user} setUser={setUser} setDarkMode={setDarkMode} />
              <Content userId={userId} />
            </main>
          </ProjectsProvider>
        </SelectedProjectProvider >) : <Login user={user} setUser={setUser} userId={userId} setUserId={setUserId} imageUrl={imageUrl} setImageUrl={setImageUrl} />}

    </div>

  );
}

export default App;