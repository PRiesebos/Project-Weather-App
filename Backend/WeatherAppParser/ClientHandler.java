package weatherapp;

import java.io.*;
import java.net.*;
import java.nio.ByteBuffer;


public class ClientHandler implements Runnable {
	private Socket soc;
	
	public ClientHandler(Socket useSoc) {
		this.soc = useSoc;
	}
	
	@Override
	public void run() {
		String s = null;
		byte byteArr[] = new byte[470];
		// open inputstream
		InputStream input = null;
		input = openStream();
		BufferedReader br = null;
		br = openReader(input);
		StringBuilder sb = new StringBuilder();
		String line = null;
		System.out.println("Started ClientHandler thread succesfully.");
		
		while(true) {
			//System.out.println("Attempting to read from socket...");
			
			// READING XML FILE FROM SOCKET INTO STRING, BREAKS ON LAST STATEMENT OF FILE.
			try {
				while((line = br.readLine()) != null) {
					sb.append(line);
					if(line.contains("</WEATHERDATA>")) {
						s = sb.toString();
						sb.delete(0, sb.length());
						//System.out.println("Weatherdata file received.");
						break;
					}
					sb.append("\n");
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			//DEBUG STATEMENT TO CHECK XML DOCUMENT.
			//System.out.println(s);
			
			// PARSES XML DOCUMENT INTO BYTE ARRAY.
			WeatherAppXmlParser parser = new WeatherAppXmlParser(s);
			byteArr = parser.parseString();
			
			//DEBUG TOOLS TO CHECK BYTE ARRAY CONTENTS.
			//printBytes(byteArr, 47);
			//printBytesAsHex(byteArr, 47);
			
			//send
			String filePath = "C:\\xampp\\htdocs\\study\\2.2\\data.dat";
			File writeFile = new File(filePath);
			boolean appendmode = false;
			//TODO: Move to functions.
			if(writeFile.exists()) {
				byte[] buffer = new byte[12];
				long filetimestamp = 0;
				try {
					InputStream is = new FileInputStream(writeFile);
					if(is.read(buffer) != buffer.length) {
						//System.out.println("[ERROR] Bad data?");
					}
					is.close();
					byte[] arr = new byte[8];
					for(int i = 0; i < 8; i++) {
						arr[i] = buffer[i+4];
					}
					filetimestamp = ByteBuffer.wrap(arr).getLong();
					for (int i = 0; i < 8; i++) {
						arr[i] = byteArr[i+4];
					}
					long datatimestamp = ByteBuffer.wrap(arr).getLong();
					if (filetimestamp == datatimestamp) {
						appendmode = true;
					}
				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
			writeBytesToFile(writeFile, new ByteArrayInputStream(byteArr), appendmode);
		}
	}
	
	private InputStream openStream() {
		InputStream input = null;
		
		try {
			input = this.soc.getInputStream();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return input;
	}
	
	private BufferedReader openReader(InputStream input) {
		BufferedReader br = null;
		try {
			br = new BufferedReader(new InputStreamReader(input, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return br;
	}
	
	private void printBytes(byte[] arr, int length) {
		int i;
		for(i=0; i<length; i++) {
			System.out.println(String.format("%d:.%8s", i, Integer.toBinaryString(arr[i] & 0xFF)).replace(' ', '0'));
		}
	}
	
	
	/* Bugged, do not use. */
	private void printBytesAsHex(byte[] arr, int length) {
		int i, j;
		for (i = 0; i < length / 4; i++) {
			for (j = 0; j < 4; j++) {
				if (i * 4 + j == length) {
					System.out.print("END OF PRINTED ARRAY\n");
					return;
				}
				System.out.print(String.format("%02X", arr[i * 4 + j]));
			}
			System.out.print("\n");
		}
	}
	
	public synchronized void writeBytesToFile(File dest, InputStream input, boolean append) {
		try {
			OutputStream out = new FileOutputStream(dest, append);
			byte[] buf = new byte[1024];
			int len;
			while((len=input.read(buf))>0) {
				out.write(buf,0,len);
			}
			out.close();
			input.close();
			//System.out.println("Wrote succesfully to file.");
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
 	public synchronized void writeToFile(File dest, String toWrite) {
		try {
			PrintWriter pw = new PrintWriter(new FileOutputStream(dest, true));
			pw.write(toWrite);
			pw.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}