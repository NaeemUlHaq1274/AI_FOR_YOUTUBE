import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { WEB_CLIENT_ID } from '@env';

interface User {
  jobSearchToken: number;
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  initializing: boolean;
  currentUser: User | null;
  handleGoogleSignIn: () => Promise<any>;
  logout: () => void;
  loading: boolean;
  setResults: any;
  results: any;
}

const AuthContext = createContext<AuthContextType>({
  initializing: true,
  currentUser: null,
  handleGoogleSignIn: async () => { },
  logout: () => { },
  loading: false,
  setResults: () => { },
  results: "",
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [results, setResults] = useState<string>("");

  useEffect(() => {
    GoogleSignin.configure({ webClientId: WEB_CLIENT_ID })
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber();
  }, []);



  const onAuthStateChanged = async (authUser: any) => {

    setLoading(true)
    if (authUser) {
      const fireStoreUser = await getUserFromFireStore(authUser?.uid);
      if (!fireStoreUser) {
        await addUserToFireStore(authUser);
      }

      setCurrentUser(authUser);
      setLoading(false);
    } else {
      setCurrentUser(null);
      setLoading(false);
    }

    if (initializing) setInitializing(false);
  };

  const getUserFromFireStore = async (userId: any) => {
    try {
      const userDoc = await firestore().collection('Users').doc(userId).get();
      return userDoc.exists ? userDoc.data() : null;
    } catch (error) {
      console.error('Error getting user from Firestore:', error);
      return null;
    }
  };

  const addUserToFireStore = async (authUser: any) => {
    try {
      const { uid, email, displayName } = authUser;
      await firestore().collection('Users').doc(uid).set({
        uid,
        email,
        displayName,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setCurrentUser(null)
      await auth().signOut();
      await GoogleSignin.revokeAccess();
      console.log('Logout successful');
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  };


  const value = {
    initializing,
    currentUser,
    setCurrentUser,
    handleGoogleSignIn,
    logout,
    loading,
    results,
    setResults
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};