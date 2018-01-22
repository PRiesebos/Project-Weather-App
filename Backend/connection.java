/**
 * Created by jaron on 12/6/2017.
 */
import java.io.*;
import java.net.ServerSocket;
import java.net.*;
import java.sql.*;
import java.*;

public class connection {
    public static void main(String[] args) throws SQLException, ClassNotFoundException, IOException {

        /*Connection con = null;
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager.getConnection("jdbc:mysql://localhost/unwdmi?useSSL=false", "root", "root");
        Statement stmt = con.createStatement();
        ResultSet result = stmt.executeQuery("select * from unwdmi.stations where stn = 10010");
        while (result.next()) {
            System.out.println(result.getString(1));
            System.out.println(result.getString(2));
            System.out.println(result.getString(3));
            System.out.println(result.getString(4));
            System.out.println(result.getString(5));
            System.out.println(result.getString(6));


        }
        */
    	
        ServerSocket listener = new ServerSocket(7789);

        try {
            while (true) {
                Socket socket = listener.accept();
                try {
                    PrintWriter out =
                            new PrintWriter(socket.getOutputStream());
                    out.println();
                } finally {
                    socket.close();
                }
            }


        }
        finally {
            listener.close();
        }

    }

}
