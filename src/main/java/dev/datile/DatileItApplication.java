package dev.datile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class DatileItApplication {

    public static void main(String[] args) {
        System.out.println(new BCryptPasswordEncoder().encode("password"));
        SpringApplication.run(DatileItApplication.class, args);
    }

}
