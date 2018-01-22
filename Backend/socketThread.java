import java.io.File;
import java.io.FileNotFoundException;
import java.net.ServerSocket;
import java.net.Socket;


public class socketThread implements Runnable {
	File writeFile;
	
	public socketThread(File writeFile) {
		this.writeFile = writeFile; 
	}
	@Override
	public void run() {
		try {
		ServerSocket serverSocket = new ServerSocket(7789);
		while(true) 
		{
			Socket soc = serverSocket.accept();
			System.out.println("connected");
			new Thread(new serverThread(soc, writeFile)).start();;
			
			
		}
		
	}catch (Exception e) {
		e.printStackTrace();

}
	}
}
	
