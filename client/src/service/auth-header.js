const AuthHeader = () =>  {
  const tokenData = localStorage.getItem("token");
  
  if (tokenData) {
    return { Authorization: 'Bearer ' + tokenData};
  } else {
    return{};
  }
}
export default AuthHeader;