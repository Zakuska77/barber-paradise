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
    Availability varchar,
    ShopName varchar(50),
    ImageShop VARCHAR(MAX)
);


CREATE TABLE ListFav (
    ClientID INT NOT NULL,
    CoiffeurID INT NOT NULL,
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
    FOREIGN KEY (CoiffeurID) REFERENCES Coiffeurs(CoiffeurID)
);


create table Appointment(
    AppointmentID INT PRIMARY KEY IDENTITY(1,1),
    ClientID INT,
    CoiffeurID INT,
    AppointmentDateTime DATETIME,
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
    FOREIGN KEY (CoiffeurID) REFERENCES Coiffeurs(CoiffeurID),
    IsAvailable BIT
);

-- Table pour les profils des clients
CREATE TABLE CoiffeurServices (
    ServiceID INT PRIMARY KEY IDENTITY(1,1),
    CoiffeurID INT NOT NULL,
    ServiceName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(10, 2),
    FOREIGN KEY (CoiffeurID) REFERENCES Coiffeurs(CoiffeurID)
);


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


select * from Clients

select * from Coiffeurs


select * from Appointment


