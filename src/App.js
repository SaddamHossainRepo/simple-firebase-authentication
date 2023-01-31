import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth();


function App() {
  const [user, setUser] = useState({})
  
  const provider = new GoogleAuthProvider(app);

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, provider)
    .then(result =>{
      const user = result.user;
      setUser(user)
      console.log(user);
    })
    .catch(error =>{
      console.error(error);

    })
  }

  const handleSignOut = () =>{
    signOut(auth)
    .then(()=>{
      setUser({})
      alert('Sign out successfull')
    })
    .catch(error =>{
      console.error(error);
      setUser({})
    })
  }
  return (
    <div className="App">
      {
        user.email
        ?
        <button onClick={handleSignOut}>Sign Out</button>
        :
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
      }
      {user.email && <div>
        <img src={user.photoURL} alt="" />
        <h3>User name: {user.displayName}</h3>
        <p>Email address: {user.email}</p>
      </div>}
    </div>
  );
}

export default App;
