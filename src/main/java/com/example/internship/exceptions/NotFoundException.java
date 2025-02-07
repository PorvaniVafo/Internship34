package com.example.internship.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundException extends BaseException {
    public NotFoundException(String resourceName) {
        super(resourceName + " not found", HttpStatus.NOT_FOUND);
    }
}
