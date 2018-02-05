package weatherapp;
import java.io.*;
import java.net.*;

public class Server {
	private int port;
	private ServerSocket socket;
	

	
	public Server(int socket) {
		openServerSocket(socket);
		System.out.println("Succesfully initiated server");
	}
	
	private boolean openServerSocket(int port) {
		this.port = port;
		try {
			socket = new ServerSocket(this.port);
			return true;
		} catch (IOException e) {
			System.out.println(String.format("[ERROR] Cannot connect to port %d", this.port));
			return false;
		}
	}
	
	public boolean handleClients() {
		while(true) {
			try {
				Socket soc = socket.accept();
				System.out.println("Connected");
				new Thread(new ClientHandler(soc)).start();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			}
		}
	}
	
}