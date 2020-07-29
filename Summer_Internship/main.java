package customer_data;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;

public class main 
{
	public static void getConnection(ArrayList<POJO> obj) throws Exception,NullPointerException{
		   String url = "jdbc:mysql://localhost:3306/project";
		   String username = "root";
		   String password = "root";
		
		   Connection conn=null;
		  
		   Class.forName("com.mysql.jdbc.Driver");
		    conn = DriverManager.getConnection(url,username,password);
		   System.out.println("Connected");
		   PreparedStatement ps = conn.prepareStatement("INSERT INTO customer_invoice VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
	  try{
		  System.out.println("In try Block");
	   int pk=1;
	   
	   for(POJO ob:obj)
	   {
			  System.out.println("In Main Block");
		   ps = conn.prepareStatement("INSERT INTO customer_invoice VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		   ps.setInt(1, pk);
		  
		   ps.setInt(2,ob.getAcct_doc_header_id());
		   
		   ps.setInt(3,ob.getCompany_id());
		  
		   ps.setInt(4,ob.getDocument_number());
		  
		   ps.setInt(5,ob.getDocument_number_norm());
		   ps.setString(6,ob.getBusiness_code());
		   ps.setInt(7, ob.getCreate_year());
		   ps.setInt(8,ob.getDocument_line__number());
		   ps.setString(9,ob.getDoctype());
		   ps.setInt(10,ob.getCustomer_number());
		   ps.setInt(11,ob.getCustomer_number_norm());
		   ps.setInt(12,ob.getFk_customer_map_id());
		   ps.setString(13,ob.getCustomer_name());
		   ps.setString(14,ob.getDivision());
		   ps.setDate(15,new java.sql.Date(ob.getDocument_create_date().getTime()));//System.out.println("15");
		   ps.setDate(16, new java.sql.Date(ob.getDocument_create_date_norm().getTime()));//System.out.println("16");
		   ps.setDate(17,new java.sql.Date(ob.getPosting_date().getTime()));//System.out.println("17");
		   ps.setDate(18,new java.sql.Date(ob.getPosting_date_norm().getTime()));//System.out.println("18");
	       ps.setString(19, ob.getPosting_id());//System.out.println("19");
		   ps.setDate(20, new java.sql.Date(ob.getDue_date().getTime()));//System.out.println("20");
		   ps.setDate(21, new java.sql.Date(ob.getDue_date_norm().getTime()));//System.out.println("21");
		   ps.setDate(22, new java.sql.Date(ob.getOrder_date().getTime()));//System.out.println("22");
		   ps.setDate(23, new java.sql.Date(ob.getOrder_date_norm().getTime()));//System.out.println("23");
		   ps.setInt(24, ob.getInvoice_id());//System.out.println("24");
		   ps.setInt(25, ob.getInvoice_id_norm());//System.out.println("25");
		   ps.setDate(26, new java.sql.Date(ob.getBaseline_create_date().getTime()));//System.out.println("26");
		   ps.setDate(27, new java.sql.Date(ob.getInvoice_date_norm().getTime()));//System.out.println("27");
		   ps.setFloat(28, ob.getTotal_open_amount());//System.out.println("28");
		   ps.setFloat(29, ob.getTotal_open_amount_norm());//System.out.println("29");
		   ps.setInt(30, ob.getCust_payment_terms());//System.out.println("30");
		   ps.setString(31, ob.getBusiness_area());//System.out.println("31");
		   ps.setDate(32, new java.sql.Date(ob.getShip_date().getTime()));//System.out.println("32");
		   ps.setString(33, ob.getShip_to());//System.out.println("33");
		   ps.setDate(34, new java.sql.Date(ob.getClearing_date().getTime()));//System.out.println("34");
		   ps.setDate(35, new java.sql.Date(ob.getClearing_date_norm().getTime()));//System.out.println("35");
		   ps.setString(36, ob.getReason_code());//System.out.println("36");
		   ps.setInt(37, ob.getIsOpen());//System.out.println("37");
		   ps.setDate(38, new java.sql.Date(ob.getDiscount_due_date_norm().getTime()));//System.out.println("38");
		   ps.setString(39, ob.getDebit_credit_indicator());//System.out.println("39");
		   ps.setString(40, ob.getPayment_method());//System.out.println("40");
		   ps.setDate(41, new java.sql.Date(ob.getDocument_creation_date().getTime()));//System.out.println("41");
		   ps.setFloat(42, ob.getInvoice_amount_doc_currency());//System.out.println("42");
		   ps.setInt(43, ob.getDocument_id());//System.out.println("43");
		   ps.setFloat(44, ob.getActual_open_amount());//System.out.println("43");
		   ps.setFloat(45, ob.getPaid_amount());//System.out.println("44");
		   ps.setInt(46, ob.getDayspast_due());//System.out.println("45");
		   ps.setInt(47, ob.getInvoice_age());//System.out.println("46");
		   ps.setFloat(48, ob.getDisputed_amount());//System.out.println("47");
		   int i = ps.executeUpdate();
		   if(i == 1) {
		    	 System.out.println("success");
		   pk++;
	   }
		  
		   
}
	  } catch(Exception e){System.out.println(e);}
	  finally
	   {
		  System.out.println("In Finally Block");
	   ps.executeBatch();
		conn.close();
		ps.close();
	   }
	 }
	 
	 
	public main (ArrayList<POJO> obj) throws FileNotFoundException,IOException,SQLException,ClassNotFoundException,Exception
	{
		System.out.println("Main File execution started");
	 getConnection( obj);
	 System.out.println("Main file execution ends");
	 
	}


}
