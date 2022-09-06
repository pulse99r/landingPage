
//Global variables for the sections and the nav unordered list tag
const theSections = document.getElementsByTagName('section'); //document sections
const navUl = document.getElementById("navbar__list"); //UL nav tag

const sectionTops = []; //captures the positions of the tops of the sectiions
const sectionBottoms = []; //captures the positions of the bottoms of sections
let currrentSectionInView = ''; //section currently in viewport

function sectionPositions() {
    const footerPos = document.getElementById('footer').getBoundingClientRect().top + window.pageYOffset;

    for(let i = 0; i < theSections.length; i++) {
        //Tops of each section
        let theTops = theSections[i].getBoundingClientRect().top + window.pageYOffset;
        let theBottoms = theSections[i].getBoundingClientRect().bottom + window.pageYOffset;
        sectionTops[i] = theTops;
        sectionBottoms[i] = theBottoms
        if (i + 1 === theSections.length) { //This adds the top of the footer to the array, to help with checking the bottom of the last section. 
            sectionTops[i + 1] = footerPos;
        }
    }
    //console.log("*** SectionPositions: sectionTops: ", sectionTops);
}

//Clears the active 'state flag' for the Navigation Ancor Tags and and the sections
function clearActiveStates () {
    const anchorTags = document.getElementsByTagName('a');
    for(let i = 0; i < theSections.length; i++) {
        theSections[i].classList.remove('your-active-class');
        anchorTags[i].classList.remove('active__tag');
    } 
}
/*This function builds out the navigation list items with a tags and appends 
them to the the navigation ul for the menu. */  
function buildNavItems (){
    for(let i=0; i<theSections.length; i++){
        const listNavItems = document.createElement("li");
        const aNavTags = document.createElement('a');
        //get data-nav attribute from sections
        const aTextLabel = theSections[i].getAttribute('data-nav');
        aNavTags.innerHTML = aTextLabel;
        aNavTags.classList.add('menu__link');
        aNavTags.setAttribute("href","#" + theSections[i].id);
        aNavTags.setAttribute("data-id", theSections[i].id);
        listNavItems.append(aNavTags);
        navUl.append(listNavItems);
        /**listens for click event, moves to section indicated by 
         * click nav item updates the active states of the menu and the sections */ 
        aNavTags.addEventListener('click', function(ev) {
            ev.preventDefault(); 
            const clickedATag = ev.target.getAttribute('data-id');
            const destinationSection = document.getElementById(clickedATag);
            clearActiveStates();
            ev.target.classList.add('active__tag');
            destinationSection.classList.add('your-active-class')
            destinationSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}


/* keeps track of the scrolling position and updates the active states 
of both the sections in view and the menu a tags.*/
//handles the scrolling and updates the active tags and sections during scrolling
function doTheScroll() {
    /* 1. Get the scroll position (scrollPosition)
       2. Build a table of the tops of each section
       3. If the scroll position is betweem the top of Section A 
          and the top of Section B, then that section is in the 
          viewport.
       4. Update the active state for that section
    */
    const scrollPosition = window.pageYOffset;
    //console.log("scrollPosition ====>", scrollPosition)
    const navAncorTags = document.getElementsByTagName('a');

    const vpHeight = window.innerHeight;
    //console.log("viewport height: ", vpHeight, "scrollPosition: ", scrollPosition);
    for(let i = 0; i < theSections.length; i++){
        let sectionATop = sectionTops[i];
        let sectionBTop = sectionTops[i+1];
        let sectionABottom = sectionBottoms[i]
        
        if(scrollPosition + 20 >= sectionATop 
            && scrollPosition <= sectionBTop && sectionATop > vpHeight/6) { 
            // console.log(theSections[i].id,"scrollPosition ",scrollPosition, "is greater than ", 
            // " sectionATop:", sectionATop, "and scrollPosition ",scrollPosition, 
            // "is LESS than sectionBTop", sectionBTop,
            // " and sectionABottom");
            clearActiveStates();
            navAncorTags[i].classList.add('active__tag');
            theSections[i].classList.add('your-active-class');
        }
    }
}


buildNavItems();
sectionPositions()
window.addEventListener('scroll', (event) => {
    //event.preventDefault()
    doTheScroll(event)
    
});



  