package com.example.internship.repository;

import com.example.internship.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p FROM Post p LEFT JOIN FETCH p.user")
    List<Post> findAllWithAuthors();

    @Query("SELECT p FROM Post p LEFT JOIN FETCH p.user WHERE p.id = :id")
    Optional<Post> findByIdWithAuthor(@Param("id") Long id);
}
