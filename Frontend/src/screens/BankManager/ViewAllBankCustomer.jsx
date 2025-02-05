import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate ,Link} from "react-router-dom";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import { makeActive, makeInActive, viewAllBankCustomers } from "../../services/bankManagerService";
const ViewAllBankCustomers = () => {
  let navigate = useNavigate();
  const [allCustomer, setAllCustomer] = useState([]);
 const [managerId,setManagerId]=useState(1);//set manager id from jwt session
  const [tempCustomerName, setTempCustomerName] = useState("");

  
  const makeInActiveVar=async(userId)=>{

    
    const response = await makeInActive(userId); 
    if(response){
      getAllBankCustomers(managerId);

   
    }
  }
  const makeActiveVar=async(userId)=>{

    
    const response = await makeActive(userId); 
    if(response){
    
      getAllBankCustomers(managerId);
    }
  }
   const getAllBankCustomers = async (accountId) => {
      try {
               
                const response = await viewAllBankCustomers(accountId); 
                if (response) {
                  console.log("Bank Customers:", response);
                  
                  setAllCustomer(response); // Update state with the retrieved data
                }
              } catch (error) {
                console.error("Error fetching bank customers:", error);
                alert("Failed to load bank customers. Please try again later.");
              } 
    };

  // Simulate fetching data from the backend
  useEffect(() => {
    getAllBankCustomers(managerId);
  }, []);
  const viewCustomerDetails = (customerId) => {
    navigate(`/customerProfile/${customerId}`);

  };

  const searchBankCustomersByName = (e) => {
    e.preventDefault();
    setTempCustomerName(tempCustomerName);
    // Filter mock data based on customer name
    const filteredCustomers = allCustomer.filter((customer) =>
      (customer.customerName ?? "").toLowerCase().includes(tempCustomerName.toLowerCase())
    );
    setAllCustomer(filteredCustomers);
  };

  // const viewAccountDetails = (customer) => {
  //   navigate("/customer/bank/account/detail", { state: customer });
  // };

  const activateUser = (userId) => {
    toast.success("User activated successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const deactivateUser = (userId) => {
    toast.error("User deactivated successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
            <h2>All Bank Customers</h2>
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
                      <b>Customer Name</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter customer name..."
                      onChange={(e) => setTempCustomerName(e.target.value)}
                      value={tempCustomerName}
                      required
                      style={{ border: "1px solid #544892" }}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ backgroundColor: "#544892", border: "none" }}
                      onClick={searchBankCustomersByName}
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
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Address</th>
                    <th scope="col">Status</th>
                   
                    <th scope="col">view customer profile</th>
                    <th scope="col">Action</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {allCustomer.map((customer) => (
                    <tr key={customer.accountId} style={{ backgroundColor: "#f8f9fa" }}>
                      <td>
                        <b>{customer.customerName}</b>
                      </td>
                      <td>
                        <b>{customer.bankName}</b>
                      </td>
                      <td>
                        <b>{customer.customerEmail}</b>
                      </td>
                      <td>
                        <b>{customer.gender}</b>
                      </td>
                      <td>
                        <b>{customer.customerContact}</b>
                      </td>
                      <td>
                        <b>{customer.customerAddress}</b>
                      </td>
                      <td>{customer.customerStatus==true?(<b className="text-success">Active</b>):(<b className="text-danger">InActive</b>)}</td>
                      <td>
                        
                          <button
                            //onClick={() => viewAccountDetails(customer)}
                            className="btn btn-sm btn-primary mx-2"
                            style={{ backgroundColor: "#544892", border: "none" }}
                            onClick={() => viewCustomerDetails(customer.customerId)}
                          >
                           
                    View Customer Profile
                  
                          </button>
                        
                        
                      </td>
                       
                      <td>
                      {customer.customerStatus === true ? (
                          <button
                           // onClick={() => viewAccountDetails(customer)}
                            className="btn btn-sm btn-danger mx-2"
                         
                            onClick={() => makeInActiveVar(customer.userId)}

                          >

                           InActive
                          </button>
                        ) : (
                          <button
                          //onClick={() => viewAccountDetails(customer)}
                          className="btn btn-sm btn-success"
                          
                          onClick={() => makeActiveVar(customer.userId)}

                        >
                         Active
                        </button>
                        )}
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

export default ViewAllBankCustomers;