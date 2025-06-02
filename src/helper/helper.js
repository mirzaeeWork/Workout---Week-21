import * as yup from "yup";

 const schemaSignup = yup.object().shape({
  username: yup
    .string()
    .required("نام کاربری الزامی است")
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),

  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),

  confirmPassword: yup
    .string()
    .required("تکرار رمز عبور الزامی است")
    .oneOf([yup.ref("password")], "رمز عبور و تکرار آن یکسان نیستند"),
});

const schemaLogin = yup.object().shape({
  username: yup.string().required("نام کاربری الزامی است"),
  password: yup.string().required("رمز عبور الزامی است"),
});

const schemaProduct = yup.object().shape({
  name: yup.string().required("نام محصول الزامی است"),
  price: yup
    .number()
    .typeError("قیمت باید عدد باشد")
    .required("قیمت الزامی است")
    .positive("قیمت باید بزرگ‌تر از صفر باشد"),
  quantity: yup
    .number()
    .typeError("تعداد باید عدد باشد")
    .required("تعداد الزامی است")
    .min(0, "تعداد نمی‌تواند منفی باشد"),
});


  const sortData = (sortDirection,setUiState,users=[],setUsers) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    setUiState(prev => ({ ...prev, sortDirection: direction }));

    const sortedUsers = [...users].sort((a, b) => {
      if (a.firstName < b.firstName) return direction === "asc" ? -1 : 1;
      if (a.firstName > b.firstName) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };

  const handleCancleDelete = (setUiState) => {
    setUiState(prev => ({ ...prev,openConfirmModal: false ,infoProduct: null }));
  };

  const handleBackUpdateProduct = (setUiState) => {
    setUiState(prev => ({ ...prev,openProductModal: false ,infoProduct: null }));
  };


  const handleEditProduct = (setUiState,product) => {
    setUiState(prev => ({ ...prev,openProductModal: true ,infoProduct: product }));
  };

  const handleDeleteProduct = (setUiState,productId) => {
    setUiState(prev => ({ ...prev,openConfirmModal: true ,infoProduct: productId }));
  };

  const getSortIcon = (sortDirection) => {
    return sortDirection === "asc" ? "↑" : "↓";
  };


  export { schemaSignup,schemaLogin,schemaProduct,sortData,handleCancleDelete,handleBackUpdateProduct,handleEditProduct,handleDeleteProduct,getSortIcon };