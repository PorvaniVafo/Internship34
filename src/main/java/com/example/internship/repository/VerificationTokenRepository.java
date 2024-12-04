package com.example.internship.repository;

import com.example.internship.entity.VerificationToken;
import com.example.internship.enums.TokenType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByTokenAndTokenType(String token, TokenType tokenType);
}
