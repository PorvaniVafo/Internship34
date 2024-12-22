package com.example.internship.service.impl;

import com.example.internship.dto.UserDTO;
import com.example.internship.dto.authorization.AuthRegistrationDTO;
import com.example.internship.dto.reset.PasswordResetDTO;
import com.example.internship.entity.Role;
import com.example.internship.entity.User;
import com.example.internship.entity.VerificationToken;
import com.example.internship.enums.TokenType;
import com.example.internship.exceptions.ApiException;
import com.example.internship.mappers.UserMapper;
import com.example.internship.repository.RoleRepository;
import com.example.internship.repository.UserRepository;
import com.example.internship.repository.VerificationTokenRepository;
import com.example.internship.service.AuthService;
import com.example.internship.service.MailService;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final VerificationTokenRepository verificationTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository, UserMapper userMapper, VerificationTokenRepository verificationTokenRepository, PasswordEncoder passwordEncoder, MailService mailService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
        this.verificationTokenRepository = verificationTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
    }

    @Override
    public UserDTO register(AuthRegistrationDTO authRegistrationDTO) {
        Role role = roleRepository.findByName("ROLE_USER");

        User user = userMapper.authRegistrationDtoToUserEntity(authRegistrationDTO);
        user.setRoles(Set.of(role));
        user.setPassword(passwordEncoder.encode(authRegistrationDTO.getPassword()));
        user.setEnabled(false);

        User savedUser = userRepository.save(user);

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(token, savedUser, TokenType.VERIFICATION);
        verificationTokenRepository.save(verificationToken);

        String verificationUrl = "http://localhost:3000/api/v1/auth/verify-email?token=" + token;
        String subject = "Email Verification";
        String body = "Please click the following link to verify your email: " + verificationUrl;

        mailService.sendEmail(savedUser.getEmail(), subject, body);

        return userMapper.userToUserDto(savedUser);
    }

    @Override
    public String verifyEmail(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByTokenAndTokenType(token, TokenType.VERIFICATION);

        if (verificationToken == null) {
            throw new IllegalArgumentException("Invalid verification token.");
        }

        User user = verificationToken.getUser();
        if (user == null) {
            throw new IllegalArgumentException("No user found for this token.");
        }

        Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            throw new IllegalArgumentException("Verification token has expired.");
        }

        user.setEnabled(true);
        userRepository.save(user);

        verificationTokenRepository.delete(verificationToken);

        return "Email verified successfully. You can now log in.";
    }

    @Override
    public void sendPasswordResetRequest(PasswordResetDTO passwordResetDTO) {
        Optional<User> optionalUser = userRepository.findByEmail(passwordResetDTO.getEmail());
        User user = optionalUser.orElseThrow(() -> new ApiException("No user found with that email.", HttpStatusCode.valueOf(409)));

        String token = UUID.randomUUID().toString();
        VerificationToken passwordResetToken = new VerificationToken(token, user, TokenType.PASSWORD_RESET);
        verificationTokenRepository.save(passwordResetToken);

        String resetUrl = "http://localhost:3000/api/v1/auth/reset-password?token=" + token + "&newPassword=" + passwordResetDTO.getNewPassword();
        String subject = "Password Reset Request";
        String body = "Please click the following link to reset your password: " + resetUrl;
        mailService.sendEmail(user.getEmail(), subject, body);
    }

    @Override
    public String resetPassword(String token, String newPassword) {
        VerificationToken passwordResetToken = verificationTokenRepository.findByTokenAndTokenType(token, TokenType.PASSWORD_RESET);

        if (passwordResetToken == null) {
            throw new IllegalArgumentException("Invalid password reset token.");
        }

        User user = passwordResetToken.getUser();
        if (user == null) {
            throw new IllegalArgumentException("No user found for this token.");
        }

        Calendar cal = Calendar.getInstance();
        if ((passwordResetToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            throw new IllegalArgumentException("Password reset token has expired.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        verificationTokenRepository.delete(passwordResetToken);

        return "Password has been reset successfully. You can now log in with your new password.";
    }

}
