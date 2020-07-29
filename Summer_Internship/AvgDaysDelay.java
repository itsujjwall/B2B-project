package uiserver;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class AvgDaysDelay
 */
@WebServlet("/AvgDaysDelay")
public class AvgDaysDelay extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	public void closeResource(ResultSet rs) {
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
		String query = "SELECT AVG(dayspast_due) FROM customer_invoice;";
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			dbCon = DriverManager.getConnection(url+dbName,userName,userPass);
			stmt = dbCon.createStatement();
			rs = stmt.executeQuery(query);
			String data = null;
			while(rs.next()) {
				data = String.valueOf((int)rs.getDouble(1)) + " Days";
				
			}
			Gson gson = new Gson();
			HashMap<String,String> arr = new HashMap<>();
			arr.put("avgdaysdelay",data);
			PrintWriter ps = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			ps.print(gson.toJson(arr));
			ps.flush();
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
