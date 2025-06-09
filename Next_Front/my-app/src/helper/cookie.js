import Cookies from "js-cookie";

const setToken=(token)=>{
    if (token)  {
      const maxAge =1* 60 * 60;
      document.cookie = `token=${token}; max-age=${maxAge}; path=/`;
    }
}

const getToken = () => {
  const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='));

  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }

  return null;
};


const removeToken=()=>{
  document.cookie = 'token=; max-age=0; path=/';

}

const setUser=(user)=>{
  const maxAge =1* 60 * 60;
  document.cookie = `user=${user}; max-age=${maxAge}; path=/`;
}

const getUser=()=>{
  const user= document.cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1];
  if(user) return user;
  return null;
}

const removeUser=()=>{
  document.cookie = 'user=; max-age=0; path=/';  
}

const getServerCookie = (rawCookies) => {
  const cookies = {};
  if (rawCookies) {
    rawCookies.split(';').forEach(cookie => {
      const [key, ...valParts] = cookie.split('=');
      const value = valParts.join('='); // برای مقادیری که داخلشان = دارند
      cookies[key.trim()] = decodeURIComponent(value?.trim());
    });
  }
  return Object.keys(cookies).length > 0 ? cookies : null;
};



export {setToken,getToken,removeToken,setUser,getUser,removeUser,getServerCookie}