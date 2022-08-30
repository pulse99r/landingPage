![kenti099](https://user-images.githubusercontent.com/97370716/187524076-6ca10796-ce0c-428e-a144-cb50e7f8ec61.jpeg)

# Landing Page Project

## Table of Contents

* [Instructions](#instructions)
* [Description](#Description)
* [Features](#Features)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the Udacity Classroom.

-----------------------
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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

## Description

##Features

##Variables
//Get the unordered list from the page
const navbarList = document.getElementById('navbar__list');

//Gets the sections from the page
const theSections = document.querySelectorAll('section');
const theSectionDivs = document.querySelectorAll('.landing__container');

Captures the number of sections from length property 
of the sections to be used as a counter in the loop 
to create the navbar list items.

const sectionCount = theSections.length; 


Captures the viewport height for use in determining  
the position of the sections during scroll                 */
const vpHeight = window.innerHeight;

Create the list items for navbarList                   */


The remaining code in this anchorTag event listener
highlight the clicked navigation tab by setting 
it's background color to black and the text color to white */
             
get the nav anchor tag elements                         */
const navElemAs = document.getElementsByTagName('a');
            
gets the event target                                     */

Loop through and compare the anchor tag elements 
with the clicked target, then set the matching anchor 
tag background and text color, by adding the drk__color 
class, while removing "drk__color" from any non-matching 
anchor tag elements.

The scrollToSection function accepts one parameter, 'section' and  
scrolls to that section of the page. The argument is based on the
clicked section of the page.                                      */



This statement calls the NavItems function to append the list 
items to the unordered list element to create the navigation bar.
            navItems(theSections);


Using a scroll event listener, we listen for scroll events and invokes 
the setActiveClass function passing in the section currently in the
viewport (currentSection), the position of the top (sectionPosition.top) 
and the position of the bottom (sectionPosition.bottom).

window.addEventListener("scroll", () =>{ 
    for(let j = 0; j <theSections.length; j++) {
        let currentSection = theSections[j].id;
        let sectionPosition = theSections[j].getBoundingClientRect();
        setActiveClass(currentSection,sectionPosition.top, sectionPosition.bottom);
    }
})

setActiveClass sets the the matching anchor tag background 
and text color, by adding the drk__color class, while removing 
"drk__color" from any non-matching anchor tag elements while 
SCROLLING through the materials.

function setActiveClass (currentSection, topPosition, bottomPosition) {
    
    if (topPosition > 0 
        && topPosition < vpHeight
        && bottomPosition <= vpHeight){
        //console.log("section/top/bottom: \n",currentSection, topPosition, bottomPosition);
        let sectionId = currentSection;
        
        const navElements = document.getElementsByTagName("a");
        
        for (let i = 0; i<navElements.length; i++) {
            const navElementHref = navElements[i].getAttribute("href");
            console.log(navElementHref)
            if(navElementHref === "#"+sectionId) {
                navElements[i].classList.add("drk__color");
                theSections[i].classList.add("your-active-class")
                //theSectionDivs[i].classList.add("landing__container");
                //console.log(`navElemenHref ${navElementHref} sectionID: #${sectionId}`);
                //console.log("Current Matching Nav Element: ", navElements[i].getAttribute('href'));
            } else {
                navElements[i].classList.remove("drk__color");
                //theSectionDivs[i].classList.remove("landing__container");
                theSections[i].classList.remove("your-active-class")
            }
        }
    }
    
}
