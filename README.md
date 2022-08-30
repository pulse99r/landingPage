![kenti099](https://user-images.githubusercontent.com/97370716/187524076-6ca10796-ce0c-428e-a144-cb50e7f8ec61.jpeg)

# Landing Page Project

## Table of Contents

* [Instructions](#instructions)
* [Description](#Description)
* [Features](#Features)
* [Favorite Concept](#favorite)

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
This is primarily an exercise in manipulating the DOM. As a student at Udacity, this was the last
project for successfully completing the Front-End-Web-Development NanoDegree Course.

The project involves accessing the elements of a landing page, creating the navigation menu
using javaScript, and through JS program, functions, event listeners, dynamically manipulating 
the elements as the page is manipulated bia mouse clicks or scrolling.

##Features
* Dynamically build navigation menu with JS
* On click, dynamically update navigation menu items to indicate which item was clicked
* On click, dynamically scroll to selected section of page
* Dynamically set an "active state" flag for the section currently in the viewport


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
##Favorite

Setting the active class for the sections and highlighting the navigating tab was my
favorite aspect of building out the web page. For me there was a challeging learning 
process to determine how to select the proper element and compare based on a click or 
a scroll and the match up the element to be updated, as well as remove the class for 
elements not in focus. 
