import { VscEdit } from "react-icons/vsc";
import styles from "./ProductsTable.module.css";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import Authorize from "@/hook/authorize";

function ProductRow({ product,onEdit,onDelete,user,uiState,setUiState,handleDelete }) {

  return (
    
    <tr className={styles.tr}>
      <td className={styles.td}>{product?.name}</td>
      <td className={styles.td}>{product?.price}</td>
      <td className={styles.td}>{product?.quantity}</td>

      <td className={`${styles.td} ${styles.tdActions}`}>
        <Authorize user={user} action="update" uiState={uiState} setUiState={setUiState}>
           {({ clickHandler }) => (
            <button onClick={() => clickHandler(onEdit)} className={styles.buttonCrud}>
              <VscEdit className={styles.buttonEdit} /> 
            </button>
          )}
        </Authorize>
        <Authorize user={user} action="delete" uiState={uiState} setUiState={setUiState} handleDelete={handleDelete}>
          {({ clickHandler }) => (
            <button onClick={() => clickHandler(onDelete)} className={styles.buttonCrud}>
              <MdDeleteOutline className={styles.buttonDelete} />
            </button>
          )}
        </Authorize>
      </td>
    </tr>
  );
}

export default ProductRow;
