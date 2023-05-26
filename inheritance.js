/*
class User;
instance.info - get info about user
instanse.ownArticles - array of own articles
instance.addArticle(name, description) - addining new article
instance.getAllArticals() - get an array of all articles
*/

class User {
  articles = [];
  constructor(login, firstName, lastName, email, password) {
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
  get info() {
    console.log(
      `Login: ${this.login}\nFist Name: ${this.firstName}\nLast name: ${this.lastName}\nEmail: ${this.email}\nPassword: ${this.password}`
    );
    return this;
  }
  get ownArticles() {
    console.log(this.articles);
    return this;
  }

  addArticle(name, description) {
    this.articles.push({ author: this.login, name, description });
  }

  getAllArticles() {
    const articles = [];
    myApp.database.forEach(el => {
      if (el.articles.length) articles.push(...el.articles);
    });
    return console.log(articles);
  }
}
/* 
instrance.addAdmin(login, firstName, lastName, email, password) - adding new Admin

instrance.addUser(login, firstName, lastName, email, password) - adding new user
instrance.deleteUser(login) - deleting the user
all еру куые  methods are inherited from the class Гыук
*/

class Admin extends User {
  constructor(login, firstName, lastName, email, password) {
    super(login, firstName, lastName, email, password);
  }
  addUser(login, firstName, lastName, email, password) {
    myApp.database.push(new User(login, firstName, lastName, email, password));
  }
  addAdmin(login, firstName, lastName, email, password) {
    myApp.database.push(new Admin(login, firstName, lastName, email, password));
  }

  deleteUser(login) {
    const user = myApp.database.find(el => el.login);
    if (!user) return console.log('User is not exist');
    myApp.database.splice(myApp.database.indexOf(user) - 1, 1);
  }
  get showUsers() {
    return console.log(myApp.database);
  }
}

/* 
initial parameters  - Jhon Smith is an admin 
instance.login(login, password) - login to the app

*/
class App {
  database = [
    new Admin('admin', 'Jhon', 'Smith', 'smith@gmail.com', 'root12345'),
  ];
  currentUser;

  login(login, password) {
    const result = this.database.find(
      user => (user.login === login) & (user.password === password)
    );
    this.currentUser = result;
    result
      ? console.log(
          `You are logged in ${
            result instanceof Admin ? 'as an admin' : 'as an user'
          }!`
        )
      : console.log('Check your login or passsword');
  }
}

const breaklines = () => console.log('*'.padEnd(50, '*')); // just separate the output

// start
const myApp = new App();

myApp.login('admin', 'root12345'); // Login to myApp as admin
myApp.currentUser.addAdmin(
  'user123',
  'Antony',
  'Braun',
  'braun@yopop.com',
  'qwerty'
); // adding another admin

breaklines();
myApp.currentUser.addArticle('JS classes', ' this week'); // Adding an article
myApp.currentUser.ownArticles; // array of own articles

breaklines();
myApp.currentUser.addArticle('Node.js', 'next week'); // Add another article
myApp.currentUser.ownArticles; // get a list of own article
breaklines;
myApp.currentUser.addUser('logi', 'Alex', 'De Wos', 'ali@icloud.com', '12345'); //  Add another user
myApp.currentUser.showUsers; // show all users
breaklines();
myApp.currentUser.getAllArticles(); // show all articles
breaklines();
myApp.login('logi', '12345'); // Log in as 'logi'
breaklines();
myApp.currentUser.info; // get profile of 'logi'
breaklines();
myApp.currentUser.getAllArticles();
myApp.currentUser.addArticle('React', 'It takes some time');
breaklines();
myApp.currentUser.getAllArticles(); // get all articles
breaklines();
myApp.login('user123', 'qwerty');
breaklines;
myApp.currentUser.deleteUser('logi');
breaklines();
myApp.currentUser.showUsers;
