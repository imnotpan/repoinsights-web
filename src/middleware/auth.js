import { useUserStore } from '@/store/user'; // Importa useUserStore

export default function auth({ next }) {
  const userStore = useUserStore(); // Crea una instancia de userStore

  if (userStore.token) {
    console.log("activeUser", userStore.user.name || userStore.user.email || userStore.user.login);
    return next();
  }
  return next({ name: "Login" });
}
