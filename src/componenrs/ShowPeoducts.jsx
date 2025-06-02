import { useFilter } from '../context/FilterContext'
import { useGetUsers } from '../hook/queries'
import Message from './Message'
import Loading from './Loading'
import ProductsTable from './ProductsTable'
import Pagination from './Pegination'

function ShowPeoducts () {
  const { name, defaultData, priceRange, perPage} = useFilter()

  if (defaultData) {
    return (
      <div>
          <ProductsTable products={defaultData?.data} />
          <Pagination totalPages={defaultData?.totalPages} />
      </div>
    )
  }

  const { data, isError, error,isFetching } = useGetUsers({
    page: perPage,
    name,
    minPrice: priceRange[0],
    maxPrice: priceRange[1]
  })

  return (
    <>    
      {isFetching && <Loading />}
      {isError && <Message error={error?.response?.data?.message} />}
      {!isFetching && !isError && (
        <>
          <ProductsTable products={data?.data} />
          <Pagination totalPages={data?.totalPages} />
        </>
      )}
    </>
  )
}

export default ShowPeoducts
