import Header from '@/componenrs/Header'
import Message from '@/componenrs/Message'
import PriceSlider from '@/componenrs/PriceSlider'
import ShowPeoducts from '@/componenrs/ShowPeoducts'
import { useFilter } from '@/context/FilterContext'
import { getServerCookie } from '@/helper/cookie'
import Authorize from '@/hook/authorize'
import axios from 'axios'
import { useEffect } from 'react'
import { FaProductHunt } from 'react-icons/fa'

export default function Home ({ user, defaultData }) {
  const { setDefaultData, setUser, errOrSuccMessage } = useFilter()

  useEffect(() => {
    setDefaultData(defaultData)
    setUser(user)
  }, [defaultData])

  return (
    <>
      <Message />
      <Header user={user} />
      <Authorize user={user} action='create'>
        {({ clickHandler }) => (
          <button onClick={clickHandler} style={{ marginBottom: '3rem' }}>
            <FaProductHunt style={{ marginLeft: '10px' }} />
            <span> افزودن محصول </span>
          </button>
        )}
      </Authorize>

      <section
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ width: '17%' }}>
          <PriceSlider />
        </div>
        <div style={{ width: '80%' }}>
          <ShowPeoducts />
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps (context) {
  const { req, query } = context
  const rawCookies = req.headers.cookie

  const cookies = getServerCookie(rawCookies)

  const user = cookies?.user || null
  const page = query.page || 1
  const name = query.name || ''
  const minPrice = query.minPrice || 1
  const maxPrice = query.maxPrice || 5000
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?page=${page}&limit=15&name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    )

    return {
      props: {
        user,
        defaultData: res.data
      }
    }
  } catch (error) {
    return {
      props: {
        user,
        defaultData: {}
      }
    }
  }
}
