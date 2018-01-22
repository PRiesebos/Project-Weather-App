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
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.swing.text.MaskFormatter;

import org.relique.jdbc.csv.CsvDriver;

public class Server {
	
	Socket clientSocket;
	File writeFile;
	
	public static void main(String[] args) throws IOException {
		Thread test = new Thread(new queryThread(), "qT");
		test.start();
		System.out.println("Test");
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
        Thread sT = new Thread(new socketThread(writeFile), "sT");

		sT.start();
	}
	
	
}
		
		
