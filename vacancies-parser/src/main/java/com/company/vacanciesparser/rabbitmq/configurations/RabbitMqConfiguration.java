package com.company.vacanciesparser.rabbitmq.configurations;

import com.company.vacanciesparser.rabbitmq.exceptions.RabbitException;
import com.company.vacanciesparser.rabbitmq.properties.RabbitMqProperties;
import com.rabbitmq.client.Channel;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.Connection;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.stream.Collectors;

@Configuration
@ComponentScan
@EnableConfigurationProperties(RabbitMqProperties.class)
@RequiredArgsConstructor
public class RabbitMqConfiguration {

    private final RabbitMqProperties rabbitMqProperties;
    private Map<String, Object> rabbiteArgs = new HashMap<>() {{
        put("x-message-ttl", 1000L);
    }};

    @Bean
    public Queue queueToSend() {
        return new Queue(rabbitMqProperties.getQueueToSend(), true, false, false, rabbiteArgs);
    }

    @Bean
    public Queue queueToReceive0() {
        return new Queue(rabbitMqProperties.getQueueToReceive0(), true, false, false, rabbiteArgs);
    }

    @Bean
    public Queue queueToReceive1() {
        return new Queue(rabbitMqProperties.getQueueToReceive1(), true, false, false, rabbiteArgs);
    }

    @Bean
    public TopicExchange exchangeEvents() {
        return new TopicExchange(rabbitMqProperties.getTopic());
    }

    @Bean
    public Binding bindingToSend(TopicExchange exchange) {
        return BindingBuilder.bind(queueToSend()).to(exchange).with(rabbitMqProperties.getRoutingKeyToSend());
    }

    @Bean
    public Binding bindingToReceive0(TopicExchange exchange) {
        return BindingBuilder.bind(queueToReceive0()).to(exchange).with(rabbitMqProperties.getRoutingKeyToReceive0());
    }

    @Bean
    public Binding bindingToReceive1(TopicExchange exchange) {
        return BindingBuilder.bind(queueToReceive0()).to(exchange).with(rabbitMqProperties.getRoutingKeyToReceive1());
    }


    @Bean
    public ConnectionFactory connectionFactory(ExecutorService coreExecutor) {
        if (rabbitMqProperties.getServices() == null || rabbitMqProperties.getServices().isEmpty()) {
            throw new RabbitException("Не указаны параметры подключения к кластеру RabbitMq");
        }

        CachingConnectionFactory cachingConnectionFactory = new CachingConnectionFactory();
        cachingConnectionFactory.setAddresses(
                rabbitMqProperties.getServices().stream()
                        .map(service -> service.getHost() + ":" + service.getPort())
                        .collect(Collectors.joining(",")));

        if (this.rabbitMqProperties.getUsername() != null) {
            cachingConnectionFactory.setUsername(this.rabbitMqProperties.getUsername());
        }

        if (this.rabbitMqProperties.getPassword() != null) {
            cachingConnectionFactory.setPassword(this.rabbitMqProperties.getPassword());
        }

        cachingConnectionFactory.setExecutor(coreExecutor);

        return cachingConnectionFactory;
    }

    @Bean
    public MessageConverter converter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ExecutorService coreExecutor) {
        RabbitTemplate template = new RabbitTemplate(this.connectionFactory(coreExecutor));
        template.setExchange(this.rabbitMqProperties.getTopic());
        template.setTaskExecutor(coreExecutor);
        template.setMessageConverter(converter());
        return template;
    }

    @Bean
    public Channel channel(ExecutorService coreExecutor) {
        try (Connection connection = connectionFactory(coreExecutor).createConnection()) {
            return connection.createChannel(false);
        }
    }

}
