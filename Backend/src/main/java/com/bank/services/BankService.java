package com.bank.services;

import java.util.List;

import com.bank.dtos.AllCustomersRespDto;
import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankReqDto;

public interface BankService {
	 ApiResponse addNewBank(BankReqDto bankDto);

	List<AllCustomersRespDto> viewAllBankCustomers(Long bankManagerId);

	ApiResponse makeInActive(Long customerId);

	ApiResponse makeActive(Long customerId);
}
