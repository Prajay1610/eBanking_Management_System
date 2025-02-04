import { createUrl } from "../utils";
import axios from "axios";

export const getAllTransactions = async (userId) => {
    try {
        const url = createUrl(`customer/transactions?userId=${userId}`);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};

export const addCustomer = async (customer) => {
    try {
        const url = createUrl('api/auth/register');
        const response = await axios.post(url, customer);
        return response.data;
    } catch (error) {
        console.error('Error adding customer:', error);
        throw error;
    }
}


export const addImage = async (userId, file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const url = createUrl(`api/auth/${userId}/upload-profile-image`);
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Ensure the backend response contains a `success` field
      if (!response.data) {
        throw new Error(response.data.message || "Image upload failed.");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  export const transferMoney=async(reqbody)=>{
    try {
        const url = createUrl('transfer');
        const response =await axios.post(url,reqbody);
        return response.data;
    } catch (error) {
        console.error('Error transferring money:', error);
        throw error;
    }
  }