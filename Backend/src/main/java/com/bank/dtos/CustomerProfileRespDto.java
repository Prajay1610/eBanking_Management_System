package com.bank.dtos;



import java.math.BigDecimal;

import com.bank.entities.AccountType;
import com.bank.entities.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor 
public class CustomerProfileRespDto {
	private String name;
	private String email;
	
	private Gender gender;
	private String contactNo;
	private String Address;
	private Long customerId;
	public CustomerProfileRespDto(String name, String email,
			Gender gender, String contactNo, String address,Long customerId ) {
		super();
		this.name = name;
		this.email = email;
		
		this.gender = gender;
		this.contactNo = contactNo;
		Address = address;
		this.customerId=customerId;
	}
	
//	private List<Transaction> lastThreeTransactions;
	
	
}
