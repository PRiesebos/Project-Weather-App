package weatherappdownloader;

import java.io.*;
import java.net.*;
import java.nio.ByteBuffer;
import java.util.Arrays;

public class Downloader implements Runnable {
	String url = "http://127.0.0.1/study/2.2/data.dat";
	String partialdest = "C:/xampp/htdocs/study/2.2/legacywebsite/data/";
	URL source = null;
	
	public Downloader() throws MalformedURLException {
		this.source = new URL(this.url);
	}
	
	public void run() {
		InputStream is;
		byte[] byteArr = null;
		long timestamp = 0;
		long newtimestamp = 0;
		
		while(true) {
			// load from URL
			is = openInputStream(source);
			
			// convert inputstream to array of bytes
			byteArr = readBytesFromInputStream(is);

			//DEBUG STATEMENT: PRINT LENGTH THAT IS TO BE READ.
			//System.out.println(byteArr.length / 47);
			
			byte[] timearr = new byte[8];
			for(int i = 0; i < 8; i++) {
				timearr[i] = byteArr[i+4];
			}
			newtimestamp = ByteBuffer.wrap(timearr).getLong();
			
			if (timestamp + 60 < newtimestamp) {
				//START WRITING
				// iterate over array, grabbing 47 bytes at a time until end of array is reached.
				int j = 0;
				byte[] writeArr = new byte[47];
				byte[] stnarr;
				String dest;
				File writeFile;
				boolean appendmode = false;
				for (j = 0; j < byteArr.length/47; j++) {
					writeArr = readBytesFromArray(byteArr, j*47, 47);
					int stationID;
					stnarr = readBytesFromArray(writeArr,0,8);
					stationID = ByteBuffer.wrap(stnarr).getInt();
					//store/append file in <stnid>.dat
					dest = partialdest + Integer.toString(stationID) + ".dat";
					//System.out.println(dest);
					writeFile = new File(dest);
					if(writeFile.exists()) {
						appendmode = true;
					}
					writeBytesToFile(writeFile, new ByteArrayInputStream(writeArr), appendmode);
				}
				System.out.println(String.format("Completed writing %d files.",byteArr.length/47));
				
				timestamp = newtimestamp;
			}
			try {
				Thread.sleep(10000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
			/* Once the number of stations is known, iterate over the file,
			 * read every station ID (array stationdata (47 bytes), read byte 1-4 to
			 * get the integer and then append the integer to the partialdest variable.
			 * Wrap it up with a .dat extension, set appendmode to true and start writing
			 * to all of your files. AWW YISSS.
			 * 
			 * It's currently 20:30 on February 4th, over the past 24 hours I've slept for
			 * two hours, presentation is at 14:00, 17h30m left. I can do this. I hope :c
			 */
			
			
			// write to files
			
		}
	}
	
	private InputStream openInputStream(URL source) {
		InputStream is = null;
		try {
			is = this.source.openStream();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return is;
	}
	
	/* Taken from the example at http://www.baeldung.com/convert-input-stream-to-array-of-bytes */
	private byte[] readBytesFromInputStream(InputStream is) {
		ByteArrayOutputStream buffer = new ByteArrayOutputStream();
		int nRead;
		// reads up to 16 kB if I understand this correctly. I'm sleep deprived, don't judge me.
		byte[] data = new byte[16384];
		try {
			while ((nRead = is.read(data, 0, data.length)) != -1) {
				buffer.write(data, 0, nRead);
			}
			buffer.flush();
			byte[] byteArray = buffer.toByteArray();
			return byteArray;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
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
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	private byte[] readBytesFromArray(byte[] byteArr, int startPos, int nToRead) {
		byte[] b;
		b = Arrays.copyOfRange(byteArr, startPos, startPos+nToRead);
		return b;
	}
	
}
