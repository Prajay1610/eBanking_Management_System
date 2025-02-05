import React, { useEffect, useState } from "react";

import Footer from "../../components/layouts/Footer/Footer";
import { Link, useParams } from "react-router-dom"; // Import Link from react-router-dom
import Header from "../../components/layouts/Header/Header";
import { getAllSpecificAccountTransactions, getAllTransactions, getCustomerAccountData, getCustomerData } from "../../services/customerService";
import { getBankAccountDetails } from "../../services/bankManagerService";
import { toast } from "react-toastify";

const ViewSpecificAccountDetails = () => {
  // Sample data for transactions
  const { customerId ,accountId} = useParams(); // Get IDs from URL
  const [customerData, setCustomerData] = useState({}); // State for customer data
  const [accountsData, setAccountsData] = useState({}); // State for customer data
  const [loading, setLoading] = useState(true); // State for loading
  const [allTransactions, setAllTransactions] = useState([]);

  const fetchCustomerData = async () => {
   
    try {
      console.log("i am in cust data");
      const data = await getCustomerData(customerId);
      
      setCustomerData(data); // Store fetched data
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false); // Stop loading once done
    }
  };


  useEffect(() => {
    fetchCustomerData();
  }, []);


  const fetchAccountData = async () => {
    try {

      
      const data = await getBankAccountDetails(accountId);
    
     
      if (data) {
        setAccountsData(data || []); // Always keep last 3 transactions
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false); // Stop loading once done
    }
  };
  useEffect(() => {

    fetchAccountData();
  }, [customerId]);


  const retrieveAllTransactions = async () => {
      try {
        const response = await getAllSpecificAccountTransactions(accountId);
        console.log("response", response);
        
          return response; 
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to fetch transactions. Please try again.");
        return null;
      }
    };

  useEffect(() => {
    const getAllTransactions = async (customerId) => {
      const transactions = await retrieveAllTransactions(customerId);
      if (transactions) {
        setAllTransactions(transactions || []);
      }
    };
    getAllTransactions(customerId);
  }, []);

 

  const accounts = [
    { type: "Savings" },
    //{ type: "Current" },
  ];
  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2); // Get last 2 digits of the year
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? String(hours).padStart(2, '0') : '12'; // The hour '0' should be '12' in 12-hour format
    
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    
    return formattedDate;
  };
  const formatDateFromEpochForCreatedOn = (epochTime) => {
    const date = new Date(epochTime);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2); // Get last 2 digits of the year
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? String(hours).padStart(2, '0') : '12'; // The hour '0' should be '12' in 12-hour format
    
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    
    return formattedDate;
  };
  
  
  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-lg">
              <div
                className="card-header text-white"
                style={{ backgroundColor: "#534891" }}
              >
                <h4 className="mb-0">Account Details</h4>
              </div>
              <div className="card-body">
                {/* Customer Overview */}

                {/* Banking Information and Nominee Details */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <br />

                    <ul className="list-group list-group-flush">
                      <br />
                      <li className="list-group-item">
                        <i>
                          <b>Personal Details:</b>
                        </i>
                      </li>
                      <li className="list-group-item">
                        <strong>Customer Name : </strong>{customerData.name}
                      </li>
                      <li className="list-group-item">
                        <strong>Customer Email :</strong> {customerData.email}
                      </li>
                      <li className="list-group-item">
                        <strong>Gender :</strong> {customerData.gender}
                      </li>
                      <li className="list-group-item">
                        <strong>Phone No :</strong> {customerData.contactNo}
                      </li>
                      <li className="list-group-item">
                        <strong>Address : </strong>{customerData.address}
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6" text-center>
                    <br />

                    <ul className="list-group list-group-flush">
                      <br />
                      <li className="list-group-item">
                        <i>
                          <b>Account Details:</b>
                        </i>
                      </li>
                      <li className="list-group-item">
                        <strong>Bank Name : </strong> {accountsData.bankName}
                      </li>
                      <li className="list-group-item">
                        <strong>Ifsc code : </strong> {accountsData.ifscCode}
                      </li>

                      <li className="list-group-item">
                        <strong>Account No : </strong> {accountsData.accountId}
                      </li>

                      <li className="list-group-item">
                        <strong>Balance : </strong> {accountsData.balance}
                      </li>

                      <li className="list-group-item">
                        <strong>Account Type : </strong> {accountsData.accountType}
                      </li>

                      <li className="list-group-item">
                        <strong>Status : </strong> {accountsData.status}
                      </li>

                      <li className="list-group-item">
                        <strong>Created On : </strong>   {formatDateFromEpochForCreatedOn(accountsData.createdOn)}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Recent Transactions */}
                <h6>Recent Transactions</h6>
                <div className="table-responsive">
                  <table
                    className="table table-striped table-hover"
                    style={{ backgroundColor: "#9d96e0" }}
                  >
                    <thead className="table-primary">
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTransactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{formatDateFromEpoch(transaction.transactionTime)}</td>
                          <td>{transaction.narration}</td>
                          <td
                            className={
                              transaction.type === "CREDIT" || "DEPOSIT"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {transaction.amount}
                          </td>
                          <td>{transaction.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default ViewSpecificAccountDetails;
