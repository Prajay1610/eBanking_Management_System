import axios from "axios";
import { createUrl } from "../utils";
import { toast } from "react-toastify";

export const getAllBankAccounts = async (managerId) => {
    const url = createUrl(`bankAccount/all/${managerId}`);
    try {
        const response = await axios.get(url);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        toast.error("Error while retrieving bank accounts:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};


export const getBankAccountDetails = async (accountId) => {
    const url = createUrl(`bankAccount/${accountId}`);
    try {
        const response = await axios.get(url);
        console.log("response", response.data);
        
        return response.data;
    } catch (error) {
        toast.error("Error while retrieving bank account details:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}

export const depositFunds=async(reqbody)=>{
    const url = createUrl(`transaction/deposit`);
    try {
        const response = await axios.post(url,reqbody);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        
        throw error; 
        
    }
}
export const withdrawFunds=async(reqbody)=>{
    const url = createUrl(`transaction/withdraw`);
    try {
        const response = await axios.post(url,reqbody);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}


export const viewAllBankCustomers=async(bankManagerId)=>{
    const url = createUrl(`bank/allCustomers/${bankManagerId}`);
    try {
        const response = await axios.get(url);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}
export const makeInActive=async(userId)=>{
    
    const url = createUrl(`bank/customer/makeInActive/${userId}`);
    try {
        const response = await axios.put(url);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}

export const makeActive=async(userId)=>{
    
    const url = createUrl(`bank/customer/makeActive/${userId}`);
    try {
        const response = await axios.put(url);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}


export const lockAccount=async(accountId)=>{
    
    const url = createUrl(`bankAccount/lockAccount/${accountId}`);
    try {
        const response = await axios.put(url);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}


export const unlockAccount=async(accountId)=>{
    
    const url = createUrl(`bankAccount/unlockAccount/${accountId}`);
    try {
        const response = await axios.put(url);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}