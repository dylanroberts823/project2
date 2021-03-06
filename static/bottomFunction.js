//Thanks to https://www.w3schools.com/howto/howto_js_scroll_to_top.asp for the inspiration
//Get the button:
document.addEventListener('DOMContentLoaded', () => {
  mybutton = document.getElementById("myBtn");

  //On loading page, if window is smaller than document, hide button
  if (window.innerHeight + 100 >= document.body.offsetHeight){
    mybutton.style.display = "none";
    mybutton.className = "fixed-bottom mx-auto btn btn-info mb-2";
    mybutton.innerHTML = "Bottom"
  };

  // When the user scrolls down 50px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    //If we're at the bottom of the page, hide button
    if (window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight) {
      mybutton.style.display = "none";
      mybutton.className = "fixed-bottom mx-auto btn btn-info mb-2";
      mybutton.innerHTML = "Bottom"
    } else {
      mybutton.style.display = "block";
    }
  }
});
// When the user clicks on the button, scroll to the bottom of the document
function bottomFunction() {
  document.body.scrollTop = document.body.offsetHeight;
}
