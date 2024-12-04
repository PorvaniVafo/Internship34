package com.example.internship.service;

import com.example.internship.dto.UserDTO;
import com.example.internship.dto.authorization.AuthRegistrationDTO;
import com.example.internship.dto.reset.PasswordResetDTO;
import com.example.internship.entity.User;
import com.example.internship.entity.VerificationToken;
import com.example.internship.enums.TokenType;

import java.util.Calendar;
import java.util.UUID;

public interface AuthService {
    UserDTO register(AuthRegistrationDTO authRegistrationDTO);
    String verifyEmail(String token);
    void sendPasswordResetRequest(PasswordResetDTO passwordResetDTO);
    String resetPassword(String token, String newPassword);
}