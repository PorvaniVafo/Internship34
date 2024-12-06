package com.example.internship.mappers;

import com.example.internship.dto.image.ImageDto;
import com.example.internship.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface ImageMapper {

    ImageDto toDTO(Image image);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "post", ignore = true)
    Image toEntity(ImageDto dto);
}
