import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const saveRegister = async (data) => {
  let response;

  try {
    response = await axios.post("http://localhost:8081/registration", data);

    toast.success("Dados Salvos !", {
      autoClose: 1000,
    });
  } catch (error) {
    toast.error(error.response.data.message, {
      autoClose: 1000,
    });
    return error;
  }

  return response;
};
