import { getLoggedInUser } from "../data/apiManager.js"
import { useSnackToppingsCollection, getSnackToppings, useSnackTypesCollection, getSnackTypes } from "../data/apiManager.js"

//useSnackToppingsCollection is a copy of the empty array. 
//getSnackToppings is the fetch call to get the toppings
//toppings
export const renderToppings = (allToppings) => {
	const toppingTarget = document.querySelector(".toppingDropdown")//where we want to put the topping dropdown
	let toppingOptions = allToppings.map(singleTopping => {
		return `<option value="${singleTopping.id}">${singleTopping.name}</option>`
	})
	toppingTarget.innerHTML = `
		<select class="form-select btn-info toppingDropdown" id="toppingFilter">${toppingOptions.join("")}</select>		
		`
}

export const populateToppings = () => {
	getSnackToppings()
		.then(() => {
			const selectTopping = useSnackToppingsCollection()
			renderToppings(selectTopping);
		})
}

//render Type
// export const renderTypes = (allTypes) => {
// 	const TypeTarget = document.querySelector(".typeDropdown")//where we want to put the Type dropdown

// 	TypeTarget.innerHTML = 

// }

export const populateTypes = () => {
	getSnackTypes()
		.then(() => {
			const selectType = useSnackTypesCollection()
			let typeOptions = selectType.map(singleType => {
				return `<option value="${singleType.id}">${singleType.name}</option>`
			})
			let dropdown = 		
			`
			<select class="form-select btn-info typeDropdown" id="typeFilter">${typeOptions.join("")}</select>		
			`
			return dropdown 
		})
}




export const NavBar = () => {
	//only show navItems and addTypeButton if user is logged in
	
	const navItems = getLoggedInUser().id ? `
	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarSupportedContent">
	<ul class="navbar-nav me-auto mb-2 mb-lg-0">
		<li class="nav-item ms-1">
			<button class="btn btn-info" type="button" id="allSnacks">All Snacks</button>
		</li>
		<li class="nav-item ms-1">
			<div class="toppingDropdown"  aria-label="Select A Topping">
				
			</div>
		</li>
		<li class="nav-item ms-1">
			<button class="btn btn-info" type="button" id="logout">Logout</button>
		</li>
	</ul>
	</div>` : ""

	const addTypeButton = getLoggedInUser().id ? `
	<nav class="navbar navbar-light"">
		<div class="container-fluid" id="addType" >
			<button id="addSnack" class="btn btn-outline-primary" type="button">Add A Snack</button>
		
		</div>
	</nav>` : ""

	return `
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  		<div class="container-fluid">
		  <span class="navbar-brand mb-0 h1">LDCC
		  	<span class="navbar-text">Little Debbie Collector Club</span>
		  </span>
		${navItems}
  		</div>
	</nav>
	${addTypeButton}
	`
}

// const addSnack = ()