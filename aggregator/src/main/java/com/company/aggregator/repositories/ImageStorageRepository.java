package com.company.aggregator.repositories;

import com.company.aggregator.models.Image;
import com.company.aggregator.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageStorageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByName(String filename);

    Optional<Image> findByUser(User user);
}
