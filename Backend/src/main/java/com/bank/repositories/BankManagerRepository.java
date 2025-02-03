package com.bank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.BankAccount;
import com.bank.entities.BankManager;

public interface BankManagerRepository extends JpaRepository<BankManager, Long>{
	
}
