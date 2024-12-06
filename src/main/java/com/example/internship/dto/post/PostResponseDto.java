package com.example.internship.dto.post;

import com.example.internship.dto.image.ImageDto;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponseDto {
    Long id;
    String title;
    String content;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    List<ImageDto> images;
}
