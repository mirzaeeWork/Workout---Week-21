import styles from './Loading.module.css';

function Loading() {
  return (
    <div className={`${styles.loading} container`}>
      <h1>loading ...</h1>
    </div>
  );
}

export default Loading;
