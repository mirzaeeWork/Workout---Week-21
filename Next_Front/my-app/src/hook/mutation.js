import { useMutation } from "@tanstack/react-query";
import {  useAxiosWithRedirect } from "../services/config";

export const useGetAuthorizeUser = () => {
  const api = useAxiosWithRedirect();

  const getAuthorizeUser = async ({ action }) => {
    const res = await api.get(`/auth?action=${action}`);
    return res.data;
  };

  return useMutation({
    mutationFn: getAuthorizeUser,
  });
};


export const useAddUser = () => {
  const api = useAxiosWithRedirect();
  const createUser = async (formData) => {
    const res = await api.post("/auth/register",formData);
    return res.data;
  };
  
  return useMutation({
    mutationFn: createUser,
  });
};

export const useLoginUser = () => {
  const api = useAxiosWithRedirect();
  const loginUser = async (formData) => {
    return await api.post("/auth/login",formData);
  };

  return useMutation({
    mutationFn: loginUser,
  });
};

export const useAddProduct = () => {
  const api = useAxiosWithRedirect();
  const addProduct = async (formData) => {
    return await api.post(`/products`,formData);
  };

  return useMutation({
    mutationFn: addProduct,
  });
};



export const useEditProduct = () => {
  const api = useAxiosWithRedirect();
  const editProduct = async (formData) => {
    return await api.put(`/products/${formData.id}`,formData);
  };

  return useMutation({
    mutationFn: editProduct,
  });
};

export const useDeleteProduct = () => {
  const api = useAxiosWithRedirect();
  const deleteProduct = async (id) => {
    return await api.delete(`/products/${id}`);
  };

  return useMutation({
    mutationFn: deleteProduct,
  });
};


