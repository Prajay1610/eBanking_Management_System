package com.bank.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bank.entities.AccountType;
import com.bank.entities.BankAccount;
import com.bank.entities.Customer;
import com.bank.entities.Gender;
import com.bank.entities.Transaction;
import com.bank.entities.TransactionType;
import com.bank.exception.ResourceNotFoundException;
import com.bank.repositories.BankAccountRepository;
import com.bank.repositories.CustomerRepository;
import com.bank.repositories.TransactionRepository;

import jakarta.transaction.Transactional;
import com.bank.dtos.*;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private BankAccountRepository bankAccountRepository;
	
	@Override
	public CustomerProfileRespDto getCustomerDetails(Long customerId) {
		Customer cust = customerRepository.findById(customerId).orElseThrow(()->new ResourceNotFoundException("Can't Find Customer with id: "+customerId));
		Customer customer = cust;
		String customerName = customer.getUser().getFname()+" "+customer.getUser().getLname();
		String email = customer.getUser().getEmail();
		
		

		
		String PhoneNo = customer.getUser().getPhoneNo();
		Gender gender = customer.getUser().getGender();
		String Address = customer.getUser().getAddress();
		Long customerId1=customer.getId();//for testing
		
		//get account type for a customer's account
		return new CustomerProfileRespDto(customerName,email,gender,PhoneNo,Address,customerId1);
	}

	@Autowired
    private TransactionRepository transactionRepository;

	public List<TransactionResponseDto> getAllTransactions(Long accountId) {
	    return transactionRepository.findAllByAccountId(accountId)
	            .stream()
	            .map(this::convertToDto) // Convert each entity to DTO
	            .collect(Collectors.toList());
	}
    
    private TransactionResponseDto convertToDto(Transaction transaction) {
        TransactionResponseDto dto = new TransactionResponseDto();
        dto.setTransactionId(transaction.getId().toString());
        dto.setBank(new BankDto(transaction.getAccount().getBank().getBankName()));
        
        dto.setDestinationBank(transaction.getTransactionType() == TransactionType.TRANSFER 
                ? new BankDto(transaction.getTransfer().getToAccount().getBank().getBankName()):null);
        
        dto.setUser(new UserDto(transaction.getAccount().getCustomer().getUser().getFname()));
        dto.setBankAccount(new BankAccountDto(transaction.getAccount().getId()));
        dto.setType(transaction.getTransactionType().name());
        dto.setAmount(transaction.getAmount().doubleValue());
        dto.setDestinationBankAccount(
                transaction.getTransactionType() == TransactionType.TRANSFER 
                        ? new BankAccountDto(transaction.getTransfer().getToAccount().getId())
                        : null
        );
        dto.setNarration(transaction.getDescription());
        dto.setTransactionTime(transaction.getCreatedOn().atZone(java.time.ZoneOffset.UTC).toInstant().toEpochMilli());
        return dto;
    }

	
	@Override
	public List<TransactionResponseDto> getAllTransactionsForCustomer(Long customerId) {
	    // Fetch all bank accounts of the given customer
	    List<BankAccount> allAccounts = bankAccountRepository.findByCustomerId(customerId);

	    // Fetch transactions for all accounts
	    return allAccounts.stream()
	            .flatMap(account -> transactionRepository.findAllByAccountId(account.getId()).stream())
	            .map(this::convertToDto) // Convert each entity to DTO
	            .collect(Collectors.toList());
	}

	
	@Override
	public List<BankAccountRespDto> getAllSpecificAccounts(Long customerId) {
	    // Fetch all bank accounts for the given customer
	    List<BankAccount> allAccounts = bankAccountRepository.findByCustomerId(customerId);
	    
	    return allAccounts.stream()
	            .map(account -> {
	                // Convert Bank to BankRespDto
	                BankRespDto bankRespDto = new BankRespDto(
	                        account.getBank().getBankName(),
	                        account.getBank().getBankIfsc() // assuming ifscCode is part of the Bank entity
	                );

	                // Create BankAccountRespDto
	                BankAccountRespDto respDto = new BankAccountRespDto();
	                respDto.setCustomerName(account.getCustomer().getUser().getFname() + " " + account.getCustomer().getUser().getLname());
	                respDto.setBankName(bankRespDto.getBankName());
	                respDto.setAccountId(account.getId());
	                respDto.setIfscCode(account.getBank().getBankIfsc());
	                respDto.setAccountType(account.getAccountType().name());
	                respDto.setStatus(account.getIsLocked() ? "Locked" : "Active");
	                respDto.setCustomerEmail(account.getCustomer().getUser().getEmail());
	                respDto.setBalance(account.getBalance());
	                respDto.setCreatedOn(account.getCreatedOn());

	                return respDto;
	            })
	            .collect(Collectors.toList());
	}



    
}
