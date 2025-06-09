import { useFilter } from '../context/FilterContext'
import { useInfiniteProducts } from '../hook/queries'
import Message from './Message'
import Loading from './Loading'
import ProductsTable from './ProductsTable'
import { useCallback, useEffect, useRef, useState } from 'react'

function ShowPeoducts () {
  const {
    name,
    defaultData,
    priceRange,
    setDefaultData
  } = useFilter()

  const observerRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.offsetHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        setDefaultData(null)
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteProducts({
    name,
    minPrice: priceRange[0],
    maxPrice: priceRange[1]
  })

  const lastElementRef = useCallback(
    node => {
      if (isFetchingNextPage) return
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })

      if (node) observerRef.current.observe(node)
    },
    [isFetchingNextPage, hasNextPage]
  )

  const allProducts = data?.pages?.flatMap(page => page.data) || []

  return (
    <div
    >
      {defaultData ? (
        <>
          <ProductsTable products={defaultData.data} />
        </>
      ) : isLoading ? (
        <Loading />
      ) : isError ? (
        <Message error={error?.response?.data?.message} />
      ) : (
        <>
          <ProductsTable products={allProducts} />
          <div ref={lastElementRef} style={{ height: '100px' }} />
          {isFetchingNextPage && <Loading />}
        </>
      )}
    </div>
  )
}

export default ShowPeoducts
