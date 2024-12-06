package com.example.internship.service;

import com.example.internship.dto.post.PostRequestDto;
import com.example.internship.dto.post.PostResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {

    PostResponseDto createPost(PostRequestDto dto);
    PostResponseDto updatePost(Long id, PostRequestDto dto);
    PostResponseDto getPost(Long id);
    List<PostResponseDto> getAllPosts();
    void deletePost(Long id);

    PostResponseDto addImagesToPost(Long postId, List<MultipartFile> images);
    void deleteImageFromPost(Long postId, Long imageId);
}
