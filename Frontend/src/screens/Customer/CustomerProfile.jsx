import React, { useEffect, useState } from "react";

import Footer from "../../components/layouts/Footer/Footer";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import Link from react-router-dom
import Header from "../../components/layouts/Header/Header";
import { getAllTransactions, getCustomerAccountData, getCustomerData } from "../../services/customerService";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";


const CustomerProfile = () => {
  let navigate = useNavigate();

  const { customerId } = useParams(); // Get IDs from URL
  const [customerData, setCustomerData] = useState(null); // State for customer data
  const [accountsData, setAccountsData] = useState([]); // State for customer data
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await getCustomerData(customerId);
        console.log(data)
        setCustomerData(data); // Store fetched data
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

  
    fetchCustomerData();
  }, [customerId]);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const data = await getCustomerAccountData(customerId);
        console.log("data"+data)
       
        if (data) {
          setAccountsData(data || []); // Always keep last 3 transactions
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

  
    fetchAccountData();
  }, [customerId]);

  const viewAccountSpecificDetails = (customerId,accountId) => {
    navigate(`/ViewSpecificAccountDetails/${customerId}/${accountId}`);

  };


const accounts = [
    { type: "Savings" },
    //{ type: "Current" },
  ];
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

   const [allTransactions, setAllTransactions] = useState([]);
    
    const retrieveAllTransactions = async () => {
      try {
        const response = await getAllTransactions(customerId);
        console.log("response", response);
        
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
          setAllTransactions(transactions.slice(-3) || []); // Always keep last 3 transactions
        }
      };
      getAllTransactions(customerId);
    }, []);
  
  const viewTransactions = (customerId) => {
    navigate(`/transactions/${customerId}`);

  };

  if (loading) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  if (!customerData) {
    return <div>Error loading customer data.</div>; // Handle error case
  }



  
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
                <h4 className="mb-0">Customer Profile</h4>
              </div>
              <div className="card-body">
                {/* Customer Overview */}
                <div className="text-center mb-4">
                  <img
                    src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-businessman-in-formal-suit-thinking-png-image_9194103.png"
                    alt="Customer Avatar"
                    className="rounded-circle img-thumbnail"
                    width="150"
                  />
                  <h5 className="mt-3">{customerData.name}</h5>
                  <p className="text-muted">{customerData.email}</p>
                </div>

                {/* Banking Information and Nominee Details */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6>Personal Details</h6>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Gender:</strong> {customerData.gender}
                      </li>

                      <li className="list-group-item">
                        <strong>Last Login:</strong> 14-Dec-2024
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h6>Contact Details</h6>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Address :</strong> {customerData.address}
                      </li>
                      <li className="list-group-item">
                        <strong>Contact No:</strong> {customerData.contactNo}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* View Accounts Section */}
                <br></br>
                <h6>Your Accounts</h6>
                <div className="table-responsive mb-4">
                  <table
                    className="table table-striped table-hover"
                    style={{ backgroundColor: "#9d96e0" }}
                  >
                    <thead className="table-primary">
                      <tr>
                        <th>Account No.</th>
                        <th>Bank Name</th>
                        <th>Account Type</th>
                        <th>Actions</th>
                        <th>Statement</th>

                      </tr>
                    </thead>
                    <tbody>
                    {accountsData.length > 0 ? (
        accountsData.map((account, index) => (
    <tr key={index}>
      <td>{account.accountId}</td>
      <td>{account.bankName}</td>
      <td>{account.accountType}</td>
      <td>
        <button
         onClick={() =>viewAccountSpecificDetails(customerId,account.accountId)}
          className="btn btn-secondary"
          style={{ backgroundColor: "#413C69" }}
        >
          View Details
        </button>
      </td>
      <td><button className="btn btn-secondary"
          style={{ backgroundColor: "#413C69" }}>Print Statement</button></td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="4">No ACCOUNTS available.</td>
  </tr>
)}

                    </tbody>
                  </table>
                </div>

                {/* Recent Transactions */}
                <h6>Recent Transactions</h6>
                <div className="table-responsive">
                  <table
                    className="table table-striped table-hover"
                    style={{ backgroundColor: "#D6D0F2" }}
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
                      {}
                      {allTransactions.map((transaction, index) => (
                        <tr key={index}>
                          <td> <b>{formatDateFromEpoch(transaction.transactionTime)}</b></td>
                          <td>{transaction.narration}</td>
                          <td className={transaction.type === "CREDIT" ? "text-success" : "text-danger"}>
                            {transaction.amount}
                          </td>
                          <td>{transaction.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Buttons with Link for Navigation */}
                <div className="text-center mt-4">
                  <Link
                    to="/edit-profile"
                    className="btn btn-primary mx-2"
                    style={{ backgroundColor: "#8533ff" }}
                  >
                    Edit Profile
                  </Link>
                  <button
                            //onClick={() => viewAccountDetails(customer)}
                            className="btn btn-sm btn-primary mx-2"
                            style={{ backgroundColor: "#544892", border: "none" }}
                            onClick={() => viewTransactions(customerId)}
                          >
                           
                           View Transactions
                  
                          </button>

                  
                  <Link to="/logout" className="btn btn-danger mx-2">
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerProfile;
