// import { User } from "./authTypes";

// const AUTH_STORAGE_KEY = "ecommerce-user";

// export const saveUserToStorage = (user: User) => {
//   localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
// };

// export const getUserFromStorage = (): User | null => {
//   const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

//   if (!storedUser) {
//     return null;
//   }

//   return JSON.parse(storedUser);
// };

// export const removeUserFromStorage = () => {
//   localStorage.removeItem(AUTH_STORAGE_KEY);
// };

export const getUserInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};
