package com.bank.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dtos.AllCustomersRespDto;
import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankReqDto;
import com.bank.entities.AccountType;
import com.bank.entities.Bank;
import com.bank.entities.BankAccount;
import com.bank.entities.BankManager;
import com.bank.entities.Customer;
import com.bank.entities.Gender;
import com.bank.entities.Role;
import com.bank.entities.User;
import com.bank.exception.ResourceNotFoundException;
import com.bank.repositories.BankAccountRepository;
import com.bank.repositories.BankManagerRepository;
import com.bank.repositories.BankRepository;
import com.bank.repositories.CustomerRepository;
import com.bank.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BankServiceImpl implements BankService{
	
//	@Autowired
//	private ModelMapper modelMapper;
	
	@Autowired
	private BankRepository bankRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private BankManagerRepository bankManagerRepository;
	
	@Autowired
	private BankAccountRepository bankAccountRepository;

	@Override
	public ApiResponse addNewBank(BankReqDto bankDto) {
	
	Bank bank = new Bank();
	bank.setBankName(bankDto.getBankName());
	bank.setAddress(bankDto.getAddress());
	bank.setBankCountry(bankDto.getBankCountry());
	bank.setBankEmail(bankDto.getBankEmail());
	bank.setBankIfsc(bankDto.getBankIfsc());
	bank.setBankWebsite(bankDto.getBankWebsite());
	bank.setPhone(bankDto.getPhone());
	
	
	//save bank account
	Bank persistentBank = bankRepository.save(bank);
	
	
	
	//fetching bank manager based on id
	User user = userRepository.findById(bankDto.getBankManagerId()).orElseThrow(()->new ResourceNotFoundException("Bank manager not found with id : "+bankDto.getBankManagerId()));
	
	BankManager bankManager = new BankManager();
	bankManager.setBank(persistentBank);
	bankManager.setUser(user);
	
	bankManagerRepository.save(bankManager);

	return new ApiResponse("Bank Added successfully with ID: " 
					+ persistentBank.getId());
	}

	@Override
	public List<AllCustomersRespDto> viewAllBankCustomers(Long bankManagerId) {
		Optional<BankManager> bankManager = bankManagerRepository.findById(bankManagerId);
		Long bankId = bankManager.get().getBank().getId();
		
		List<BankAccount> allBankAccounts = bankAccountRepository.findByBankId(bankId); 
		
		List<AllCustomersRespDto> allCustomersRespDto = new ArrayList<>();
		/*private String customerName;
	private String bankName;
	private String customerEmail;
	private String Gender;
	private String customerContact;
	private String customerAddress;
	private Long accountId;
	private boolean customerStatus;
	*/
		return allBankAccounts.stream().map(acc->new AllCustomersRespDto(acc.getCustomer().getUser().getFname()+" "+acc.getCustomer().getUser().getLname(), acc.getBank().getBankName(),acc.getCustomer().getUser().getEmail(),acc.getCustomer().getUser().getGender(),acc.getCustomer().getUser().getPhoneNo(),acc.getCustomer().getUser().getAddress(),acc.getId(),acc.getCustomer().getUser().getIsActive(),acc.getCustomer().getUser().getId(),acc.getCustomer().getId())).distinct().toList();
		
		
	}
	@Override
	public ApiResponse makeInActive(Long customerId) {
		// TODO Auto-generated method stub
		Optional<User>user=userRepository.findById(customerId);
	    Optional<Customer> customerOptional = customerRepository.findByUserId(customerId);
	    

		if(user.get().getRole()==Role.CUSTOMER) {
			user.get().setIsActive(false);
		}
		
		List<BankAccount> bankAccounts = bankAccountRepository.findByCustomerId(customerOptional.get().getId());
		System.out.println(bankAccounts);

	    if (!bankAccounts.isEmpty()) {
	        for (BankAccount account : bankAccounts) {
	            account.setIsLocked(true); // Lock each bank account
	        }
	        bankAccountRepository.saveAll(bankAccounts); // Save all updated accounts
	    }
		userRepository.save(user.get());
		
		return new ApiResponse("Status updated to inactive: ");
	}

	@Override
	public ApiResponse makeActive(Long customerId) {
		// TODO Auto-generated method stub
		Optional<User>user=userRepository.findById(customerId);
		 Optional<Customer> customerOptional = customerRepository.findByUserId(customerId);
		if(user.get().getRole()==Role.CUSTOMER) {
			user.get().setIsActive(true);
		}
		List<BankAccount> bankAccounts = bankAccountRepository.findByCustomerId(customerOptional.get().getId());
	    if (!bankAccounts.isEmpty()) {
	        for (BankAccount account : bankAccounts) {
	            account.setIsLocked(false); // Lock each bank account
	        }
	        bankAccountRepository.saveAll(bankAccounts); // Save all updated accounts
	    }
		userRepository.save(user.get());		
		return new ApiResponse("Status updated to active: ");
	}

}
