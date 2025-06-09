import AuthForm from "../componenrs/AuthForm";
import { useAddUser } from "../hook/mutation";

function Signup() {
  const { mutate, isPending, isSuccess, isError, error } = useAddUser();

  const handleSignup = (data, onSuccessCallback) => {
    mutate(data, {
      onSuccess: () => {
        onSuccessCallback();
      },
      onError: (err) => {
        // console.log(err);
      },
    });
  };

  return (
    <AuthForm
      mode="signup"
      onSubmitHandler={handleSignup}
      isPending={isPending}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
    />
  );
}

export default Signup;
