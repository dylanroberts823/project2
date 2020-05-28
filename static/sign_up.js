// Set starting value of counter to 0
if (!localStorage.getItem('user'))
    localStorage.setItem('user', "");
    

// Load current value of  counter
document.addEventListener('DOMContentLoaded', () => {

    // By default, submit button is disabled
    document.querySelector('#submit').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#user').onkeyup = () => {
        if (document.querySelector('#user').value.length > 0)
            document.querySelector('#submit').disabled = false;
        else
            document.querySelector('#submit').disabled = true;
    };

    document.querySelector('#user_display').innerHTML = localStorage.getItem('user');


    document.querySelector('#set-user').onsubmit = () => {
      // Create new item for list
      const user_temp = document.querySelector('#user').value;

      // Update user
      document.querySelector('#user_display').innerHTML = user_temp;
      localStorage.setItem('user', user_temp);
      console.log(user);

      // Clear input field and disable button again
      document.querySelector('#user').value = '';
      document.querySelector('#submit').disabled = true;

      // Stop form from submitting
      return false;
    };
});
