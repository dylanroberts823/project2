//If there is no username, get one via a prompt. Else, display it!
//Check if there is a username
if(!localStorage.getItem('current_channel')){
  //If there isn't prompt them for one
  var current_channel = "General"
  localStorage.setItem('current_channel', current_channel);
}
//Test to be sure name was properly stored
console.log(localStorage.getItem('current_channel'));


document.addEventListener('DOMContentLoaded', () => {
  //Display name inside text body
  document.querySelector('#channel_display').innerHTML = localStorage.getItem('current_channel');

  //On selecting channel in drop down, change channel
  document.querySelectorAll('.dropdown-item').forEach(button => {
      button.onclick = () => {
          const selection = button.dataset.channel;
          localStorage.setItem('current_channel', selection);
          document.querySelector('#channel_display').innerHTML = localStorage.getItem('current_channel');
      };
  });

});
