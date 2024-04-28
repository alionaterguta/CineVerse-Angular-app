# CineVerse Frontend Development with Angular

## Project description

Welcome to CineVerse! This project focuses on building the frontend interface for CineVerse using Angular. With a strong backend already in place, including a REST API and database, our goal is to create a seamless and engaging user experience.

**Key Features**

- **Welcome View:** The app displays a welcome view allowing users to log in or register an account.

- **Authentication:** Authenticated users can view all movies.

- **Single Movie View:** Clicking on a movie displays additional details in a single movie view.

- **Director View:** Users can access details about the director of the selected movie by clicking a button.

**Highlights**

- **One-Page Layout** - the application features a single-page layout, ensuring a smooth and intuitive user journey.

- **Angular Material** - for a visually appealing and responsive design.

## Used Technologies

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

- Angular: A powerful web application framework.
- Angular Material: A UI component library for Angular applications.
- RxJS: A library for reactive programming using Observables.

## Getting Started

- Clone this repository
- Install all the project dependencies:

       npm install

- Run the comand for a dev server and navigate to `http://localhost:8080/`. The application will automatically reload if you change any of the source files.

       ng serve --port 8080

## Deployment

Deploy your application to GitHub Pages.

- Create a new repository on GitHub

- In your terminal, run this command (replace `username` and `repository-name` with your data):

       git remote add origin https://github.com/<GitHub-username>/<repository-name>.git

- Add angular-cli-ghpages by running

       ng add angular-cli-ghpages

- To build your application, run the command (replace <repository-name> with your own repository name)

       ng deploy --base-href=/<repository-name>/

- The URL of your application will be then `https://<GitHub-username>.github.io/<repository-name>/`

Whenever you make any changes to your application's code, all you need to do is run the command:

       ng deploy --base-href=/<repository-name>/
