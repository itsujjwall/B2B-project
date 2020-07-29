package org.datafetching;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;
//import com.highradius.uiserver.Pojo;
import com.mysql.cj.xdevapi.JsonArray;

import customer_data.POJO;

import java.sql.*;
import java.util.ArrayList;
import java.util.*;


@WebServlet("/ExtractData")
public class ExtractData extends HttpServlet {
	public void closeResource(ResultSet rs) {
		try {
			rs.close();
		}
		catch(Exception e) {
			//System.out.println(e);
			e.printStackTrace();
		}
	}
	public void closeResource(PreparedStatement rs) {
		try {
			rs.close();
		}
		catch(Exception e) {
			//System.out.println(e);
			e.printStackTrace();
		}
	}
	public void closeResource(Statement rs) {
		try {
			rs.close();
		}
		catch(Exception e) {
			//System.out.println(e);
			e.printStackTrace();
		}
	}
	public void closeResource(Connection rs) {
		try {
			rs.close();
		}
		catch(Exception e) {
			//System.out.println(e);
			e.printStackTrace();
		}
	}
	
	
	
	
	private static final long serialVersionUID = 1L;
    public ExtractData() {
        super();
    }
    @Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Connection dbCon = null;
		Statement stmt = null;
		ResultSet rs = null;
		String url = "jdbc:mysql://127.0.0.1:3306/project";
		String userName = "root";
		String userPass = "root";
		String query = "select * from customer_invoice";
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			dbCon = DriverManager.getConnection(url,userName,userPass);
			//System.out.println("Ok connected");
			stmt = dbCon.createStatement();
			rs = stmt.executeQuery(query);
			ArrayList<POJO> arr = new ArrayList<POJO>();
			while(rs.next()) {
				POJO obj = new POJO();
				obj.setPk_id(rs.getInt("pk_id"));
				obj.setAcct_doc_header_id(rs.getInt("acct_doc_header_id"));
				obj.setCompany_id(rs.getInt("company_id"));
				obj.setDocument_number(rs.getInt("document_number"));
				obj.setDocument_number_norm(rs.getInt("document_number_norm"));
				obj.setCustomer_number(rs.getInt("customer_number"));
				obj.setCustomer_number_norm(rs.getInt("customer_number_norm"));
				obj.setFk_customer_map_id(rs.getInt("fk_customer_map_id"));
				obj.setInvoice_id(rs.getInt("invoice_id"));
				obj.setInvoice_id_norm(rs.getInt("invoice_id_norm"));
				obj.setCust_payment_terms(rs.getInt("cust_payment_terms"));
				obj.setIsOpen(rs.getInt("isOpen"));
				obj.setDocument_id(rs.getInt("document_id"));
				obj.setDayspast_due(rs.getInt("dayspast_due"));
				obj.setInvoice_age(rs.getInt("invoice_age"));
				
				obj.setInvoice_amount_doc_currency(rs.getFloat("invoice_amount_doc_currency"));
				obj.setActual_open_amount(rs.getFloat("actual_open_amount"));
				obj.setPaid_amount(rs.getFloat("paid_amount"));
				obj.setDisputed_amount(rs.getFloat("disputed_amount"));
				obj.setTotal_open_amount(rs.getFloat("total_open_amount"));
				obj.setTotal_open_amount_norm(rs.getFloat("total_open_amount_norm"));
				
				obj.setCustomer_name(rs.getString("customer_name"));
				obj.setDivision(rs.getString("division"));
				obj.setPosting_id(rs.getString("posting_id"));
				obj.setBusiness_area(rs.getString("business_area"));
				obj.setShip_to(rs.getString("ship_to"));
				obj.setReason_code(rs.getString("reason_code"));
				obj.setDebit_credit_indicator(rs.getString("debit_credit_indicator"));
				obj.setPayment_method(rs.getString("payment_method"));
				obj.setDoctype(rs.getString("doctype"));
				obj.setCreate_year(rs.getInt("create_year"));
				obj.setBusiness_code(rs.getString("business_code"));
				
				obj.setDocument_create_date(rs.getDate("document_create_date"));
				obj.setDocument_create_date_norm(rs.getDate("document_create_date_norm"));
				obj.setPosting_date(rs.getDate("posting_date"));
				obj.setPosting_date_norm(rs.getDate("posting_date_norm"));
				obj.setDue_date(rs.getDate("due_date"));
				obj.setDue_date_norm(rs.getDate("due_date_norm"));
				obj.setOrder_date(rs.getDate("order_date"));
				obj.setOrder_date_norm(rs.getDate("order_date_norm"));
				obj.setBaseline_create_date(rs.getDate("baseline_create_date"));
				obj.setPosting_date_norm(rs.getDate("invoice_date_norm"));
				obj.setShip_date(rs.getDate("ship_date"));
				obj.setClearing_date(rs.getDate("clearing_date"));
				obj.setClearing_date(rs.getDate("clearing_date_norm"));
				obj.setDiscount_due_date_norm(rs.getDate("discount_due_date_norm"));
				obj.setDocument_creation_date(rs.getDate("document_creation_date"));
				
				
				arr.add(obj);
				}
			Gson gson = new Gson();
			JsonElement element = gson.toJsonTree(arr, new TypeToken<List<POJO>>() {}.getType());  
			com.google.gson.JsonArray jsonarray = element.getAsJsonArray();
			PrintWriter ps = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			
			ps.print(jsonarray);
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

