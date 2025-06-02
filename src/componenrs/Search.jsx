import styles from './Search.module.css'
import { IoSearch } from 'react-icons/io5'
import { useFilter } from '../context/FilterContext'
import { useRouter } from 'next/router'

function Search () {
  const { name, setName, setPerPage, setDefaultData } = useFilter()
  const router = useRouter()

  const changeHandler = e => {
    const value = e.target.value
    setName(value)
    setPerPage(1)
    setDefaultData(null)

    // به‌روزرسانی URL بدون رفرش شدن صفحه
    const newQuery = { ...router.query, page: 1 }

    if (value) {
      newQuery.name = value
    } else {
      delete newQuery.name
    }

    router.push(
      {
        pathname: router.pathname,
        query: newQuery
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <div className={styles.search}>
      <span>
        <IoSearch />
      </span>

      <input
        type='text'
        placeholder='جستجوی کالا'
        value={name}
        onInput={changeHandler}
      />
    </div>
  )
}

export default Search
