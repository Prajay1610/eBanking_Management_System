import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import { getAllBankAccounts, lockAccount, unlockAccount } from "../../services/bankManagerService";

const ViewAllBankAccounts = () => {
  let navigate = useNavigate();
  const [allAccounts, setAllAccounts] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [tempAccountNumber, setTempAccountNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [managerId,setManagerId] = useState(1);//Change this with the jwt session's bank_manager id
  // Mock data for testing
   const lockAccountVar=async(accountId)=>{
  
      
      const response = await lockAccount(accountId); 
      if(response){
        fetchAllBankAccounts();
  
     
      }
    }

    const unlockAccountVar=async(userId)=>{
  
      
      const response = await unlockAccount(userId); 
      if(response){
      
        fetchAllBankAccounts();
      }
    }

  const fetchAllBankAccounts = async () => {
     try {
          setLoading(true); // Set loading to true while fetching data
          const response = await getAllBankAccounts(managerId); // Pass the JWT token if required by the API
          if (response) {
            console.log("Bank Accounts:", response);
            
            setAllAccounts(response); // Update state with the retrieved data
          }
        } catch (error) {
          console.error("Error fetching bank accounts:", error);
          alert("Failed to load bank accounts. Please try again later.");
        } finally {
          setLoading(false); // Set loading to false after fetching data
        }
  };

  useEffect(() => {
    fetchAllBankAccounts();
  }, []);

  const searchBankAccountsByAccountNumber = (e) => {
    e.preventDefault();
    setAccountNumber(tempAccountNumber);
    // Filter mock data based on account number
    const filteredAccounts = allAccounts.filter((account) =>
      String(account?.accountId ?? "").includes(tempAccountNumber)
    );
    setAllAccounts(filteredAccounts);
  };

  const viewAccountDetails = (accountId) => {
    navigate(`/ManageBankAccount/${accountId}`);
  };

  const viewAccountStatement = (accountId) => {
    navigate(`/customer/bank/account/statement/${accountId}`);
  };

 
  return (

    <>
    <Header/>
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="mt-2">
        <div
          className="card form-card ms-5 me-5 mb-5"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #544892",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="card-header text-center"
            style={{
              backgroundColor: "#544892",
              color: "#ffffff",
              borderBottom: "1px solid #544892",
              borderRadius: "10px 10px 0 0",
            }}
          >
            <h2>All Bank Accounts</h2>
          </div>
          <div
            className="card-body"
            style={{
              overflowY: "auto",
            }}
          >
            <div className="row mb-3">
              <div className="col">
                <form className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label>
                      <b>Account Number</b>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter account no..."
                      onChange={(e) => setTempAccountNumber(e.target.value)}
                      value={tempAccountNumber}
                      required
                      style={{ border: "1px solid #544892" }}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg mt-3"
                      style={{ backgroundColor: "#544892", border: "none" }}
                      onClick={searchBankAccountsByAccountNumber}
        
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="table-responsive mt-2">
              <table className="table table-hover text-center">
                <thead
                  className="table-bordered"
                  style={{ backgroundColor: "#544892", color: "#ffffff" }}
                >
                  <tr>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Bank Name</th>
                    <th scope="col">Account No.</th>
                    <th scope="col">Ifsc Code</th>
                    <th scope="col">Account Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    <th scope="col">Complete Details</th>
                    <th scope="col">Statement</th>
                  </tr>
                </thead>
                <tbody>
                  {allAccounts.map((account, index) => (
                    <tr key={index} style={{ backgroundColor: "#f8f9fa" }}>
                      <td>
                        <b>{account.customerName}</b>
                      </td>
                      <td>
                        <b>{account.bankName}</b>
                      </td>
                      <td>
                        <b>{account.accountId}</b>
                      </td>
                      <td>
                        <b>{account.ifscCode}</b>
                      </td>
                      <td>
                        <b>{account.accountType}</b>
                      </td>
                      <td>{account.status=="ACTIVE"?(<b className="text-success">UnLocked</b>):(<b className="text-danger">Locked</b>)}</td>
                      <td>
                      {account.status === "ACTIVE" ? (
                          <button
                           // onClick={() => viewAccountDetails(customer)}
                            className="btn btn-sm btn-danger mx-2"
                         
                           onClick={() =>lockAccountVar(account.accountId)}

                          >

                           Lock
                          </button>
                        ) : (
                          <button
                          //onClick={() => viewAccountDetails(customer)}
                          className="btn btn-sm btn-success"
                          
                         onClick={() => unlockAccountVar(account.accountId)}

                        >
                         Unlock
                        </button>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => viewAccountDetails(account.accountId)}
                          className="btn btn-sm btn-primary"
                          style={{ backgroundColor: "#544892", border: "none" }}
                        >
                          View Detail
                        </button>
                      </td>
                     
                      <td>
                        <button
                          onClick={() => viewAccountStatement(account.accountId)}
                          className="btn btn-sm btn-primary"
                          style={{ backgroundColor: "#544892", border: "none" }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    <Footer/>
    </>
    
  );
};

export default ViewAllBankAccounts;