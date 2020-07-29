package uiserver;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/SimpleSearchAll")
public class SimpleSearchAll extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public void closeResource(ResultSet rs) {
		try {
			rs.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	public void closeResource(PreparedStatement rs) {
		try {
			rs.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	public void closeResource(Statement rs) {
		try {
			rs.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	public void closeResource(Connection rs) {
		try {
			rs.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Connection dbCon = null;
		Statement stmt = null;
		ResultSet rs = null;
		String url = "jdbc:mysql://127.0.0.1:3306/";
		String dbName = "project";
		String userName = "root";
		String userPass = "root";
		try {
			String query = "SELECT customer_name,customer_number,SUM(actual_open_amount)\r\n" + 
					"FROM customer_invoice\r\n" + 
					"GROUP BY customer_name;";
			Class.forName("com.mysql.cj.jdbc.Driver");
			dbCon = DriverManager.getConnection(url+dbName,userName,userPass);
			//System.out.println("Ok connected");
			stmt = dbCon.createStatement();
			rs = stmt.executeQuery(query);
			ArrayList<HashMap<String,String>> data = new ArrayList<HashMap<String,String>>(); 
			while(rs.next()) {
				HashMap<String,String> hp = new HashMap<String,String>();
				hp.put("customer_name",rs.getString(1));
				hp.put("customer_number",rs.getString(2));
				hp.put("actual_open_amount",rs.getString(3));
				data.add(hp);
			}
			Gson gson = new Gson();
			String arr = gson.toJson(data);
			PrintWriter pw = response.getWriter();
			pw.write(arr);
			pw.flush();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally {
			closeResource(rs);
			closeResource(stmt);
			closeResource(dbCon);
		}
	}

}
