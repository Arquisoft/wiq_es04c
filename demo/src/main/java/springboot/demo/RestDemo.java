package springboot.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import springboot.demo.model.Message;

@RestController
public class RestDemo {
	@CrossOrigin
	@GetMapping("/messages")
	public List<Message> getMessages() {
		List<Message> messages= new ArrayList<>();
		Message message = new Message();
		message.setContent("Welcome to Spring");
		messages.add(message);
		return messages;
	}

}