package springboot.demo;

import java.util.ArrayList;
import java.util.List;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springboot.demo.model.*;

@RestController
@RequestMapping("/")
public class RestDemo {

	

	@CrossOrigin
	@GetMapping("/messages")
	public List<Message> getMessages() {
		List<Message> messages = new ArrayList<>();
		Message message = new Message();
		message.setContent("Welcome to Spring");
		messages.add(message);
		return messages;
	}

	@PostMapping("/login")
	public List<Message> login(@RequestBody User user) {
		List<Message> messages = new ArrayList<>();
		Message message = new Message();
		message.setContent("Logueado");
		messages.add(message);
		return messages;
	}

	@PostMapping("/adduser")
	public List<Message> singup(@RequestBody User user) {
		List<Message> messages = new ArrayList<>();
		Message message = new Message();
		message.setContent("Inscrito");
		messages.add(message);
		return messages;
	}

}