import styles from "./ProductsTable.module.css";
import ProductRow from "./ProductRow";
import { useState } from "react";
import {
  handleBackUpdateProduct,
  handleCancleDelete,
  handleDeleteProduct,
  handleEditProduct,
} from "../helper/helper";
import ModalProduct from "./ModalProduct";
import Modal from "./Modal";
import { useDeleteProduct } from "../hook/mutation";
import { useQueryClient } from "@tanstack/react-query";
import Message from "./Message";

function ProductsTable({ products }) {
  const queryClient = useQueryClient();

  const [uiState, setUiState] = useState({
    openConfirmModal: false,
    openProductModal: false,
    infoProduct: null,
  });

  const { mutate, isSuccess, isError, error } = useDeleteProduct();

  const handleDelete = async () => {
    mutate(
      uiState.infoProduct,
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["products"] });
          handleCancleDelete(setUiState);
        },
        onError: (err) => {
          // console.log(err);
          handleCancleDelete(setUiState);
        },
      }
    );
  };

  return (
    <>
      {isError && (
        <Message
          error={error?.response?.data?.message || "خطایی رخ داده است"}
        />
      )}
      {isSuccess && (
        <Message
          text="حذف محصول انجام شد"
        />
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th} style={{ cursor: "pointer" }}>
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
              onEdit={() => handleEditProduct(setUiState, product)}
              onDelete={() => handleDeleteProduct(setUiState, product.id)}
            />
          ))}
        </tbody>
      </table>

      {uiState.openConfirmModal && (
        <Modal
          handleDelete={handleDelete}
          handleCancle={() => handleCancleDelete(setUiState)}
          اheader="حذف محصول"
          mainMessage="آیا از حذف این محصول مطمئنید؟"
        />
      )}

      {uiState.openProductModal && (
        <ModalProduct
          handleProduct={uiState.infoProduct}
          handleCancle={() => handleBackUpdateProduct(setUiState)}
          btnText="ویرایش"
          mode="edit"
        />
      )}
    </>
  );
}

export default ProductsTable;
