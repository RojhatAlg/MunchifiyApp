package com.munch.pack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@Import(CorsConfig.class)
public class SpringServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringServerApplication.class, args);

    }
}
