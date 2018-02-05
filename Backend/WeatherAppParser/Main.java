package weatherapp;

import java.io.IOException;

public class Main {
	public static void main(String[] args) throws IOException {
		System.out.println("Starting up server to take input...");
		Server server = new Server(7789);
		boolean ret = server.handleClients();
		if(ret == false) {
			System.out.println("[ERROR] Clients could not be handled.");
		}
	}
}
