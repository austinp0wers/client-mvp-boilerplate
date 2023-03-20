const isValidSignup = (values: any) => {
  if (!values.email || !emailRegex.test(values.email)) return false;
  if (!values.password || !passwordRegex.test(values.password)) return false;
  if (!values.name) return false;
  if (!values.phone) return false;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[a-zA-Z1-9],{6,20}/;
// const phoneRegex = /^/;

export default isValidSignup;
