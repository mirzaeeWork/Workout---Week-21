import styles from './ProductsTable.module.css'
import ProductRow from './ProductRow'
import { useState } from 'react'
import {
  handleCancleDelete,
  handleDeleteProduct,
  handleEditProduct,
  Set_GetErrOrSuccMessage
} from '../helper/helper'
import { useDeleteProduct } from '../hook/mutation'
import { useQueryClient } from '@tanstack/react-query'
import Message from './Message'
import { useFilter } from '@/context/FilterContext'

function ProductsTable ({ products }) {
  const { setOpenModal,user,setDefaultData,setErrOrSuccMessage } = useFilter()


  const queryClient = useQueryClient()

  const [uiState, setUiState] = useState({
    openConfirmModal: false,
    openProductModal: false,
    infoProduct: null
  })

  const { mutate, isSuccess, isError, error } = useDeleteProduct()

  const handleDelete = async () => {
    mutate(uiState.infoProduct, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        handleCancleDelete(setUiState)
        setDefaultData(null)
        Set_GetErrOrSuccMessage({
          isSuccess: true,
          isError: false,
          error: null,
          successMessage:'حذف محصول انجام شد',
          setErrOrSuccMessage
        })
      },
      onError: err => {
        // console.log(err);
        handleCancleDelete(setUiState)
        Set_GetErrOrSuccMessage({
          isSuccess: false,
          isError: true,
          error: err,
          successMessage: '',
          setErrOrSuccMessage
        })
      }
    })
  }

  return (
    <>


      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th} style={{ cursor: 'pointer' }}>
              نام محصول
            </th>
            <th className={styles.th}>قیمت</th>
            <th className={styles.th}>تعداد</th>
            <th className={styles.th}>عملیات</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((product, index) => (
            <ProductRow
              key={index}
              product={product}
              onEdit={() =>
                handleEditProduct(setOpenModal, setUiState, product)
              }
              onDelete={() =>
                handleDeleteProduct(setOpenModal, setUiState, product.id)
              }
              user={user}
              uiState={uiState}
              setUiState={setUiState}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      {/* {uiState.openConfirmModal && (
        <Modal
          handleDelete={handleDelete}
          handleCancle={() => handleCancleDelete(setUiState)}
          اheader='حذف محصول'
          mainMessage='آیا از حذف این محصول مطمئنید؟'
          mode='delete'
          btnTextDelete='حذف'
          btnTextCancle='لغو'
        />
      )} */}

      {/* {uiState.openProductModal && (
        <ModalProduct
          handleProduct={uiState.infoProduct}
          handleCancle={() => handleBackUpdateProduct(setUiState)}
          btnText='ویرایش'
          mode='edit'
        />
      )} */}

      {/* {openModal && (
        <Modal
          handleCancle={() => setOpenModal(false)}
          header='پیام'
          mainMessage='وارد حساب کاربری شوید'
        />
      )} */}
    </>
  )
}

export default ProductsTable
