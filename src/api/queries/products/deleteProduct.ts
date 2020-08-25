import axios from "../../../core/axios";

const deleteProductRequest = async (id: number): Promise<void> => {
  await axios.delete(`products/${id}`);
};

export default deleteProductRequest;
