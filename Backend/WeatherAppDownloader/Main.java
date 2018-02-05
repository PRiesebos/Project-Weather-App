package weatherappdownloader;

import java.io.IOException;

public class Main {
	public static void main(String[] args) throws IOException {
		System.out.println("Starting downloader...");
		new Thread(new Downloader()).start();
	}
}
