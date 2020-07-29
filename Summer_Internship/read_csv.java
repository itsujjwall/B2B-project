package customer_data;


import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.sql.SQLException;
import java.util.ArrayList;

import java.text.SimpleDateFormat;  




public class read_csv 
{
	@SuppressWarnings("unused")
	public static void main(String[] args)throws FileNotFoundException,IOException,SQLException,ClassNotFoundException,Exception {
		System.out.println("Csv object creating");
		read_csv s=new read_csv();
		System.out.println("Csv object created");
		ArrayList<POJO> al = s.arraylist(); //Array list is used as a dynamic array for storing elements
		System.out.println("Array List Created");
		main m = new main(al);
		
	}
		
	public ArrayList<POJO> arraylist()
	{
		Reader rdr=null;
		BufferedReader bfrdr=null;
	
		Writer wtr=null;
		BufferedWriter bfwtr=null;
		ArrayList<POJO> al = new ArrayList<>();
		
		try {
			
			rdr=new FileReader("C:\\Users\\KIIT\\OneDrive\\Desktop\\MACHINE LEARNING\\HighRadius\\PHASE 2\\Data Uploading.csv");
			bfrdr=new BufferedReader(rdr);
			
			String s=null;
			s=bfrdr.readLine();
			s=bfrdr.readLine();
			
			
			while((s=bfrdr.readLine())!=null) {
                String[] words = s.split(",",-1); 
                for(int i = 0; i <words.length; i++)
                {
                    if(words[i].isEmpty())
                    {
                        words[i] = null;
                    }
                }

                
                SimpleDateFormat formatter2=new SimpleDateFormat("dd-MM-yyyy");  
                SimpleDateFormat formatter3=new SimpleDateFormat("dd/MM/yyyy");
                POJO p=new POJO();
                p.setAcct_doc_header_id(Integer.parseInt(words[0]));
                p.setCompany_id(Integer.parseInt(words[1]));
                p.setDocument_number(Integer.parseInt(words[2]));
                p.setDocument_number_norm(Integer.parseInt(words[3]));
                p.setBusiness_code(words[4]);
               
                p.setCreate_year(words[5]==null?2022:Integer.parseInt(words[5]));
                p.setDocument_line__number(words[6]==null?-1:Integer.parseInt(words[6]));
                p.setDoctype(words[7]==null?"null":words[7]);
                p.setCustomer_number(words[8]==null?-1:Integer.parseInt(words[8]));
                p.setCustomer_number_norm(words[9]==null?-1:Integer.parseInt(words[9]));
                p.setFk_customer_map_id(words[10]==null?-1:Integer.parseInt(words[10]));
                p.setCustomer_name(words[11]==null?"null":words[11]);
                p.setDivision(words[12]==null?"null":words[12]);
                p.setDocument_create_date(words[13]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[13]));
                p.setDocument_create_date_norm(words[14]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[14]));
                p.setPosting_date(words[15]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[15]));
                p.setPosting_date_norm(words[16]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[16]));
                p.setPosting_id(words[17]==null?"null":words[17]);
                p.setDue_date(words[18]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[18]));
                p.setDue_date_norm(words[19]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[19])) ;
                p.setOrder_date(words[20]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[20]));
                p.setOrder_date_norm(words[21]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[21]));
                p.setInvoice_id(words[22]==null?-1:Integer.parseInt(words[22]));
                p.setInvoice_id_norm(words[23]==null?-1:Integer.parseInt(words[23]));
                p.setBaseline_create_date(words[24]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[24]));
                p.setInvoice_date_norm(words[25]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[25]));
                p.setTotal_open_amount(words[26]==null?-1:Float.parseFloat(words[26]));
                p.setTotal_open_amount_norm(words[27]==null?-1:Float.parseFloat(words[27]));
                p.setCust_payment_terms(words[28]==null?-1:Integer.parseInt(words[28]));
                p.setBusiness_area(words[29]==null?"null":words[29]);
               try {
            	 
                
                if(words[30].contains("/"))
                	p.setShip_date(formatter3.parse(words[30]));
                else
                	p.setShip_date(formatter2.parse(words[30]));
                
               }
               catch(Exception e)
               {
            	   System.out.println("Exception occured while reading and writing the setship data:"+e);
            	   p.setShip_date(formatter3.parse("00/00/0000"));
               }
               // p.setShip_date(words[30]==null?formatter3.parse("00/00/0000"): if(words[30].contains('/'))  formatter2.parse(words[30]); else formatter2.parse(words[30]);//formatter3.parse(words[30]));                 
               finally {
                p.setShip_to(words[31]==null?"null":words[31]);
                p.setClearing_date(words[32]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[32]));
                p.setClearing_date_norm(words[33]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[33]));
                p.setReason_code(words[34]==null?"null":words[34]);
                p.setIsOpen(words[35]==null?-1:Integer.parseInt(words[35]));
                p.setDiscount_due_date_norm(words[36]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[36]));
                p.setDebit_credit_indicator(words[37]==null?"null":words[37]);
                p.setPayment_method(words[38]==null?"null":words[38]);
                p.setDocument_creation_date(words[39]==null?formatter2.parse("00-00-0000"):formatter2.parse(words[39]));
                p.setInvoice_amount_doc_currency(words[40]==null?-1:Float.parseFloat(words[40]));
                p.setDocument_id(words[41]==null?-1:Integer.parseInt(words[41]));
                p.setActual_open_amount(words[42]==null?-1:Float.parseFloat(words[42]));
                p.setPaid_amount(words[43]==null?null:Float.parseFloat(words[43]));
                p.setDayspast_due(words[44]==null?-1:Integer.parseInt(words[44]));
                p.setInvoice_age(words[45]==null?-1:Integer.parseInt(words[45]));
                p.setDisputed_amount(words[46]==null?-1:Float.parseFloat(words[46]));
                al.add(p); 
               }
			}	
			
		}
		catch(Exception e){
			System.out.println("Exception occured while reading and writing the file:"+e);
		}
		
		
		finally {
			//for Reading time exceptions
			try {
				if(bfrdr!=null)
					bfrdr.close();
			}
			catch(Exception e){
				System.out.println("Could not close BufferedReader:"+e);
			}
			
			try {
				if(rdr!=null)
					rdr.close();
			}
			catch(Exception e){
				System.out.println("Could not close Reader:"+e);
			}
			
			//for writing exceptions
			try {
				if(bfwtr!=null)
					bfwtr.close();
			}
			catch(Exception e){
				System.out.println("Could not close BufferedWriter:"+e);
			}
			
			try {
				if(wtr!=null)
					rdr.close();
			}
			catch(Exception e){
				System.out.println("Could not close Writer:"+e);
			}
		}
		return al;	
	}
               

}
