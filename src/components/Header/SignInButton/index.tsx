import { FiX } from 'react-icons/fi'
import { FaGithub } from "react-icons/fa" 

import styles from './styles.module.scss'

export function SignInButton() {
  const isUserLoggedIn = true

  return isUserLoggedIn ? (
    <button 
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#04d361" />
      Alex Muchau
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button 
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#eba417" />
      Sign In with Github
    </button>
  )
}