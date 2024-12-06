package com.example.internship.dto.post;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldNameConstants;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldNameConstants(level = AccessLevel.PRIVATE)
public class PostRequestDto {
    @NotBlank
    String title;

    @NotBlank
    String content;
}
