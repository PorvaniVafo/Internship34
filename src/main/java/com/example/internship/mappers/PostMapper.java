package com.example.internship.mappers;

import com.example.internship.dto.post.PostRequestDto;
import com.example.internship.dto.post.PostResponseDto;
import com.example.internship.entity.Post;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING, uses = {UserMapper.class, ImageMapper.class})
public interface PostMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "updatedAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "images", ignore = true)
    Post toEntity(PostRequestDto dto);

    @Mapping(target = "images", source = "images")
    PostResponseDto toDTO(Post entity);
}