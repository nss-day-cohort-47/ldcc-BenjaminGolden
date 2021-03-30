console.log('yum, yum, yum');

import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { NavBar, populateToppings, renderToppings, populateTypes } from "./nav/NavBar.js";
import { SnackList } from "./snacks/SnackList.js";
import { SnackDetails } from "./snacks/SnackDetails.js";
import { Footer } from "./nav/Footer.js";
import {
	logoutUser, setLoggedInUser, loginUser, registerUser, getLoggedInUser,
	getSnacks, getSingleSnack, getToppings, useSnackCollection, getSnackToppings, useSnackToppingsCollection,
	getSnacksByTopping, createSnack, useSnackTypesCollection, getSnackTypes
} from "./data/apiManager.js";
import { SnackPost } from "./snacks/SnackPost.js"



const applicationElement = document.querySelector("#ldsnacks");

//login/register listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		loginUser(userObject)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObj));
					startLDSnacks();
				} else {
					//got a false value - no user
					const entryElement = document.querySelector(".entryForm");
					entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
				}
			})
	} else if (event.target.id === "register__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value,
			isAdmin: false
		}
		registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				startLDSnacks();
			})
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		sessionStorage.clear();
		checkForUser();
	}
})
// end login register listeners

// snack listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();

	if (event.target.id.startsWith("detailscake")) {
		const snackId = event.target.id.split("__")[1];
		getSingleSnack(snackId)
			.then(snackObj => {
				getToppings(snackId)
				.then(snackToppings =>{
					console.log(snackToppings);
					showDetails(snackObj, snackToppings);
				})
			})
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "allSnacks") {
		showSnackList();
	}
})

const showDetails = (snackObj, snackToppings) => {
	const listElement = document.querySelector("#mainContent");
	listElement.innerHTML = SnackDetails(snackObj, snackToppings);
}


const filterSnackByTopping = (specificTopping) => {
	getSnacksByTopping(specificTopping)
		.then(filteredArray => {		
			const listElement = document.querySelector("#mainContent")
			listElement.innerHTML = SnackList(filteredArray)})


}

applicationElement.addEventListener("change", event => {
	event.preventDefault();
	if (event.target.id === "toppingFilter"){	
		console.log(event.target.value, "change event value")	
		filterSnackByTopping(event.target.value)				
	}	
})

//event listener for submit and cancel buttons on snack post
applicationElement.addEventListener("click", event => {
	if (event.target.id === "newSnack__cancel") {
		//clear the input fields
	}
  })
  
  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newSnack__submit") {
	//collect the input values into an object to post to the DB
	  const name = document.querySelector("input[name='name']").value
	  const snackImg = document.querySelector("input[name='snackImg']").value
	  const count = document.querySelector("input[name='count']").value
	  const typeId = document.querySelector("input[name='typeId']").value
	  const shapeId = document.querySelector("input[name='shapeId']").value//change to select menu
	  const inFlavorId = document.querySelector("input[name='inFlavorId']").value
	  const seasonId = document.querySelector("input[name='seasonId']").value
	  const description = document.querySelector("textarea[name='description']").value
	  const toppings = document.querySelector("textarea[name='toppings']").value

	  const snackObject = {
		  name: name,
		  snackImg: snackImg,
		  count: count,
		  typeId: typeId,//save value as int.
		  shapeId: shapeId,
		  inFlavorId: inFlavorId,
		  seasonId: seasonId,
		  description: description,
		  toppings: toppings		  
	  }
  
	// be sure to import from the DataManager
		createSnack(snackObject)
	}
  })

  const showSnackEntry = () => { 
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector("#addType");
	entryElement.innerHTML = SnackPost();
  }

const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		startLDSnacks();
	} else {
		applicationElement.innerHTML = "";
		//show login/register
		showNavBar()
		showLoginRegister();
	}
}

const showLoginRegister = () => {
	//template strings can be used here too
	applicationElement.innerHTML += `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
}


const showNavBar = () => {
	const toppingList = useSnackToppingsCollection();
	// const typeList = useSnackTypesCollection();	
	applicationElement.innerHTML += NavBar();
	renderToppings(toppingList);
	// renderTypes(typeList);
	// populateTypes(typeList);
}

const showSnackList = () => {
	getSnacks().then(allSnacks => {
		const listElement = document.querySelector("#mainContent")
		listElement.innerHTML = SnackList(allSnacks);
	})
}


const showFooter = () => {
	applicationElement.innerHTML += Footer();
}

const startLDSnacks = () => {
	applicationElement.innerHTML = "";
	showNavBar();
	applicationElement.innerHTML += `<div id="mainContent"></div>`;
	showSnackList();
	showFooter();
	populateToppings();
	showSnackEntry();

}

checkForUser();