export const isEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};
