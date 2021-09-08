// Global vars
// the navigation menu 
const navBarList = document.querySelector('#navbar__list');
//the container for the section "main"
const sectionsContainer = document.querySelector('main');

/**
* @description Build the navigation menu based on the sections existing on the page
*/
function buildUL() {
  const allSections = document.querySelectorAll('section');
  for (let i = 0; i < allSections.length; i++) {
    const curSection = allSections[i];
    const link = document.createElement('a');
    const newItem = document.createElement('li');
    const paragraphs = curSection.firstElementChild.querySelectorAll('p');

    // add click listener to show/hide section content based on click event
    curSection.addEventListener('click', () => {
      if (paragraphs[0].style.display === "block" || paragraphs[0].style.display === "") {
        paragraphs[0].style.display = "none";
        paragraphs[1].style.display = "none";
      } else {
        paragraphs[0].style.display = "block";
        paragraphs[1].style.display = "block";
      }
    });

    addMenuItem(curSection.id, i + 1, false);
  }

  const lastItem = document.createElement('li');
  lastItem.innerHTML = `<a href="#addNewSection"  class='menu__link'>addNewSection</a>`;
  lastItem.addEventListener('click', (evt) => {
    evt.preventDefault();
    addNewSection();
  });
  navBarList.insertAdjacentElement('afterbegin', lastItem);
}

/**
* @description Remove active state from the navagtion menu item that is currently active
*/
function removeActiveState() {
  const activeListItem = document.querySelectorAll('.active');
  if (activeListItem != null)
    for (const item of activeListItem)
      item.classList.remove('active');
}

/**
* @description Adding a link to the navigation menu to point to the new section created
* @constructor
* @param {string} sectionID - The created section identifier
*/
function addMenuItem(sectionID, sectionsNum, highlight) {
  const link = document.createElement('a');
  const newItem = document.createElement('li');

  link.href = `#${sectionID}`;
  link.classList.add('menu__link');
  link.textContent = `${sectionID}`;

  newItem.id = `li-${sectionsNum}`;
  removeActiveState();
  if (highlight) newItem.classList.add('active');
  newItem.appendChild(link);
  navBarList.insertAdjacentElement('beforeend', newItem);

  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeActiveState();
    link.parentElement.classList.add('active');
    const sectionToNav = document.getElementById(`${sectionID}`);
    sectionToNav.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  });

}

/**
* @description Add new section called after user click on addNewSection in the navigation menu
*/
function addNewSection() {
  const allSections = document.querySelectorAll('section');
  const sectionsNum = allSections.length;
  const sectionID = `section${sectionsNum + 1}`;
  const newSection = document.createElement('section');

  //setting new section attributes
  newSection.id = sectionID;
  newSection.setAttribute('data-nav', sectionID);

  // create dummy section to fill the space of the new section
  newSection.innerHTML = `
    <div class="landing__container">
      <h2>${sectionID}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
      <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>`;
  //adding section to the sections container
  sectionsContainer.appendChild(newSection);
  addMenuItem(sectionID, sectionsNum + 1, true);
  // change the location to the new section
  location.href = `#${sectionID}`;
}

// the starting point calling the BuildUL function
buildUL();


//listener to detect the current section in the browser to mark it in the navigation menu
window.addEventListener('scroll', () => {
  const allSections = document.querySelectorAll('section');
  for (let i = 0; i < allSections.length; i++) {
    const curSection = allSections[i];
    if (isScrolledIntoView(curSection)) {
      removeActiveState();
      const secLI = document.querySelector(`#li-${i + 1}`);
      secLI.classList.add('active');
      const section = document.querySelector(`#section${i + 1}`);
      section.classList.add('active');
    }

  }
});

//utility function 
//https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling
/**
* @description check if an element is currently in viewport
* @constructor
* @param {HTMLElement} el - The element to be checked
*/
function isScrolledIntoView(el) {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;

  // Only completely visible elements return true:
  //const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  const isVisible = elemTop + 300 < window.innerHeight && elemBottom >= 0;
  return isVisible;
}


//go to top button
//https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  document.documentElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  setTimeout(() => {
    removeActiveState();
  }, 500);

}
