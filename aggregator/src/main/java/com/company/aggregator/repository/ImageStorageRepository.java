package com.company.aggregator.repository;

import com.company.aggregator.entity.Image;
import com.company.aggregator.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageStorageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByName(String filename);

    Optional<Image> findByUser(User user);
}