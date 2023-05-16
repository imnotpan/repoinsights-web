import { useUserStore } from '@/store/user'; // Importa useUserStore

export default function auth({ next }) {
  console.log("auth middleware");

  const userStore = useUserStore(); // Crea una instancia de userStore

  if (userStore.token) {
    console.log("activeUser", userStore.user.name || userStore.user.email || userStore.user.login);
    return next();
  }
  console.log("no activeUser");
  return next({ name: "Login" });
}
