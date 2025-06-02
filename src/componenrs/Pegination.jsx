import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import styles from './ProductsTable.module.css'
import { useFilter } from '../context/FilterContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function Pagination ({ totalPages }) {
  const { perPage: page, setPerPage, setDefaultData } = useFilter()
  const router = useRouter()

  useEffect(() => {
    if (page !== 1) {
      setDefaultData(null)
    }
  }, [page])

  const getPagesToShow = () => {
    const pagesToShow = []

    if (page > 2) pagesToShow.push('...')
    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 0 && i <= totalPages) {
        pagesToShow.push(i)
      }
    }
    if (page < totalPages - 1) pagesToShow.push('...')

    return pagesToShow
  }

  const pagesToShow = getPagesToShow().reverse()

  const routerHandler=(page)=>{
    router.push(
      {
        pathname: router.pathname,
        query:  { ...router.query, page: page }
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <div className={styles.pegination}>
      <button
        className={`${page === totalPages ? styles.btn_disabled : ''}`}
        disabled={page === totalPages}
        style={{ fontSize: '1.5rem', padding: '.15rem .35rem' }}
        onClick={() => {
          setPerPage(prev => prev + 1)
          routerHandler(page + 1)
        }}
      >
        <GrFormNext />
      </button>

      {pagesToShow.map(item => (
        <button
          key={item}
          className={`${item !== page ? styles.btn_pegination : ''}`}
          onClick={() => {
            if (item !== '...') {
              routerHandler(item)
              setPerPage(item)
            }
          }}
        >
          {item}
        </button>
      ))}
      <button
        className={`${page === 1 ? styles.btn_disabled : ''}`}
        disabled={page === 1}
        style={{ fontSize: '1.5rem', padding: '.15rem .35rem' }}
        onClick={() => {
          setPerPage(prev => prev - 1)
          routerHandler(page - 1)
        }}
      >
        <GrFormPrevious />
      </button>
    </div>
  )
}

export default Pagination
