# B2B-project
### To Build an AI-Enabled FinTech B2B Invoice Management Application Using ReactJs,Jdbc,Java and JSP.
 * Build a responsive Receivables Dashboard and a Customer Details Page.
 * Visualize Data in the form of Interactive Charts.
 * Integrate and Deploy the ML model for predicting the first partial amount and the Professor Bot.
 
### Prerequisites-
  * Python for Machine Learning
  * Java,Jdbc and database sql concept for data loading and creating backend api
  * HTML,CSS and JavaScripts for building UI 
  * Node Js
### Software Used:
   * Anaconda and Jupyter Notebook
   * DialogFlow to integrate chatbot
   * Pycharm for creating Flask Api
   * Eclipse IDE for writing Java Program
   * Node Js and React for UI building

### Dialogflow Integration:
   https://dialogflow.cloud.google.com/#/agent/professorbot-tfqlcs/intents
   # What is Dialogflow?
    It is an end-to-end, build once deploy everywhere development suite for creating conversations interfaces  for websites, mobile applications,
    popular managing platforms & IOT devices.
   # Dialogflow Agents
    Virtual agent that handles conversation with your end user.
   # Intents
     Intension of the end user(the question that end user ask).
   # Training Phases
     In how many different ways one can ask a particular type of question is called a variant or training phase of that intent.
   # Context
     Contexts are used to maintain a conversational flow with the end user.
   # Entity
     It defines the type of information we want to extract from the user input.
   # Responses
     The answers our bot will be giving are the responses.
   ### For reference purpose:
   https://cloud.google.com/dialogflow/docs
### Few Do's and Dont's
  * There should be variancy in training phrases
  * Do not use any special character while training variants
  * Keep minimum 15 variants for training that intent
  * If we've similar types of intents, it is necessary to keep same number of variants in all those intents in order to avoid misfiring.
    
### Glimpse of my Project:

![UI](https://user-images.githubusercontent.com/55063393/89125319-40f68900-d4fb-11ea-8e08-14ecd4704bdf.PNG)
  * As part of the problem statement, the first partial payment amount of an invoice will be predicted.
  * The Predicted Button is located towards the right over the invoices grid.
  * Clicking on the Predicted button will populate the Predicted Payment Type and Predicted Amount column of the 
    grid with the predicted values derived from the ML model.

![ezgif com-gif-maker](https://user-images.githubusercontent.com/55063393/89126262-08a67900-d502-11ea-8a82-f75ceb28a7df.gif)

# Description
Account Receivables:
The B2B world operates differently from the B2C or C2C world. Business work with other business on credit.When a buyer business orders goods from the seller business, the seller business issues an invoice for the same. This invoice for the goods contains various information like the details of the goods purchased and when it should be paid.

Seller business interacts with various businesses and sells goods to all of them at various times.
Hence, the seller business needs to keep track of the total amount it owes from all the buyers.
This involves keeping track of all invoices from all the buyers. Each invoice will have various
important fields like a payment due date, invoice date, invoice amount, baseline date etc.
The buyer business needs to clear its amount due before the due date. However, in real-world
scenarios , the invoices are not always cleared ie. paid in full amount in one go. Instead, they
get paid in installments. These installments are known as partial payments.

## Professor Chat Bot-Digital Assistant
 * Most of us are familiar with the digital assistants such as Apple's Siri, Amazon's Alexa and so many more. Here we built our own chatbot Professor chatbot which is an AI
   enabled Digital Assistant.
 * It is capable of answering questions and helping with the work with just like a knowledgeable colleague, or a reilable resource.
 * Before following up with the customers, a collections analyst has to prepare for the call
   where he’s required to search through heaps of data, pulling up reports from multiple
   resources, analysing the data to find relevant information and so on.A lot of time is
   spent searching for a specific set of customer information(eg: Invoice details, open amount, payment history, deduction amount, etc) 
   before he makes a call. Our Professor Chat bot basically helps you to get quick answers and perform analytics to speed up this process.
 
 # UI Development
  ### 1. Header Section
    * Account name logo <ABC Products> on the left,
    * A label strip with receivables dashboard text in the middle.
    * Professor button on the right -Clicking on the professor button will open up the Professor Chatbot Window.
 ![header](https://user-images.githubusercontent.com/55063393/90160430-631bc100-ddaf-11ea-8430-392793046eec.png)
 ### 2. AR Statistics Section
    * Total Customer- Shows the total number of customers for the account
    * Total Open AR - Shows the total amount outstanding in the Account Receivables
    * Average Days Delay - Shows the Average Days Delay
    * Total Open Invoices - Gives the count of total open invoices
  ![AR](https://user-images.githubusercontent.com/55063393/90161016-2ac8b280-ddb0-11ea-8d50-2911c3275612.PNG)

 ### 3. Analytics Section
   * The section will display the account level analytics by using interactive charts.
   * The title of the chart is Total Amount By Company Code
   * The data is displayed in the form of Clickable horizontal bar charts
   * By clicking on a particular company code, will display the data corresponding to that company code everywhere else on the UI.
    ![analytics](https://user-images.githubusercontent.com/55063393/90161203-6e232100-ddb0-11ea-92e7-c83d56472e2b.PNG)
    






