import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.nio.ByteBuffer;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class serverThread implements Runnable {
	Socket useSoc;
	File writeFile;
	StringBuilder sb;
	boolean saveData;
	byte test[] = null;
	
	public serverThread(Socket useSoc, File writeFile) {
		this.useSoc = useSoc;
		this.writeFile = writeFile;
	}
	
	public synchronized void writeToFile(File writeFile, StringBuilder sb) {
		try {
			PrintWriter pw = new PrintWriter(new FileOutputStream(writeFile,true));
			pw.write(sb.toString());
			pw.close();
			sb.delete(0, sb.length());
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void run() {
		while(true) {
	        StringBuilder sb = new StringBuilder();
			
	        try {
				SAXParserFactory factory = SAXParserFactory.newInstance();
				SAXParser parser = factory.newSAXParser();
				DefaultHandler handler = new DefaultHandler() {
					
					boolean STN = false;
					boolean DATE = false;
					boolean TIME = false;
					boolean TEMP = false;
					boolean DEWP = false;
					boolean STP = false;
					boolean SLP = false;
					boolean VISIB = false;
					boolean WDSP = false;
					boolean PRCP = false;
					boolean SNDP = false;
					boolean FRSHTT = false;
					boolean CLDC = false;
					boolean WNDDIR = false;
				
					public void startElement(String uri, String localName,String qName,
				                Attributes attributes) throws SAXException {
						
						if (qName.equalsIgnoreCase("STN")) {
							STN = true;
						}

						if (qName.equalsIgnoreCase("DATE")) {
							DATE = true;
						}

						if (qName.equalsIgnoreCase("TIME")) {
							TIME = true;
						}
						
						if (qName.equalsIgnoreCase("TEMP")) {
							TEMP = true;
						}

						if (qName.equalsIgnoreCase("DEWP")) {
							DEWP = true;
						}

						if (qName.equalsIgnoreCase("STP")) {
							STP = true;
						}
						
						if (qName.equalsIgnoreCase("SLP")) {
							SLP = true;
						}
						if (qName.equalsIgnoreCase("VISIB")) {
							VISIB = true;
						}
						
						if (qName.equalsIgnoreCase("WDSP")) {
							WDSP = true;
						}

						if (qName.equalsIgnoreCase("PRCP")) {
							PRCP = true;
						}
						
						if (qName.equalsIgnoreCase("SNDP")) {
							SNDP = true;
						}
						
						if (qName.equalsIgnoreCase("FRSHTT")) {
							FRSHTT = true;
						}
						
						if (qName.equalsIgnoreCase("CLDC")) {
							CLDC = true;
						}
						
						if (qName.equalsIgnoreCase("WNDDIR")) {
							WNDDIR = true;
						}
					}
						
					public void endElement(String uri, String localName,
							String qName) throws SAXException {
					}

					public void characters(char ch[], int start, int length) throws SAXException {
						
						ByteBuffer buf = ByteBuffer.allocate(4);
						
						/* STN fits in int: 4 bytes. */
						if (STN) {
							String temp = new String(ch, start, length).replace("\n", "");
							int test2 = Integer.parseInt(temp);
							buf.putInt(test2);
							byte temparr[] = buf.array();
							for(int i = 0; i < 4; i++) {
								try{
									test[i] = temparr[i];
								} catch(Exception e) {
									e.printStackTrace();
								}
							}
								
							STN = false;
						}
							
						if (DATE) {
							String temp = new String(ch, start, length).replace("\n", "");
							sb.append(temp);
							sb.append(',');
							DATE = false;
						}

						if (TIME) {
							String temp = new String(ch, start, length).replace("\n", "");
							sb.append(temp);
							sb.append(',');
							TIME = false;
							
							
							String arr[] = temp.split(":");
							System.out.println(arr[2]);
							if(arr[2].equals("00") || arr[2].equals("01") || arr[2].equals("30") || arr[2].equals("31")) {
								saveData = true;
								System.out.println("helo");
							}else {
								sb.delete(0, sb.length());
								saveData = false;
							}
						}

						if (TEMP) {
							String temp = new String(ch, start, length).replace("\n", "");
							float test2 = Float.parseFloat(temp);
							buf.putFloat(test2);
							byte temparr[] = buf.array();
							for(int i = 0; i < 4; i++) {
								try{
									test[i+12] = temparr[i];
								} catch(Exception e) {
									e.printStackTrace();
								}
							}
							TEMP = false; 
						}
						if (DEWP) {
							String temp = new String(ch, start, length).replace("\n", "");
							float test2 = Float.parseFloat(temp);
							buf.putFloat(test2);
							byte temparr[] = buf.array();
							for(int i = 0; i < 4; i++) {
								try{
									test[i+16] = temparr[i];
								} catch(Exception e) {
									e.printStackTrace();
								}
							}
							DEWP = false; 
						}
						if (STP) {
							String temp = new String(ch, start, length).replace("\n", "");
							float test2 = Float.parseFloat(temp);
							buf.putFloat(test2);
							byte temparr[] = buf.array();
							for(int i = 0; i < 4; i++) {
								try{
									test[i+20] = temparr[i];
								} catch(Exception e) {
									e.printStackTrace();
								}
							}
							STP = false; 
						}
						if (SLP) {
							String temp = new String(ch, start, length).replace("\n", "");
							float test2 = Float.parseFloat(temp);
							buf.putFloat(test2);
							byte temparr[] = buf.array();
							for(int i = 0; i < 4; i++) {
								try{
									test[i+24] = temparr[i];
								} catch(Exception e) {
									e.printStackTrace();
								}
							}
							SLP = false; 
						}
						if (VISIB) {
							String temp = new String(ch, start, length).replace("\n", "");
							float test2 = Float.parseFloat(temp);
							buf.putFloat(test2);
							byte temparr[] = buf.array();
							for(int i = 0; i < 4; i++) {
								try{
									test[i+28] = temparr[i];
								} catch(Exception e) {
									e.printStackTrace();
								}
							}
							VISIB = false; 
						}
						if (WDSP) {
							String temp = new String(ch, start, length).replace("\n", "");
							float test2 = Float.parseFloat(temp);
							buf.putFloat(test2);
							byte temparr[] = buf.array();
							for(int i = 0; i < 4; i++) {
								try{
									test[i+32] = temparr[i];
								} catch(Exception e) {
									e.printStackTrace();
								}
							}
							WDSP = false; 
						}
						if (PRCP) {
							String temp = new String(ch, start, length).replace("\n", "");
							sb.append(temp);
							sb.append(',');
							PRCP = false; 
						}
						if (SNDP) {
							String temp = new String(ch, start, length).replace("\n", "");
							sb.append(temp);
							sb.append(',');
							SNDP = false; 
						}
						if (FRSHTT) {
							String temp = new String(ch, start, length).replace("\n", "");
							sb.append(temp);
							sb.append(',');
							FRSHTT = false; 
						}
						if (CLDC) {
							String temp = new String(ch, start, length).replace("\n", "");
							sb.append(temp);
							sb.append(',');
							CLDC = false; 
						}
						if (WNDDIR) {
							String temp = new String(ch, start, length).replace("\n", "");
							sb.append(temp);
							sb.append("\n");
							
							WNDDIR = false;
						}
						
						
						if(saveData && sb.toString().contains("\n")) {
							System.out.println("hello");
							writeToFile(writeFile, sb);
						}else if(sb.toString().contains("\n")) {
							sb.delete(0, sb.length());
						}
						
						

					}
					
					
				};
				InputStream stream = useSoc.getInputStream();
				parser.parse(stream, handler);
			}catch (Exception e) {
				System.out.println("No data on socket");
			}
			
	}
		}
		
		
		
		
		
		
		/*while(true) {
		try
		(
		PrintWriter out =
				new PrintWriter(useSoc.getOutputStream(), true);
		BufferedReader in = new BufferedReader(
				new InputStreamReader(useSoc.getInputStream()));
		)
			{
				String inputln;
				while((inputln = in.readLine()) != null) 
				{
					System.out.println(inputln);
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}*/
	}

