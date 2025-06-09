import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAxiosWithRedirect } from "../services/config";



const useGetUsers = ({
  limit = 5,
  page=1,
  name = "",
  minPrice = null,
  maxPrice = null,
} = {}) => {
  const api = useAxiosWithRedirect();
  const getUsers = async () => {
    // console.log(page, limit, name, minPrice, maxPrice);
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

const useInfiniteProducts = ({
  name = "",
  minPrice = null,
  maxPrice = null,
  limit = 15,
}) => {
  const api = useAxiosWithRedirect();

  const getUsers = async ({ pageParam = 1 }) => {
    // console.log(page, limit, name, minPrice, maxPrice);
    return await api.get(
      `/products?page=${pageParam}&limit=${limit}&name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };


  return useInfiniteQuery({
    queryKey: ["products", name, minPrice, maxPrice],
    queryFn: getUsers,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      } else {
        return undefined;
      }
    },
    refetchOnWindowFocus: false,
  });
};

export { useGetUsers ,useInfiniteProducts,useGetAuthorizeUser };
