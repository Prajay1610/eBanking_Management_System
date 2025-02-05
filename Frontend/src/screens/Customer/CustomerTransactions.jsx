import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import { getAllTransactions } from "../../services/customerService";

const ViewCustomerTransactions = () => {
  const location = useLocation();
  const customer = location.state;
  const [allTransactions, setAllTransactions] = useState([]);
  const {customerId} = useParams();
  const retrieveAllTransactions = async () => {
    try {
<<<<<<< HEAD
      const response = await getAllTransactions(100000);
      console.log("All transaction of account", response);
=======
      const response = await getAllTransactions(customerId);
      console.log("response", response);
>>>>>>> a694b040c569e9fb81337144575bd6169abbd05d
      
        return response; 
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to fetch transactions. Please try again.");
      return null;
    }
  };

  // Fetch transactions when the component mounts
  useEffect(() => {
    const getAllTransactions = async (customerId) => {
      const transactions = await retrieveAllTransactions(customerId);
      if (transactions) {
        setAllTransactions(transactions || []);
      }
    };
    getAllTransactions(customerId);
  }, []);

  // Function to format epoch time to a readable date
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

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "white", minHeight: "100vh", padding: "20px" }}>
        <div className="mt-2">
          <div
            className="card form-card ms-5 me-5 mb-5 border-color"
            style={{
              height: "45rem",
              backgroundColor: "white",
              border: "1px solid rgb(78, 63, 192)",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="card-header text-center"
              style={{
                backgroundColor: "#544892",
                color: "white",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                padding: "15px",
              }}
            >
              <h2>Customer Transactions</h2>
            </div>
            <div
              className="card-body"
              style={{
                overflowY: "auto",
              }}
            >
              <div className="table-responsive mt-3">
                <table
                  className="table table-hover text-center"
                  style={{
                    backgroundColor: "white",
                    color: "#493D9E",
                  }}
                >
                  <thead
                    className="table-bordered"
                    style={{
                      backgroundColor: "#544892",
                      color: "white",
                    }}
                  >
                    <tr>
                      <th scope="col">Transaction Id</th>
                      <th scope="col">Source Bank</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Source Account</th>
                      <th scope="col">Transaction Type</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Recipient Bank</th>
                      <th scope="col">Recipient Account</th>
                      <th scope="col">Narration</th>
                      <th scope="col">Transaction Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTransactions.length > 0 ? (
                      allTransactions.map((transaction) => (
                        <tr
                          key={transaction.transactionId}
                          style={{
                            borderBottom: "1px solid rgb(147, 130, 242)",
                          }}
                        >
                          <td>
                            <b>{transaction.transactionId}</b>
                          </td>
                          <td>
                            <b>{transaction.bank.name}</b>
                          </td>
                          <td>
                            <b>{transaction.user.name}</b>
                          </td>
                          <td>
                            <b>{transaction.bankAccount.number}</b>
                          </td>
                          <td>
                            <b>{transaction.type}</b>
                          </td>
                          <td>
                            <b>{transaction.amount}</b>
                          </td>
                          <td>
                            {transaction.destinationBankAccount ? (
                              <b>{transaction.destinationBankAccount.number}</b>
                            ) : (
                              <b>---</b>
                            )}
                          </td>
                          <td>
                            {transaction.destinationBank ? (
                              <b>{transaction.destinationBank.name}</b>
                            ) : (
                              <b>---</b>
                            )}
                          </td>
                          <td>
                            <b>{transaction.narration}</b>
                          </td>
                          <td>
                            <b>{formatDateFromEpoch(transaction.transactionTime)}</b>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10">No transactions available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ViewCustomerTransactions;