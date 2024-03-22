create database Mandat2
GO
use Mandat2
GO


-- Table pour les clients
CREATE TABLE Clients (
    ClientID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    Password NVARCHAR(50) NOT NULL, -- Stocker les mots de passe de manière sécurisée est crucial. Vous pouvez envisager des méthodes de hachage et de salage.
    Email NVARCHAR(100) NOT NULL,
    -- Ajoutez d'autres informations sur le client selon les besoins
);

-- Table pour les coiffeurs
CREATE TABLE Coiffeurs (
    CoiffeurID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    Password NVARCHAR(50) NOT NULL, -- Encore une fois, assurez-vous de stocker les mots de passe de manière sécurisée.
    Email NVARCHAR(100) NOT NULL,
    -- Ajoutez d'autres informations sur le coiffeur selon les besoins
);

-- Table pour les profils des clients
CREATE TABLE ClientProfiles (
    ProfileID INT PRIMARY KEY IDENTITY(1,1),
    ClientID INT NOT NULL,
    -- Ajoutez d'autres informations de profil client selon les besoins, telles que l'historique des rendez-vous, la liste des favoris, etc.
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID)
);

-- Table pour les profils des coiffeurs
CREATE TABLE CoiffeurProfiles (
    ProfileID INT PRIMARY KEY IDENTITY(1,1),
    CoiffeurID INT NOT NULL,
    -- Ajoutez d'autres informations de profil coiffeur selon les besoins, telles que les disponibilités, les services proposés, etc.
    FOREIGN KEY (CoiffeurID) REFERENCES Coiffeurs(CoiffeurID)
);

-- Table pour les rendez-vous
CREATE TABLE Appointments (
    AppointmentID INT PRIMARY KEY IDENTITY(1,1),
    ClientID INT NOT NULL,
    CoiffeurID INT NOT NULL,
    AppointmentDateTime DATETIME NOT NULL,
    -- Ajoutez d'autres informations sur le rendez-vous selon les besoins
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
    FOREIGN KEY (CoiffeurID) REFERENCES Coiffeurs(CoiffeurID)
);

-- Table pour les avis des clients sur les coiffeurs
CREATE TABLE CoiffeurReviews (
    ReviewID INT PRIMARY KEY IDENTITY(1,1),
    CoiffeurID INT NOT NULL,
    ClientID INT NOT NULL,
    Rating INT NOT NULL, -- Peut être une échelle de notation ou un score
    ReviewText NVARCHAR(MAX), -- Texte facultatif pour un commentaire
    -- Ajoutez d'autres informations sur l'avis selon les besoins
    FOREIGN KEY (CoiffeurID) REFERENCES Coiffeurs(CoiffeurID),
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID)
);


INSERT INTO Clients (Username, Password, Email)
VALUES 
('client1', 'password1', 'client1@example.com'),
('client2', 'password2', 'client2@example.com'),
('client3', 'password3', 'client3@example.com');

select * from Clients