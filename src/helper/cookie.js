import Cookies from "js-cookie";

const setToken=(token)=>{
    if (token)  Cookies.set('token', token, { expires: 7 }); 
      
}

const getToken=()=>{
  return  Cookies.get('token');
}

const removeToken=()=>{
  Cookies.remove('token');
}

const setUser=(user)=>{
    if (user) Cookies.set('user', user, { expires: 7 }); 
}

const getUser=()=>{
  return  Cookies.get("user")
}

const removeUser=()=>{
  Cookies.remove("user")
}

export {setToken,getToken,removeToken,setUser,getUser,removeUser}