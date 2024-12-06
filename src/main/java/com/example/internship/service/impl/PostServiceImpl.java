package com.example.internship.service.impl;

import com.example.internship.dto.post.PostRequestDto;
import com.example.internship.dto.post.PostResponseDto;
import com.example.internship.entity.Image;
import com.example.internship.entity.Post;
import com.example.internship.entity.User;
import com.example.internship.exceptions.FileOperationException;
import com.example.internship.exceptions.NotFoundException;
import com.example.internship.exceptions.UnauthorizedActionException;
import com.example.internship.mappers.PostMapper;
import com.example.internship.mappers.UserMapper;
import com.example.internship.repository.ImageRepository;
import com.example.internship.repository.PostRepository;
import com.example.internship.repository.UserRepository;
import com.example.internship.service.PostService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostServiceImpl implements PostService {

    PostMapper postMapper;
    PostRepository postRepository;
    ImageRepository imageRepository;
    UserRepository userRepository;
    UserMapper userMapper;

    @Override
    public PostResponseDto createPost(PostRequestDto dto) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Post post = postMapper.toEntity(dto);
        post.setUser(currentUser);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());

        Post savedPost = postRepository.save(post);
        return postMapper.toDTO(savedPost);
    }

    @Override
    public PostResponseDto updatePost(Long id, PostRequestDto dto) {
        Post post = postRepository.findByIdWithAuthor(id)
                .orElseThrow(() -> new NotFoundException("Post not found with id: " + id));

        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!post.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedActionException("You are not the author of this post");
        }

        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setUpdatedAt(LocalDateTime.now());

        Post updatedPost = postRepository.save(post);
        return postMapper.toDTO(updatedPost);
    }

    @Override
    public PostResponseDto getPost(Long id) {
        return postRepository.findByIdWithAuthor(id)
                .map(postMapper::toDTO)
                .orElseThrow(() -> new NotFoundException("Post with id " + id + " not found"));
    }

    @Override
    public List<PostResponseDto> getAllPosts() {
        List<Post> posts = postRepository.findAllWithAuthors();
        return posts.stream()
                .map(postMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deletePost(Long id) {
        Post existingPost = postRepository.findByIdWithAuthor(id)
                .orElseThrow(() -> new NotFoundException("Post not found with id: " + id));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!existingPost.getUser().getUsername().equals(username)) {
            throw new UnauthorizedActionException("You are not authorized to delete this post");
        }

        postRepository.deleteById(id);
    }

    @Override
    public PostResponseDto addImagesToPost(Long postId, List<MultipartFile> images) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post not found with id: " + postId));

        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!post.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedActionException("You are not the author of this post");
        }

        for (MultipartFile imageFile : images) {
            String imageUrl = saveImageToFileSystem(imageFile);

            Image image = new Image();
            image.setUrl(imageUrl);
            image.setPost(post);
            post.getImages().add(image);
        }

        Post updatedPost = postRepository.save(post);
        return postMapper.toDTO(updatedPost);
    }

    private String saveImageToFileSystem(MultipartFile imageFile) {
        String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
        Path imagePath = Paths.get("uploads/" + fileName);

        try {
            Files.createDirectories(imagePath.getParent());
            Files.copy(imageFile.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new FileOperationException("Failed to save image", e);
        }

        return "/uploads/" + fileName;
    }

    @Override
    public void deleteImageFromPost(Long postId, Long imageId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException("Post not found with id: " + postId));

        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!post.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedActionException("You are not the author of this post");
        }

        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new NotFoundException("Image not found with id: " + imageId));

        if (!image.getPost().getId().equals(postId)) {
            throw new NotFoundException("Image does not belong to the given post");
        }

        deleteImageFromFileSystem(image.getUrl());

        post.getImages().remove(image);
        imageRepository.delete(image);
    }

    private void deleteImageFromFileSystem(String imageUrl) {
        Path imagePath = Paths.get(imageUrl.replaceFirst("/", ""));
        try {
            Files.deleteIfExists(imagePath);
        } catch (IOException e) {
            throw new FileOperationException("Failed to delete image", e);
        }
    }

}
