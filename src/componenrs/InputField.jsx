import styles from "./InputField.module.css";

function InputField({ name, placeholder, error, register, type = "text" }) {

  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        name={name}
        {...register(name)}
        placeholder={placeholder}
        className={styles.input}
        inputMode={name === "mobile" ? "numeric" : null}
        maxLength={name === "mobile" ? 11 :null}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
}

export default InputField;
