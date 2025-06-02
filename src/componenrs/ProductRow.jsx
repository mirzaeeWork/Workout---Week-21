import { VscEdit } from "react-icons/vsc";
import styles from "./ProductsTable.module.css";
import { MdDelete, MdDeleteOutline } from "react-icons/md";

function UserRow({ product,onEdit,onDelete }) {



  return (
    
    <tr className={styles.tr}>
      <td className={styles.td}>{product.name}</td>
      <td className={styles.td}>{product.price}</td>
      <td className={styles.td}>{product.quantity}</td>

      <td className={`${styles.td} ${styles.tdActions}`}>
        <button onClick={onEdit} className={styles.buttonCrud}>
          <VscEdit className={styles.buttonEdit} />
        </button>

        <button className={styles.buttonCrud} onClick={onDelete}>
          <MdDeleteOutline className={styles.buttonDelete} />
        </button>
      </td>
    </tr>
  );
}

export default UserRow;
