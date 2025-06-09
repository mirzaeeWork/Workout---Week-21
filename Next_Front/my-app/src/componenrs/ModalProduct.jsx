import styles from './ModalProduct.module.css'
import InputField from './InputField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAddProduct, useEditProduct } from '../hook/mutation'
import Message from './Message'
import { useQueryClient } from '@tanstack/react-query'
import { schemaProduct, Set_GetErrOrSuccMessage } from '../helper/helper'
import { IoClose } from 'react-icons/io5'
import { useFilter } from '@/context/FilterContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function ModalProduct ({ handleProduct = {}, handleCancle, btnText, mode }) {
  const queryClient = useQueryClient()
  const { setDefaultData, setErrOrSuccMessage } = useFilter()
  const router = useRouter()

  const { id, name, price, quantity } = handleProduct

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: id || '',
      name: name || '',
      price: price || '',
      quantity: quantity || ''
    },
    resolver: yupResolver(schemaProduct),
    mode: 'onBlur'
  })

  const functionUse = mode === 'edit' ? useEditProduct : useAddProduct

  const { mutate, isPending, isSuccess, isError, error } = functionUse()


  const onSubmit = data => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        handleCancle()
        setDefaultData(null)
        router.push(
          {
            pathname: router.pathname,
            query: { ...router.query }
          },
          undefined,
          { shallow: true }
        )
        Set_GetErrOrSuccMessage({
          isSuccess: true,
          isError: false,
          error: null,
          successMessage:
            mode === 'edit' ? ' ویرایش محصول انجام شد' : 'ثبت محصول انجام شد',
          setErrOrSuccMessage
        })
      },
      onError: err => {
        console.log(err)
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
      {!isSuccess && (
        <div className={styles.modal}>
          <div className={styles.bgModal} onClick={handleCancle} />
          <form
            className={styles.modalContent}
            onSubmit={handleSubmit(onSubmit)}
          >
            <button
              type='button'
              onClick={handleCancle}
              className={styles.closeButton}
            >
              <IoClose style={{ fontSize: '20px' }} />
            </button>

            <InputField
              register={register}
              name='name'
              placeholder='نام محصول'
              error={errors.name}
            />

            <InputField
              register={register}
              type='number'
              name='price'
              placeholder='قیمت'
              error={errors.price}
            />

            <InputField
              register={register}
              name='quantity'
              type='number'
              placeholder='تعداد'
              error={errors.quantity}
            />

            <div>
              <button className={styles.buttonDelete} type='submit'>
                {isPending ? 'در حال ارسال...' : btnText}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default ModalProduct
