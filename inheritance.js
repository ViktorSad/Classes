/*
class User;
instance.info - get info about user
instanse.ownArticles - array of own articles
instance.addArticle(name, description) - addining new article
instance.getAllArticals() - get an array of all articles
*/

class User {
  articles = [];
  constructor(appInstance, login, firstName, lastName, email, password) {
    this.appInstance = appInstance;
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
    this.appInstance.database.forEach(el => {
      if (el.articles.length) articles.push(...el.articles);
    });
    return console.log(articles);
  }
}
/* 
instrance.addAdmin(login, firstName, lastName, email, password) - adding new Admin

instrance.addUser(login, firstName, lastName, email, password) - adding new user
instrance.deleteUser(login) - deleting the user
instance.showUsers() - show all the users

*/

class Admin extends User {
  constructor(appInstance, login, firstName, lastName, email, password) {
    super(appInstance, login, firstName, lastName, email, password);
  }
  addUser(login, firstName, lastName, email, password) {
    this.appInstance.database.push(
      new User(this.appInstance, login, firstName, lastName, email, password)
    );
  }
  addAdmin(login, firstName, lastName, email, password) {
    this.appInstance.database.push(
      new Admin(this.appInstance, login, firstName, lastName, email, password)
    );
  }

  deleteUser(login) {
    const user = this.appInstance.database.find(el => el.login);
    if (!user) return console.log('User is not exist');
    this.appInstance.database.splice(
      this.appInstance.database.indexOf(user) - 1,
      1
    );
  }
  showUsers() {
    console.log('Current user:');
    this.info;
    breaklines();
    console.log('List of users:');
    breaklines();
    this.appInstance.database.forEach(el => {
      el.info;
      breaklines();
    });
  }
}

/* 
initial parameters  - Jhon Smith is an admin 
instance.login(login, password) - login to the app

*/
class App {
  currentUser;
  constructor(login, firstName, lastName, email, password) {
    this.database = [
      new Admin(this, login, firstName, lastName, email, password),
    ];
  }

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

//////////////////////////////////////
//  Database 1

const myApp1 = new App('admin', 'Jhon', 'Smith', 'dssd@gmail.com', '123456'); // init app with new admin

myApp1.login('admin', '123456'); // Login to myApp1 as admin
myApp1.currentUser.addAdmin(
  'user123',
  'Antony',
  'Braun',
  'braun@yopop.com',
  'qwerty'
); // adding another admin
//
myApp1.currentUser.addUser(
  'user1',
  'Alex',
  'De Wos',
  'ali@icloud.com',
  'qwerty'
); //  Add another user
myApp1.currentUser.addUser(
  'user2',
  'Olivia',
  'Hernandez',
  'oliv@icloud.com',
  'olivia123'
); //  Add another user
myApp1.currentUser.addUser(
  'user3',
  'Alexander ',
  'Taylor',
  'alex@icloud.com',
  'alex123'
); //  Add another user
myApp1.currentUser.addUser(
  'user4',
  'Emma ',
  'Moore',
  'moore@icloud.com',
  'moore123'
); //  Add another user
myApp1.currentUser.addUser(
  'user5',
  'Benjamin',
  'Smith',
  'smith@icloud.com',
  'smith123'
); //  Add another user
myApp1.currentUser.addUser(
  'user6',
  'Ava Johnson',
  'Johnson',
  'ava@icloud.com',
  'qwerty'
); //  Add another user

breaklines();
breaklines();
myApp1.currentUser.showUsers(); // show all the users
breaklines();
// Adding Articles
myApp1.currentUser.addArticle('JS', 'JS Basic 7 weeks');
myApp1.currentUser.addArticle('HTML', 'HTML 5 days');
myApp1.currentUser.addArticle('CSS', 'CSS 3 days');
myApp1.currentUser.getAllArticles();
// Switch the user
myApp1.login('user6', 'qwerty');
myApp1.currentUser.addArticle('Monday', 'Monday is day off');
myApp1.currentUser.getAllArticles();
breaklines();

// ///////////////////////////
//  Database 2
const myApp2 = new App('admin', 'James', 'Miller', 'miller@gmail.com', '1351'); // init with new admin
myApp2.login('admin', '1351'); // Login as new admin
myApp2.currentUser.showUsers(); // show all users
myApp2.currentUser.addArticle('Python', ' Best for backEnd'); // Add articles
myApp2.currentUser.getAllArticles(); // show all the articals
