create database Mandat2
GO
use Mandat2
GO



-- Table pour les clients
CREATE TABLE Clients (
    ClientID INT PRIMARY KEY IDENTITY(1,1),
    Username varchar(50) NOT NULL,
    Password varchar(50) NOT NULL,
    Email varchar(100) NOT NULL,
    PhoneNumber VARCHAR(20),
);

-- Table pour les coiffeurs
CREATE TABLE Coiffeurs (
    CoiffeurID INT PRIMARY KEY IDENTITY(1,1),
    Username varchar(50) NOT NULL,
    Password varchar(50) NOT NULL,
    Email varchar(100) NOT NULL,
    Location varchar(255),
    PhoneNumber VARCHAR(20),
    profilePic VARCHAR(MAX),
    ShopName varchar(50),
    ImageShop VARCHAR(MAX)
);



CREATE TABLE ListFav (
    ClientID INT NOT NULL,
    CoiffeurID INT NOT NULL,
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
    FOREIGN KEY (CoiffeurID) REFERENCES Coiffeurs(CoiffeurID)
);


CREATE TABLE Appointment (
    AppointmentID INT PRIMARY KEY IDENTITY(1,1),
    ClientID INT,
    CoiffeurID INT,
    ServiceID INT, -- New column for service ID
    Year INT,
    Month INT,
    Day INT,
    AppointmentTime INT,
    IsAvailable BIT,
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
    FOREIGN KEY (CoiffeurID) REFERENCES Coiffeurs(CoiffeurID),
    FOREIGN KEY (ServiceID) REFERENCES CoiffeurServices(ServiceID)
);


CREATE TABLE CoiffeurAvailability (
    CoiffeurID INT NOT NULL,
    DayOfWeek INT NOT NULL, -- 1: Sunday, 2: Monday, ..., 7: Saturday
    StartTime int NOT NULL,
    EndTime int NOT NULL,
    PRIMARY KEY (CoiffeurID, DayOfWeek),
    FOREIGN KEY (CoiffeurID) REFERENCES Coiffeurs(CoiffeurID)
);

INSERT INTO CoiffeurAvailability (CoiffeurID, DayOfWeek , StartTime, EndTime)
VALUES
    (2, 1, 9, 17), -- sunday, available from 9:00 AM to 5:00 PM
    (2, 2, 9, 17), -- monday, available from 9:00 AM to 5:00 PM
    (2, 3, 9, 17), -- tuesday, available from 9:00 AM to 5:00 PM
    (2, 4, 9, 17), -- wednesday, available from 9:00 AM to 5:00 PM
    (2, 5, 9, 17), -- thursday, available from 9:00 AM to 5:00 PM
    (2, 6, 9, 17), --friday
    (2, 7, 9, 17) --saturday

INSERT INTO CoiffeurAvailability (CoiffeurID, DayOfWeek , StartTime, EndTime)
VALUES
    (1, 1, 9, 17), -- sunday, available from 9:00 AM to 5:00 PM
    (1, 2, 9, 17), -- monday, available from 9:00 AM to 5:00 PM
    (1, 3, 9, 17), -- tuesday, available from 9:00 AM to 5:00 PM
    (1, 4, 9, 17), -- wednesday, available from 9:00 AM to 5:00 PM
    (1, 5, 9, 17), -- thursday, available from 9:00 AM to 5:00 PM
    (1, 6, 9, 17), --friday
    (1, 7, 9, 17) --saturday


    
select * from CoiffeurAvailability

select * from Appointment



-- Table pour les profils des clients
CREATE TABLE CoiffeurServices (
    ServiceID INT PRIMARY KEY IDENTITY(1,1),
    CoiffeurID INT NOT NULL,
    ServiceName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(10, 2),
    FOREIGN KEY (CoiffeurID) REFERENCES Coiffeurs(CoiffeurID)
);

select * from CoiffeurAvailability


--Table pour la liste des images des coiffeurs
CREATE TABLE CoiffeurPictures (
    PictureID INT PRIMARY KEY IDENTITY(1,1),
    CoiffeurID INT NOT NULL,
    Picture varchar(MAX) NOT NULL,
    CONSTRAINT FK_CoiffeurPictures_Coiffeurs FOREIGN KEY (CoiffeurID) REFERENCES Coiffeurs(CoiffeurID)
);




-- Table pour les avis des clients sur les coiffeurs
CREATE TABLE CoiffeurReviews (
    ReviewID INT PRIMARY KEY IDENTITY(1,1),
    ClientID INT NOT NULL,
    CoiffeurID INT NOT NULL,
    Rating INT,
    ReviewText NVARCHAR(MAX),
    CONSTRAINT FK_Reviews_Clients FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
    CONSTRAINT FK_Reviews_Coiffeurs FOREIGN KEY (CoiffeurID) REFERENCES Coiffeurs(CoiffeurID)
);




INSERT INTO Clients (Username, Password, Email)
VALUES 
('client1', 'password1', 'client1@example.com'),
('client2', 'password2', 'client2@example.com'),
('client3', 'password3', 'client3@example.com');

INSERT INTO Coiffeurs (Username, Password, Email, profilePic)
VALUES 
('coiffeur1', 'password1', 'coiffeur1@example.com', 'https://www.shutterstock.com/image-photo/barber-barbershop-hairdresser-beauty-salon-260nw-752120878.jpg'),
('coiffeur2', 'password2', 'coiffeur2@example.com', 'https://as2.ftcdn.net/v2/jpg/02/52/22/81/1000_F_252228190_0UhanUm8GKG6ySZPmUawxa16WBcm11sr.jpg'),
('coiffeur3', 'password3', 'coiffeur3@example.com', 'https://www.shutterstock.com/image-photo/smiling-woman-curly-red-hair-600nw-2403270217.jpg');

-- Inserting services for CoiffeurID 1
INSERT INTO CoiffeurServices (CoiffeurID, ServiceName, Description, Price)
VALUES (1, 'Haircut', 'Standard haircut service', 25.00),
       (1, 'Hair Coloring', 'Professional hair coloring service', 50.00),
       (1, 'Hair Styling', 'Specialized hair styling service', 30.00);

-- Inserting services for CoiffeurID 2
INSERT INTO CoiffeurServices (CoiffeurID, ServiceName, Description, Price)
VALUES (2, 'Beard Trim', 'Expert beard trimming service', 15.00),
       (2, 'Shave', 'Traditional straight razor shave', 20.00),
       (2, 'Haircut', 'Classic mens haircut', 20.00);


INSERT INTO Appointment (ClientID, CoiffeurID, ServiceID, Year, Month, Day, AppointmentTime, IsAvailable)
VALUES 
(1, 1, 1, 2024, 4, 1, 10, 1)


select * from Clients

select * from Coiffeurs

select * from Appointment

select * from CoiffeurAvailability

select * from ListFav

select * from CoiffeurReviews

select * from CoiffeurServices

select * from CoiffeurPictures
