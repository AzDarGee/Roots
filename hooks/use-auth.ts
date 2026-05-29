import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>({ uid: 'mock', email: 'owner@example.com' } as any); // Mocked due to workspace wipe
  const [loading, setLoading] = useState(false);

  /* Real implementation:
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  */

  const login = () => {
    // const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider).catch(console.error);
    setUser({ uid: 'mock', email: 'owner@example.com' } as any);
  };

  const logout = () => {
    // signOut(auth).catch(console.error);
    setUser(null);
  };

  return { user, loading, login, logout };
}
