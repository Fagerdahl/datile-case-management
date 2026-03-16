package dev.datile.service;

import dev.datile.domain.User;
import dev.datile.dto.users.NewUserDto;
import dev.datile.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(NewUserDto user) {
        return userRepository.save(new User(user.name(), user.email(), user.password(), user.role()));
    }

}
