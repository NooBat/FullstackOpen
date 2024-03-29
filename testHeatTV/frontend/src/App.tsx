import { BrowserRouter } from 'react-router-dom';
// import { Container } from '@mui/system';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from 'firebase/auth';
import { useEffect } from 'react';
import axios from 'axios';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

import { NavBar } from './components/NavBar'; // header
// import { MainPage } from './pages/MainPage/MainPage';
import { isString } from './utils/typesCheck';
import { User } from './types';
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
      favoriteShows {
        id
      }
      favoritePeople {
        id
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($personId: Int, $showId: Int) {
    updateUser(personId: $personId, showId: $showId) {
      code
      message
      success
      user {
        provider
        providerId
        id
        displayName
        email
        photoUrl
        favoriteShows {
          id
        }
        favoritePeople {
          id
        }
      }
    }
  }
`;

const App = () => {
  const [getUser, { data }] = useLazyQuery<User>(GET_USER, {
    onCompleted: (res) => {
      console.log(res, 'getUser complete');
    },
  });
  const [updateUser, result] = useMutation(UPDATE_USER, {
    onCompleted: (res) => {
      console.log(
        result,
        'fetched result\n',
        res,
        'response in onCompleted',
        data
      );
    },
  });

  const auth = getAuth();
  useEffect(() => {
    if (!isString(process.env.REACT_APP_GOOGLE_CLIENT_ID)) {
      console.error('NO CLIENT_ID FOUND!');
      return;
    }

    if (data?.currentUser) {
      return;
    }

    async function handleCredentialResponse(
      response: google.accounts.id.CredentialResponse
    ) {
      const idToken = response.credential;
      const credential = GoogleAuthProvider.credential(idToken);

      const userCred = await signInWithCredential(auth, credential);
      const token = await userCred.user.getIdToken();
      await axios.post<void>(
        'http://localhost:4000/login',
        {
          token,
        },
        { withCredentials: true }
      );
      const button = document.getElementById('signInButton');
      if (button) {
        button.style.display = 'none';
      }
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
  }, [JSON.stringify(data)]);

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
      <button
        type='button'
        onClick={() => {
          updateUser({ variables: { personId: 1 } });
        }}
      >
        add person
      </button>
      <button type='button' onClick={() => getUser()}>
        get user
      </button>
    </BrowserRouter>
  );
};

export default App;
