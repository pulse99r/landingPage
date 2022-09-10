
//Global variables for the sections and the nav unordered list tag
const theSections = document.getElementsByTagName('section'); //document sections
const navUl = document.getElementById("navbar__list"); //UL nav tag
let navTagData = {}; //globally accessible nav anchor data-id attributes
let sectionTops = []; //captures the positions of the tops of the sectiions
let sectionBottoms = []; //captures the positions of the bottoms of sections
let currrentSectionInView = ''; //section currently in viewport
let buttonToShow = "";
let buttonAdded = false; //boolean value; true indicates the button has been added to the page.
let buttonDisplayed = false; //boolean value; set to true when the button is being displayed; set to false the button is hidden

//Determines the position of the sections using getBoundingClientRect
function sectionPositions() {
    const footerPos = document.getElementById('footer').getBoundingClientRect().top + window.pageYOffset;

    for(let i = 0; i < theSections.length; i++) {
        //Tops of each section
        let theTops = theSections[i].getBoundingClientRect().top + window.pageYOffset;
        let theBottoms = theSections[i].getBoundingClientRect().bottom + window.pageYOffset;
        sectionTops[i] = theTops;
        sectionBottoms[i] = theBottoms;
        if (i + 1 === theSections.length) { //This adds the top of the footer to the array, to help with checking the bottom of the last section. 
            sectionTops[i + 1] = footerPos;
        }
    }
}

//create a button that return to the top which is dynamically displayed 
//when the first section scrolls past the top of the page. CSS classes
//are used to show/hide the button.
function addBackToTopButton () {
    const mainElem = document.getElementById("mainEl");
    const anchorButton = document.createElement("a");
    const topButton = document.createElement('button');
    anchorButton.innerText = "Back To Top";
    anchorButton.setAttribute('href','#mainEl');
    topButton.setAttribute('type','button');
    topButton.classList.add('show__Button');
    topButton.setAttribute('id','topbutton');
    topButton.append(anchorButton);
    mainElem.append(topButton);
    topButton.addEventListener("click", (e) =>{
        e.preventDefault();
        mainElem.scrollIntoView({
            behavior: 'smooth'
        });
    });
    return true;
}

//Manages hiding and showing the 'return to top' button.
//Hiding and showing the button is done using CSS by adding and removing classes to and from the button's classlist.
function manageButton(state){
    switch (state) {
   case 'hide':
        buttonToShow.classList.remove('show__Button');
        buttonToShow.classList.add('hide__button');
        buttonDisplayed = false;
        break;
    case 'show': 
        buttonToShow.classList.remove('hide__button');
        buttonToShow.classList.add('show__Button');
        buttonDisplayed = true;
        break;
 
    }
}

//funcion sets the active states for the navigation tags and the sections.
function setActiveState(event, destinationSection) {
    let i = 0;
    if(!event === null || !event === "") {
        for(let i = 0; i < theSections.length; i++){
            event.target.classList.remove('your-active-class');
            theSections.classList.remove('your-active-class');
        }
        event.target.classList.addd('your-active-class');
        if(theSections.id === destinationSection) {
            theSections[i].classList.add('your-active-class');
        }
    } else {
        for (const sect of theSections) {    
            const rect = sect.getBoundingClientRect();

            if(rect.top <= 190 && rect.bottom >=390) {
                //apply active states
                sect.classList.add('your-active-class');
                navTagData[i].classList.add('active__tag');                
            } else {
                //remove active states
                sect.classList.remove('your-active-class');
                navTagData[i].classList.remove('active__tag');
            }
        i++
        }
    }
}

/*This function builds out the navigation list items with a tags and appends 
them to the the navigation ul for the menu. */  
function buildNavItems (){
    for(let i = 0; i < theSections.length; i++){
        const listNavItems = document.createElement("li");
        const aNavTags = document.createElement('a');
        //get data-nav attribute from sections
        const aTextLabel = theSections[i].getAttribute('data-nav');
        aNavTags.innerHTML = aTextLabel;
        aNavTags.classList.add('menu__link');
        aNavTags.setAttribute("href","#" + theSections[i].id);
        aNavTags.setAttribute("data-id", theSections[i].id);
        //aNavTags.setAttribute("id",theSections[i].id);
        listNavItems.append(aNavTags);
        navUl.append(listNavItems);
        /**listens for click event, moves to section indicated by 
         * click nav item updates the active states of the menu and the sections */ 
        aNavTags.addEventListener('click', function(event) {
            event.preventDefault(); 
            const clickedATag = event.target.getAttribute('data-id');
            const destinationSection = document.getElementById(clickedATag);
            setActiveState(event, destinationSection);
            destinationSection.scrollIntoView({
                behavior: 'smooth'
            });
            buttonActiveState();
        });
        const navTagDataArr = document.getElementsByTagName("a");
        window.addEventListener('scroll', (event) => {
            event.preventDefault();
            //convert navTagDataArr array into an object for easier reference.
            navTagData = Object.assign({}, navTagDataArr);
            sectionPositions();
            setActiveState();
            buttonActiveState();
        });        
    }
}

/* keeps track of the scrolling position and updates the active states 
of both the sections in view and the menu a tags.*/
//handles the scrolling and updates the active tags and sections during scrolling
function buttonActiveState() {
    const sectPosition = window.pageYOffset;

    if (buttonAdded == false) {
        buttonAdded = addBackToTopButton();
    } else {//Assigns value to buttonToShow --- which returns to the of the document
        buttonToShow = document.getElementById('topbutton');
        
        //if(sectPosition < threshhold) {
        if(sectPosition <= sectionTops[0]){
            buttonDisplayed = manageButton("hide");
        } else { //if(sectPosition > threshhold){
            buttonDisplayed = manageButton("show");
        }
    }
    
}

//function call invokes the main function that build the navigation
buildNavItems();

