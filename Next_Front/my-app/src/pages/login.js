import AuthForm from '../componenrs/AuthForm'
import { setToken, setUser } from '../helper/cookie'
import { useLoginUser } from '../hook/mutation'

function Login () {
  const { mutate, isPending, isSuccess, isError, error } = useLoginUser()


  const handleLogin = (dataInfo, onSuccessCallback) => {
    mutate(dataInfo, {
      onSuccess: responseData => {
        setToken(responseData.token)
        setUser(responseData.username)
        onSuccessCallback()
      },
      onError: err => {
        console.log(err);
      }
    })
  }

  return (
    <AuthForm
      mode='login'
      onSubmitHandler={handleLogin}
      isPending={isPending}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
    />
  )
}

export default Login
