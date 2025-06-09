import styles from './AuthForm.module.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from './InputField'
import ThemeToggle from './Theme/ThemeToggle'
import { useRouter } from 'next/router'

import Message from './Message'
import { schemaLogin, schemaSignup, Set_GetErrOrSuccMessage } from '../helper/helper'
import Link from 'next/link'
import { useFilter } from '@/context/FilterContext'
import { useEffect } from 'react'

function AuthForm ({
  mode = 'signup',
  onSubmitHandler,
  isPending,
  isError,
  isSuccess,
  error
}) {
  const router = useRouter()
  const {
    name,
    priceRange,
    setErrOrSuccMessage
  } = useFilter()


  const schema = mode === 'signup' ? schemaSignup : schemaLogin

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = data => {
    onSubmitHandler(data, () => {
      if (mode === 'signup') {
        router.replace('/login');
        return;
      }
  
      const query = { page: '1' };
      const [minPrice, maxPrice] = priceRange;
  
      if (name) query.name = name;
      if (minPrice !== 1 || maxPrice !== 5000) {
        query.minPrice = minPrice;
        query.maxPrice = maxPrice;
      }
  
      router.push({ pathname: '/', query });
    })
  }

  useEffect(() => {
    Set_GetErrOrSuccMessage({
      isError,
      isSuccess,
      error,
      successMessage: mode === 'signup' 
        ? 'ثبت‌ نام با موفقیت انجام شد'
        : 'ورود موفقیت‌آمیز بود',
      setErrOrSuccMessage
    });
  }, [isError, isSuccess]);


  return (
    <>


      <div className={styles.modal}>
        <div className={styles.ThemeToggle}>
          <ThemeToggle />
        </div>

        <form className={styles.modalContent} onSubmit={handleSubmit(onSubmit)}>
          <Link href='/' className={styles.logoLink}>
            <img src='/images/LogoMirzaei.png' alt='logo' />
          </Link>

          <InputField
            register={register}
            name='username'
            placeholder='نام کاربری'
            error={errors.username}
          />

          <InputField
            register={register}
            name='password'
            placeholder='رمز عبور'
            type='password'
            error={errors.password}
          />

          {mode === 'signup' && (
            <InputField
              register={register}
              name='confirmPassword'
              placeholder='تکرار رمز عبور'
              type='password'
              error={errors.confirmPassword}
            />
          )}

          <div>
            <button
              className={styles.button}
              type='submit'
              disabled={isPending}
            >
              {isPending
                ? 'در حال ارسال...'
                : mode === 'signup'
                ? 'ثبت‌نام'
                : 'ورود'}
            </button>
          </div>

          <div>
            {mode === 'signup' ? (
              <>
                <span>حساب کاربری دارید؟</span>
                <Link
                  href='/login'
                  style={{
                    padding: '0.5rem',
                    color: 'var(--color-primary-light)'
                  }}
                >
                  ورود
                </Link>
              </>
            ) : (
              <>
                <span>حساب کاربری ندارید؟</span>
                <Link
                  href='/signup'
                  style={{
                    padding: '0.5rem',
                    color: 'var(--color-primary-light)'
                  }}
                >
                  ثبت‌نام
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default AuthForm
