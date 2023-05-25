import { useUserStore } from '@/store/user'; // Importa useUserStore

export default function auth({ next }) {
  const userStore = useUserStore(); // Crea una instancia de userStore

  if (userStore.token) {
    console.log("activeUser", userStore.name);
    return next('app');
  }
  return next();
}
