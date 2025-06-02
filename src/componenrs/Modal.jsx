import styles from "./Modal.module.css";

function Modal({ handleDelete, handleCancle, اheader, mainMessage }) {

  
  return (
    <div className={styles.modal}>
      <div className={styles.bgModal} onClick={handleCancle} />

      <div className={styles.modalContent}>
        <h5>{اheader}</h5>
        <p>{mainMessage}</p>
        <div>
          <button
            className={styles.buttonDelete}
            onClick={handleDelete}
          >
            حذف
          </button>
          <button className={styles.butCancle} onClick={handleCancle}>
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
