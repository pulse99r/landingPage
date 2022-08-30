/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Define Global Variables
 * 
*/
/**  Get the unordered list from the page            */
const navbarList = document.getElementById('navbar__list');

/* Gets the sections from the page                        */
const theSections = document.querySelectorAll('section');
const theSectionDivs = document.querySelectorAll('.landing__container');
/** 
    Captures the number of sections from length property 
    of the sections to be used as a counter in the loop 
    to create the navbar list items.                          */
const sectionCount = theSections.length; 

/*
    Captures the viewport height for use in determining  
    the position of the sections during scroll                 */
const vpHeight = window.innerHeight;

/**
 * End Global Variables
 *
 *  Start Helper Functions
 * 
*/

/* Create the list items for navbarList                   */

const navItems = (sections) => {
    let anchorTag = "";
    for (let i=0; i < sectionCount; i++) {
        /* Create the navigation list items          */
        const listItem = document.createElement('li');
        anchorTag = document.createElement('a');
        anchorTag.setAttribute("href", '#'+ sections[i].id);
        anchorTag.textContent = sections[i].dataset.nav;
        anchorTag.classList.add("menu__link")
        listItem.appendChild(anchorTag);
        navbarList.appendChild(listItem);
        anchorTag.addEventListener("click", (event) => {
            /* 
              The function scrollToSection performs the scroll to
              the section clicked                                    */
            scrollToSection(sections[i]);

            /*
              The remaining code in this anchorTag event listener
              highlight the clicked navigation tab by setting 
              it's background color to black and the text color to white */
             
            /*  get the nav anchor tag elements                         */
            const navElemAs = document.getElementsByTagName('a');
            
            /* gets the event target                                     */
            const aTagHref = event.target.getAttribute('href');
            /*
            Loop through and compare the anchor tag elements 
              with the clicked target, then set the matching anchor 
              tag background and text color, by adding the drk__color 
              class, while removing "drk__color" from any non-matching 
              anchor tag elements                                     */ 
            for (let j=0; j < sectionCount; j++) {    
                if(navElemAs[j].getAttribute("href") === aTagHref){
                    navElemAs[j].classList.add("drk__color");                    
                    theSections[i].classList.add("your-active-class");
                } else {
                    navElemAs[j].classList.remove("drk__color");
                    theSections[i].classList.remove("your-active-class");
                }
            } 
        });
    }
};

/*
  The scrollToSection function accepts one parameter, 'section' and  
  scrolls to that section of the page. The argument is based on the
  clicked section of the page.                                      */
function scrollToSection (section) {
    section.scrollIntoView({behavior: "smooth"});
}


/* 
   This statement calls the NavItems function to append the list 
   items to the unordered list element to create the navigation bar. */
navItems(theSections);


/* This event listener listens for scroll events and invokes 
   the setActiveClass function passing in the section currently in the
   viewport (currentSection), the position of the top (sectionPosition.top) 
   and the position of the bottom (sectionPosition.bottom)                  */
window.addEventListener("scroll", () =>{ 
    for(let j = 0; j <theSections.length; j++) {
        let currentSection = theSections[j].id;
        let sectionPosition = theSections[j].getBoundingClientRect();
        setActiveClass(currentSection,sectionPosition.top, sectionPosition.bottom);
    }
})

/* setActiveClass sets the the matching anchor tag background 
   and text color, by adding the drk__color class, while removing 
   "drk__color" from any non-matching anchor tag elements while 
   SCROLLING through the materials                               */
function setActiveClass (currentSection, topPosition, bottomPosition) {
    
    if (topPosition > 0 
        && topPosition < vpHeight
        && bottomPosition <= vpHeight){
        //console.log("section/top/bottom: \n",currentSection, topPosition, bottomPosition);
        let sectionId = currentSection;

        const navElements = document.getElementsByTagName("a");
        
        for (let i = 0; i<navElements.length; i++) {
            const navElementHref = navElements[i].getAttribute("href");
            if(navElementHref === "#"+sectionId) {
                navElements[i].classList.add("drk__color");
                theSections[i].classList.add("your-active-class");
            } else {
                navElements[i].classList.remove("drk__color");
                //theSectionDivs[i].classList.remove("landing__container");
                theSections[i].classList.remove("your-active-class")
            }
        }
    }   
}

    



