import Header from '@/componenrs/Header'
import ModalProduct from '@/componenrs/ModalProduct'
import PriceSlider from '@/componenrs/PriceSlider'
import ShowPeoducts from '@/componenrs/ShowPeoducts'
import { useFilter } from '@/context/FilterContext'
import axios from 'axios'
import * as cookie from 'cookie'
import { useEffect, useState } from 'react'
import { FaProductHunt } from 'react-icons/fa'

export default function Home ({ user, defaultData }) {
  const { openModalProduct, setOpenModalProduct,setDefaultData } = useFilter()

  useEffect(() => {
    setDefaultData(defaultData)
  }, [defaultData])

  return (
    <>
      <Header user={user} />
      <button
        onClick={() => setOpenModalProduct(true)}
        style={{ marginBottom: '3rem' }}
      >
        <FaProductHunt style={{ marginLeft: '10px' }} />
        <span> افزودن محصول </span>
      </button>
      <section
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ width: '17%' }}><PriceSlider /></div>
        <div style={{ width: '80%' }}>
          <ShowPeoducts />
        </div>
      </section>

      {openModalProduct && (
        <ModalProduct
          handleCancle={() => setOpenModalProduct(false)}
          btnText='ثبت'
          mode='add'
        />
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, query } = context
  const cookies = cookie.parse(req.headers.cookie || '')
  const user = cookies.user || null
  const page = query.page || 1
  const name =query.name || ""
  const minPrice = query.minPrice || 1
  const maxPrice = query.maxPrice || 5000

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?page=${page}&limit=10&name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  )
  return {
    props: {
      user,
      defaultData: res.data || {}
    }
  }
}
