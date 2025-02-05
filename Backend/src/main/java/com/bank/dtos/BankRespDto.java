package com.bank.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor 
@AllArgsConstructor
public class BankRespDto {

	/*Bank Name	IFSC	Address	Phone No	Email	Website	Country*/
	private String BankName;
	private String bankIfsc;
	private String Address;
	private String PhoneNo;
	private String email;
	private String website;
	private String country;
	public BankRespDto(String bankName, String bankIfsc) {
		super();
		BankName = bankName;
		this.bankIfsc = bankIfsc;
	}
	
}
