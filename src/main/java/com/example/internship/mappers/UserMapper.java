package com.example.internship.mappers;

import com.example.internship.dto.authorization.AuthRegistrationDTO;
import com.example.internship.entity.User;
import com.example.internship.dto.UserDTO;

import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {
    User userDtoToUser(UserDTO dto);
    User authRegistrationDtoToUserEntity(AuthRegistrationDTO dto);
    UserDTO userToUserDto(User user);
}
