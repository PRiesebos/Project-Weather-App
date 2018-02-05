package weatherapp;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class WeatherAppXmlParser {
	String xmlString;
	
	public WeatherAppXmlParser(String s) {
		this.xmlString = s;
	}
	
	public byte[] parseString() {
		byte test[] = new byte[470];
		StringBuilder sb = new StringBuilder();
		String s = this.xmlString;
		
		try {
			
			SAXParserFactory factory = SAXParserFactory.newInstance();
			SAXParser parser = factory.newSAXParser();
			DefaultHandler handler = new DefaultHandler() {
				
				//TODO: Change globaloffset to be increased at the end of each station.
				int globaloffset = -47;
				
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
					
					
					
					if (STN) {
						globaloffset += 47;
						String temp = new String(ch, start, length).replace("\n", "");
						int test2 = validateIntInput(temp);
						addInt(test2, 0 + globaloffset);
						STN = false;
					}
						
					if (DATE) {
						String temp = new String(ch, start, length).replace("\n", "");
						temp = temp.trim();
						sb.append(temp);
						//TODO: BUILD DATE STRING
						DATE = false;
					}

					if (TIME) {
						String temp = new String(ch, start, length).replace("\n", "");
						temp = temp.trim();
						sb.append(" ");
						sb.append(temp);
						String s = sb.toString();
						sb.delete(0, sb.length());
						Timeconversion tc = new Timeconversion();
						long timestamp = tc.timeConversion(s);
						// DEBUG STATEMENT
						// System.out.println(String.format("%s is %d", s, timestamp));
						byte[] temparr = ByteBuffer.allocate(8).putLong(timestamp).array();
						
						for (int i = 0; i < 8; i++) {
							try {
								test[i + 4 + globaloffset] = temparr[i];
							} catch(Exception e) {
								e.printStackTrace();
							}
						}
						TIME = false;
					}

					if (TEMP) {
						String temp = new String(ch, start, length).replace("\n", "");
						float test2 = validateFloatInput(temp);
						addFloat(test2, 12 + globaloffset);
						TEMP = false; 
					}
					
					if (DEWP) {
						String temp = new String(ch, start, length).replace("\n", "");
						float test2 = validateFloatInput(temp);
						addFloat(test2, 16 + globaloffset);
						DEWP = false; 
					}
					
					if (STP) {
						String temp = new String(ch, start, length).replace("\n", "");
						float test2 = validateFloatInput(temp);
						addFloat(test2, 20 + globaloffset);
						STP = false; 
					}
					
					if (SLP) {
						String temp = new String(ch, start, length).replace("\n", "");
						float test2 = validateFloatInput(temp);
						addFloat(test2, 24 + globaloffset);
						SLP = false; 
					}
					
					if (VISIB) {
						String temp = new String(ch, start, length).replace("\n", "");
						float test2 = validateFloatInput(temp);
						addFloat(test2, 28 + globaloffset);
						VISIB = false; 
					}
					
					if (WDSP) { //TODO: SHORT
						String temp = new String(ch, start, length).replace("\n", "");
						float tempfloat = validateFloatInput(temp);
						short test2 = (short) (tempfloat * 10);
						addShort(test2, 32 + globaloffset);
						WDSP = false; 
					}
					
					if (PRCP) {
						String temp = new String(ch, start, length).replace("\n", "");
						float test2 = validateFloatInput(temp);
						addFloat(test2, 34 + globaloffset);
						PRCP = false; 
					}
					if (SNDP) {
						String temp = new String(ch, start, length).replace("\n", "");
						float test2 = validateFloatInput(temp);
						addFloat(test2, 38 + globaloffset);
						SNDP = false; 
					}
					if (FRSHTT) {
						String temp = new String(ch, start, length).replace("\n", "");
						temp = temp.trim();
						byte b = 0;
						if (temp != null && !temp.isEmpty()) {
							b = Byte.parseByte(temp, 2);
						}
						try {
							test[42 + globaloffset] = b;
						} catch(Exception e) {
							e.printStackTrace();
						}
						FRSHTT = false; 
					}
					if (CLDC) { 
						String temp = new String(ch, start, length).replace("\n", "");
						float tempfloat = validateFloatInput(temp);
						short test2 = (short) (tempfloat * 10);
						addShort(test2, 43 + globaloffset);
						CLDC = false; 
					}
					if (WNDDIR) {
						String temp = new String(ch, start, length).replace("\n", "");
						short test2 = validateShortInput(temp);
						addShort(test2, 45 + globaloffset);
						WNDDIR = false;
					}
				}
				
				private void addFloat(float val, int offset) {
					byte temparr[] = ByteBuffer.allocate(4).putFloat(val).array();
					for(int i = 0; i < 4; i++) {
						try {
							test[i + offset] = temparr[i];
						}catch(Exception e) {
							e.printStackTrace();
						}
					}
				}
				
				private void addInt(int val, int offset) {
					byte temparr[] = ByteBuffer.allocate(4).putInt(val).array();
					for(int i = 0; i < 4; i++) {
						try {
							test[i + offset] = temparr[i];
						}catch(Exception e) {
							e.printStackTrace();
						}
					}
				}
				
				private void addShort(short val, int offset) {
					byte temparr[] = ByteBuffer.allocate(2).putShort(val).array();
					for(int i = 0; i < 2; i++) {
						try {
							test[i + offset] = temparr[i];
						}catch(Exception e) {
							e.printStackTrace();
						}
					}
				}
				
				private float validateFloatInput(String s) {
					float f=0;
					s = s.trim();
					if(s != null && !s.isEmpty()) {
						f = Float.parseFloat(s);
					}
					return f;
				}
				
				private int validateIntInput(String s) {
					int i = 0;
					s = s.trim();
					if(s != null && !s.isEmpty()) {
						i = Integer.parseInt(s);
					}
					return i;
				}
				
				private short validateShortInput(String s) {
					short i = 0;
					s = s.trim();
					if(s != null && !s.isEmpty()) {
						i = Short.parseShort(s);
					}
					return i;
				}
				
				
			};
			InputStream stream = new ByteArrayInputStream(s.getBytes(StandardCharsets.UTF_8.name()));
			parser.parse(stream, handler);
			//System.out.println("XML file parsed successfully to byte array.");
		} catch (Exception e) {
			System.out.println("An error occured while parsing.");
			e.printStackTrace();
		}
		return test;
	}
}
