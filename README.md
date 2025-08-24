# Alborz Shop Center

This is an online store application. In this application, users can create an account and purchase products offered on the site, as well as pay the invoice using the banking system. An online chat system with store support via WhatsApp is provided for this application. The store management can introduce new products for sale through the administration panel. Create product advertisements on the home page of the site or handle orders. There are other features that can be seen by launching the application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The things you need before installing the software.

- Microsoft Windows 10 or higher
- IIS web service
- Microsoft Visual Stadio 2019
- Microsoft Sql Server 2018
- Google Chrome

### Installation

A step by step guide that will tell you how to get the development environment up and running.

1. Installing Microsoft Visual Stadio
2. Installing Microsoft Sql Server
3. A database connection configuration must be created. Be sure to use the Visual Studio user secret feature. You must also configure the email sending system for when you have forgotten the password to the user area and it is possible to change the password by sending an email, and also for when the user has made his purchase and an email containing the purchase invoice is sent to the user. Below I will provide a configuration creation template.

{
"ConnectionStrings": {
"DefaultConnection": "Server=localhost;Database=AlborzShopCenter;User Id= Your user name;Password= Your password;Integrated Security=False;MultipleActiveResultSets=True"
},
"EmailConfiguration": {
"From": " Your email server",
"SmtpServer": " Your smtp server",
"Port": Your port server,
"Username": " Your user name",
"Password": " Your password"
},
}

Another configuration file named .env must be created in the following path for the PayPal banking system capabilities and the WhatsApp chat system and the site analysis system.

AlborzShopCenter\AlborzShopCenter\ClientApp

The template for this file can also be seen below.

BROWSER=none
REACT_APP_ClientId=" Your paypal client id"
GENERATE_SOURCEMAP=false
REACT_APP_TrackingId=" Your google analytics tracking id"
REACT_APP_PhoneNumber=" Your site WhatsApp number"
REACT_APP_AccountName=" Your WhatsApp account name"
REACT_APP_Logo="Images\\Icon\\ Your whatsApp Logo"

4. The application database is based on code first, which must be built using Entity Framework fork.

5. Publish the project and place it in the web service. Also set the site protocol to HTTPS.
6. Initialize the program by entering the site address along with the following:

- Your site url/api/Seed/CreateDefaultUsers
- Your site url/api/Seed/CreateUserAccess
- Your site url/api/Seed/CreateSettings

The program launch process has been completed.
