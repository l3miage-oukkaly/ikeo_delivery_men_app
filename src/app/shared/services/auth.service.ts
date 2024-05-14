import {inject, Injectable, Signal, WritableSignal} from '@angular/core';
import {
  Auth,
  authState, createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut, user,
  User
} from "@angular/fire/auth";
import {Observable} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Router} from "@angular/router";
import {addDoc, collection, collectionData, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {IUserProfile} from "../../core/models/user-profile.models";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firestore = inject(Firestore)
  readonly obsUser: Observable<User | null> = authState(this.fbAuth)
  readonly sigObsUser: Signal<User | null> = toSignal(this.obsUser, {initialValue: null})

  constructor(private fbAuth: Auth, private router: Router) {
    this.obsUser.subscribe({next(user) {
      if (user === null) {router.navigate(['/auth'])} else {
        router.navigate(['/delivery-tour'])
      }
      console.log(user)}})
    const testObs = collectionData(collection(this.firestore, 'users')) as Observable<IUserProfile[]>
    testObs.subscribe(users => console.log(users))
  }

  createUserRowInFirebase(uid: string, email: string) {
  }

  getToken() {
    if (!this.fbAuth.currentUser) {
      return "";
    }
    return this.fbAuth.currentUser.getIdToken()
    // this is async activity to check if the token is valid or expired. if expired new token will be issued.
  }

  getUserId() {
    if (!this.fbAuth.currentUser) {
      return "";
    }
    return this.fbAuth.currentUser.uid
    // this is async activity to check if the token is valid or expired. if expired new token will be issued.
  }

  async logout(): Promise<void> {
    return signOut(this.fbAuth);
  }

  async loginGoogle(): Promise<void> {
    return signInWithPopup(this.fbAuth, new GoogleAuthProvider()).then(
      console.log,
      console.error,
    )
  }

  async loginEmail(email: string, password: string, errorMsg: WritableSignal<string>): Promise<void> {
    signInWithEmailAndPassword(this.fbAuth, email, password).catch((error) => {
      switch(error.code) {
        case 'auth/user-not-found':
          errorMsg.set('Utilisateur non trouvé')
          break;
        case 'auth/wrong-password':
          errorMsg.set('Mot de passe incorrect')
          break;
        case 'auth/invalid-credential':
          errorMsg.set('Email ou mot de passe invalide')
          break;
        default:
          console.log(error.code)
          errorMsg.set('Une erreur inconnue est survenue')
      }

    })
  }

  async createUserWithEmail(email: string, password: string, errorMsg: WritableSignal<string>) {
    createUserWithEmailAndPassword(this.fbAuth, email, password).then((userCredential) => {
      console.log(userCredential)
    })
      .catch((error) => {
          switch(error.code) {
            case 'auth/email-already-in-use':
              errorMsg.set('Email déjà utilisé')
              break;
            default:
              console.log(error.code)
              errorMsg.set('Une erreur inconnue est survenue')
          }
      });
  }
}
