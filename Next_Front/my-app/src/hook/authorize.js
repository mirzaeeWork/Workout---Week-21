import React, { useState } from 'react'
import { useFilter } from '@/context/FilterContext'
import ModalProduct from '@/componenrs/ModalProduct'
import Modal from '@/componenrs/Modal'
import { useGetAuthorizeUser } from './mutation'
import { handleCancleDelete, handleBackUpdateProduct } from '@/helper/helper'

function Authorize ({
  user,
  action = '',
  children,
  uiState = {},
  setUiState,
  handleDelete
}) {
  const [error, setError] = useState('')
  const [showJSX, setShowJSX] = useState('')
  const { openModalProduct, setOpenModalProduct, openModal, setOpenModal } =
    useFilter()

  const { mutate } = useGetAuthorizeUser()

  const clickHandler = onAuthorized => {
    setShowJSX(action)
    if (!!user) {
      mutate(
        { action },
        {
          onSuccess: () => {
            if (action === 'create') {
              setOpenModalProduct(true)
            } else if (typeof onAuthorized === 'function') {
              onAuthorized()
            }
          },
          onError: () => {
            const actionType =
              action === 'create'
                ? 'ایجاد محصول'
                : action === 'update'
                ? 'ویرایش محصول'
                : action === 'delete'
                ? 'حذف محصول'
                : 'عملیات'
            setError(`شما اجازه ${actionType} را ندارید`)
            setOpenModal(true)
          }
        }
      )
    } else {
      setError('لطفاً ابتدا وارد حساب کاربری خود شوید')
      setOpenModal(true)
    }
  }

  if (action === 'create') {
    return (
      <>
        {typeof children === 'function' ? children({ clickHandler }) : null}
        {action === showJSX && (
          <>
            {openModalProduct && (
              <ModalProduct
                handleCancle={() => setOpenModalProduct(false)}
                btnText='ثبت'
                mode='add'
              />
            )}

            {openModal && (
              <Modal
                handleCancle={() => setOpenModal(false)}
                header='پیام'
                mainMessage={error}
              />
            )}
          </>
        )}
      </>
    )
  }

  if (action === 'update' || action === 'delete') {
    return (
      <>
        {typeof children === 'function' ? children({ clickHandler }) : null}
        {action === showJSX && (
          <>
            {uiState.openConfirmModal && (
              <Modal
                handleDelete={handleDelete}
                handleCancle={() => handleCancleDelete(setUiState)}
                اheader='حذف محصول'
                mainMessage='آیا از حذف این محصول مطمئنید؟'
                mode='delete'
                btnTextDelete='حذف'
                btnTextCancle='لغو'
              />
            )}

            {uiState.openProductModal && (
              <ModalProduct
                handleProduct={uiState.infoProduct}
                handleCancle={() => handleBackUpdateProduct(setUiState)}
                btnText='ویرایش'
                mode='edit'
              />
            )}

            {openModal && (
              <Modal
                handleCancle={() => setOpenModal(false)}
                header='پیام'
                mainMessage={error}
              />
            )}
          </>
        )}
      </>
    )
  }

  return <></>
}

export default Authorize
