import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
	
	Socket clientSocket;
	File writeFile;
	
	public static void main(String[] args) throws IOException {
		Server server = new Server();
		
	}
	
	public Server() throws IOException 
	{
		writeFile = new File("data.csv");;
		
        StringBuilder sb = new StringBuilder();
        sb.append("stn");
        sb.append(',');
        sb.append("date");
        sb.append(',');
        sb.append("time");
        sb.append(',');
        sb.append("temp");
        sb.append(',');
        sb.append("dewp");
        sb.append(',');
        sb.append("stp");
        sb.append(',');
        sb.append("slp");
        sb.append(',');
        sb.append("visib");
        sb.append(',');
        sb.append("wdsp");
        sb.append(',');
        sb.append("prcp");
        sb.append(',');
        sb.append("sndp");
        sb.append(',');
        sb.append("frshtt");
        sb.append(',');
        sb.append("cldc");
        sb.append(',');
        sb.append("wnddir");
        sb.append('\n');
        
        
        try {
			PrintWriter pw = new PrintWriter(new File("data.csv"));
			pw.write(sb.toString());
			pw.close();
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}
		ServerSocket serverSocket = new ServerSocket(7789);
		while(true) 
		{
			Socket soc = serverSocket.accept();
			System.out.println("connected");
			new Thread(new serverThread(soc, writeFile)).start();;
			
			
		}
	}
	
	public void makeQuery(File dataFile) {
		try {
		BufferedReader br = new BufferedReader(new FileReader(dataFile));
		String line;
         while ((line = br.readLine()) != null) {

             System.out.println(line);
         }
	
		}catch(Exception e) {
			e.printStackTrace();
		}
}
}
		
		
