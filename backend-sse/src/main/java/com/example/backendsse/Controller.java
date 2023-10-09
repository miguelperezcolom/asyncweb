package com.example.backendsse;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;
import java.util.Base64;

@RestController
@RequestMapping("")
public class Controller {

    ObjectMapper mapper = new ObjectMapper();

    @GetMapping(path = "/stream-flux", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Message> streamFlux(@RequestParam("msg") String raw) throws IOException {
        var msg = getMessage(raw);
        return Flux.interval(Duration.ofSeconds(1))
                .map(sequence -> new Message(
                        "Flux - " + msg.getMessage() + " - " + LocalTime.now(),
                        "sse",
                        System.currentTimeMillis()))
                .doOnEach(m -> {
                    System.out.println("sending " + m.get().getMessage());
                }).take(3);
    }

    private Message getMessage(String raw) throws IOException {
        return mapper.readValue(Base64.getDecoder().decode(raw), Message.class);
    }

    @GetMapping("/stream-sse")
    public Flux<ServerSentEvent<Message>> streamEvents() {
        return Flux.interval(Duration.ofSeconds(1))
                .map(sequence -> ServerSentEvent.<Message> builder()
                        .id(String.valueOf(sequence))
                        .event("periodic-event")
                        .data(new Message("SSE - " + LocalTime.now(), "sse", System.currentTimeMillis()))
                        .build())
                .doOnEach(m -> {
                    System.out.println("sending " + m.get().data().getMessage());
                }).take(3);
    }

}
