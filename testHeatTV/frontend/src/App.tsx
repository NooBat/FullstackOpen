import { BrowserRouter } from 'react-router-dom';
// import { Container } from '@mui/system';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from 'firebase/auth';
import { useEffect } from 'react';
import axios from 'axios';
import { gql, useApolloClient, useLazyQuery } from '@apollo/client';

import { NavBar } from './components/NavBar'; // header
// import { MainPage } from './pages/MainPage/MainPage';
import { isString } from './utils/typesCheck';
// in pages

const GET_USER = gql`
  query getUser {
    currentUser {
      provider
      providerId
      id
      displayName
      email
      photoUrl
    }
  }
`;

const App = () => {
  const [getUser] = useLazyQuery(GET_USER, {
    onCompleted: (res) => {
      console.log(res, 'on complete');
    },
  });
  const client = useApolloClient();
  setInterval(async () => {
    await client.clearStore();
    await getUser();
  }, 10000);

  const auth = getAuth();
  useEffect(() => {
    if (!isString(process.env.REACT_APP_GOOGLE_CLIENT_ID)) {
      console.error('NO CLIENT_ID FOUND!');
      return;
    }

    async function handleCredentialResponse(
      response: google.accounts.id.CredentialResponse
    ) {
      const idToken = response.credential;
      const credential = GoogleAuthProvider.credential(idToken);

      // Sign in with credential from the Google user.
      const userCred = await signInWithCredential(auth, credential);
      const token = await userCred.user.getIdToken();
      await axios.post<void>('http://localhost:4000/login', { token });
      const button = document.getElementById('signInButton');
      if (button) {
        button.style.display = 'none';
      }
      getUser();
    }

    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      context: 'signin',
      ux_mode: 'popup',
      nonce: '',
      auto_select: true,
      itp_support: true,
    });

    google.accounts.id.renderButton(
      document.getElementById('signInButton') as HTMLElement,
      {
        type: 'standard',
        theme: 'filled_blue',
        text: 'signin_with',
        size: 'large',
        logo_alignment: 'left',
        width: '50',
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      {/* <div className='App'>
        <Container>
          <Routes>
            <Route path='/' element={<MainPage />} />
          </Routes>
        </Container>
      </div> */}
      <button id='signInButton' type='button'>
        Login
      </button>
    </BrowserRouter>
  );
};

export default App;
