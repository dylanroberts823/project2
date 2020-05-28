//If there is no username, get one via a prompt. Else, display it!
//Check if there is a username
if(!localStorage.getItem('user')){
  //If there isn't prompt them for one
  var user = prompt("Please enter a username", "Username");
  while (user == null || user == "") {
    //If they refuse to do so, prompt them again
    user = prompt("Sorry, that's username is mandatory. Please enter a username", "Username");
  }
  //Set given username to local storage
  localStorage.setItem('user', user);
}
//Test to be sure name was properly stored
console.log(localStorage.getItem('user'));

//Display name inside text body
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#user_display').innerHTML = localStorage.getItem('user');
});
