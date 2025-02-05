package com.bank.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.bank.dtos.BankAccountRespDto;
import com.bank.dtos.CustomerProfileRespDto;
import com.bank.dtos.TransactionResponseDto;

public interface CustomerService {
	 public CustomerProfileRespDto getCustomerDetails(Long customerId);
	public List<TransactionResponseDto> getAllTransactions(Long customerId);

	public List<TransactionResponseDto> getAllTransactionsForCustomer(Long customerId);
	public List<BankAccountRespDto> getAllSpecificAccounts(Long customerId);
}
