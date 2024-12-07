package com.esport.playrecorder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application for the gameplay recording microservice.
 */
@SpringBootApplication
public class GameplayRecorderApplication {
    public static void main(String[] args) {
        SpringApplication.run(GameplayRecorderApplication.class, args);
    }
}
