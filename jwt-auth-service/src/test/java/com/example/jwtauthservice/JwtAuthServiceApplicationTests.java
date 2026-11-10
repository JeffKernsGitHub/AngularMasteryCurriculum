package com.example.jwtauthservice;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class JwtAuthServiceApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	void contextLoads() {
	}

	@Test
	void testPublicEndpointAccessibleWithoutAuth() throws Exception {
		mockMvc.perform(get("/api/public"))
				.andExpect(status().isOk())
				.andExpect(content().string("This is a public endpoint."));
	}

	@Test
	void testProtectedEndpointsRejectUnauthenticatedRequest() throws Exception {
		mockMvc.perform(get("/api/user"))
				.andExpect(status().isForbidden());

		mockMvc.perform(get("/api/admin"))
				.andExpect(status().isForbidden());
	}

	@Test
	void testUserLoginAndAccess() throws Exception {
		// 1. Authenticate user
		MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content("{\"username\":\"user\",\"password\":\"user123\"}"))
				.andExpect(status().isOk())
				.andReturn();

		JsonNode responseNode = objectMapper.readTree(loginResult.getResponse().getContentAsString());
		String token = responseNode.get("token").asText();
		assertThat(token).isNotBlank();

		// 2. User accesses /api/user -> 200 OK
		mockMvc.perform(get("/api/user")
						.header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(content().string("This is a user endpoint."));

		// 3. User accesses /api/admin -> 403 Forbidden
		mockMvc.perform(get("/api/admin")
						.header("Authorization", "Bearer " + token))
				.andExpect(status().isForbidden());
	}

	@Test
	void testAdminLoginAndAccess() throws Exception {
		// 1. Authenticate admin
		MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content("{\"username\":\"admin\",\"password\":\"admin123\"}"))
				.andExpect(status().isOk())
				.andReturn();

		JsonNode responseNode = objectMapper.readTree(loginResult.getResponse().getContentAsString());
		String token = responseNode.get("token").asText();
		assertThat(token).isNotBlank();

		// 2. Admin accesses /api/user -> 200 OK
		mockMvc.perform(get("/api/user")
						.header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(content().string("This is a user endpoint."));

		// 3. Admin accesses /api/admin -> 200 OK
		mockMvc.perform(get("/api/admin")
						.header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(content().string("This is an admin endpoint."));
	}

	@Test
	void testInvalidCredentialsRejected() throws Exception {
		mockMvc.perform(post("/api/auth/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content("{\"username\":\"admin\",\"password\":\"wrongpassword\"}"))
				.andExpect(status().isForbidden());
	}
}

