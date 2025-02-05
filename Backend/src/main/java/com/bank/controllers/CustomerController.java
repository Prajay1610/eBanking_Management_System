package com.bank.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankAccountRespDto;
import com.bank.dtos.TransactionResponseDto;
import com.bank.services.CustomerService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/customer")
public class CustomerController {
	@Autowired
	private CustomerService customerService;
	

	
	

	@GetMapping("/{customerId}")
	public ResponseEntity<?> getCustomerDetails(@PathVariable Long customerId){
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(
							customerService.getCustomerDetails(customerId));
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	
	@GetMapping("/transactions/{accountId}")
    public ResponseEntity<List<TransactionResponseDto>> getAllTransactionsForAccount(
            @PathVariable Long accountId) {
        List<TransactionResponseDto> transactions = customerService.getAllTransactions(accountId);
        return ResponseEntity.ok(transactions);
    }	

	
	@GetMapping("/transactions/customer/{customerId}")
    public ResponseEntity<List<TransactionResponseDto>> getAllTransactionsForCustomer(
            @PathVariable Long customerId) {
        List<TransactionResponseDto> transactions = customerService.getAllTransactionsForCustomer(customerId);
        return ResponseEntity.ok(transactions);
    }	
	
	@GetMapping("/allAccounts/{customerId}")
	public ResponseEntity<?>  getAllSpecificAccounts(@PathVariable Long customerId) {
		List<BankAccountRespDto>allAccounts=customerService.getAllSpecificAccounts(customerId);
        return ResponseEntity.ok(allAccounts);

		
	}
	

}
