# README – System ogłoszeniowy

## Nazwa projektu: Otoszroto

### Technologie:
- ASP.NET Core
- MediatR
- Entity Framework Core
- AutoMapper
- React
- Bootstrap
- Identity Framework
- Azure Blob Storage

---

## Opis:
Otoszroto to aplikacja webowa umożliwiająca dodawanie, wyświetlanie i zarządzanie ogłoszeniami. Projekt opiera się na architekturze CQRS z wykorzystaniem biblioteki MediatR, co pozwala na oddzielenie logiki zapisu (Command) od logiki odczytu (Query).

Aplikacja została zaprojektowana w oparciu o Vertical Slice Architecture – każde use-case (np. tworzenie ogłoszenia) stanowi osobny, niezależny fragment systemu zawierający wszystko, co potrzebne do jego działania (np. endpoint, handler, DTO, logikę biznesową).

System uwierzytelniania został zbudowany na bazie ASP.NET Identity Framework, wykorzystującego mechanizm ciasteczek. Zdjęcia dodawane do ogłoszeń są przechowywane w Azure Blob Storage. Aplikacja integruje się również z Deepseek API, umożliwiając użytkownikom analizę treści ogłoszenia z pomocą AI.

Frontend stworzono w React z użyciem Bootstrap do stylizacji.

---

## Główne funkcje:
- Tworzenie, edycja i usuwanie ogłoszeń  
- Przeglądanie ogłoszeń z filtrowaniem i wyszukiwaniem  
- Rejestracja i logowanie użytkowników (Identity + cookies)  
- Przesyłanie zdjęć do ogłoszeń (Azure Blob Storage)  
- Konsultacja ogłoszenia z AI (Deepseek API)  
- Oddzielona logika zapisu i odczytu (CQRS)  
- Implementacja w podejściu Vertical Slice Architecture  

---

## Architektura backendu:
- CQRS – Command i Query jako oddzielne operacje  
- Vertical Slice Architecture – każdy przypadek użycia to niezależny slice (Endpoint + Handler + DTO + Logika)  
- MediatR – mediator między endpointem a handlerem  
- AutoMapper – automatyczne mapowanie między DTO i encjami  
- Identity Framework – uwierzytelnianie i zarządzanie kontami użytkowników  
- Azure Blob Storage – przechowywanie zdjęć  
- Deepseek API – integracja z AI  

---

## Struktura folderów backendu:
- `Features/` – vertical slices: oddzielne foldery dla każdego use-case (np. CreateAnnouncement)  
- `Domain/` – encje bazy  
- `Infrastructure/` – logika dostępu do bazy  
- `Migrations/` – migracje bazy  

---

## Wymagania systemowe:
- .NET 9 SDK  
- PostgreSQL (lub inna baza zgodna z EF Core)  
- Node.js  
- Azure Blob Storage (azurite do działania lokalnego lub konto + kontener)  
- Klucz API do Deepseek  
- Przeglądarka internetowa  

---

## Instrukcja uruchomienia backendu:
  1. Przejdź do katalogu `API`  
  2. Wykonaj migrację bazy danych:  
    `dotnet ef database update`
  3. Uruchom aplikację:
    `dotnet run`
  4. Aby dostać się do Swagger UI, dodaj do adresu URL:
    `/swagger/index.html`



## Upewnij się, że zmienne środowiskowe są poprawnie skonfigurowane (plik `appsettings.json`), np.:
    • `DefaultConnection` – connection string do bazy danych
    • `BlobStorage` – dane dostępowe do konta Azure
    • `Deepseek.ApiKey` – klucz do modelu AI


   
## Uruchom azurite przez npm (jeśli stawiasz bazę azure lokalnie):
    1. `npm install -g azurite`
    2. `azurite`

  ---
  
## Instrukcja uruchomienia frontendu:
    1. Przejdź do katalogu `Frontend`
    2. Zainstaluj zależności:
      `npm i`
    3. Uruchom aplikację:
      `npm run dev`

---

Autor: 
Dawid Turzański
