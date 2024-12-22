package com.example.internship.controller;

import com.example.internship.dto.post.PostRequestDto;
import com.example.internship.dto.post.PostResponseDto;
import com.example.internship.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3001", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequiredArgsConstructor
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<PostResponseDto> createPost(@Valid @RequestBody PostRequestDto dto) {
        PostResponseDto createdPost = postService.createPost(dto);
        return ResponseEntity.status(201).body(createdPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostResponseDto> updatePost(@PathVariable Long id, @Valid @RequestBody PostRequestDto dto) {
        PostResponseDto updatedEntry = postService.updatePost(id, dto);
        return ResponseEntity.ok(updatedEntry);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDto> getPost(@PathVariable Long id) {
        PostResponseDto entry = postService.getPost(id);
        return ResponseEntity.ok(entry);
    }

    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getAllPosts() {
        List<PostResponseDto> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("{postId}/images")
    public ResponseEntity<PostResponseDto> uploadImages(@PathVariable Long postId, @Valid @RequestParam("images") List<MultipartFile> images) {
        PostResponseDto updatedPost = postService.addImagesToPost(postId, images);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{postId}/images/{imageId}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long postId, @PathVariable Long imageId) {
        postService.deleteImageFromPost(postId, imageId);
        return ResponseEntity.noContent().build();
    }

}
