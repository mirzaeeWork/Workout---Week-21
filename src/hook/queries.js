import { useQuery } from "@tanstack/react-query";
import { useAxiosWithRedirect } from "../services/config";
import { useRouter } from "next/router";

const useGetUsers = ({
  limit = 10,
  page=1,
  name = "",
  minPrice = null,
  maxPrice = null,
} = {}) => {
  const api = useAxiosWithRedirect();
  const getUsers = async () => {
    return await api.get(
      `/products?page=${page}&limit=${limit}&name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };

  return useQuery({
    queryKey: ["products", page, limit, name, minPrice, maxPrice],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
  });
};

export { useGetUsers };
