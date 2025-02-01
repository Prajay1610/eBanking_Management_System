package com.bank.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bank.entities.User;

import jakarta.transaction.Transactional;


public interface UserService {

	public User authenticate(String email, String password);

	public User registerUser(User user);
	
}
