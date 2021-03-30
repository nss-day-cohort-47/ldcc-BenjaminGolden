const apiURL = "http://localhost:8088";

//// user functions
let loggedInUser = {}

export const getLoggedInUser = () => {
	return { ...loggedInUser };
}

export const logoutUser = () => {
	loggedInUser = {}
}

export const setLoggedInUser = (userObj) => {
	loggedInUser = userObj;
}

export const loginUser = (userObj) => {
	return fetch(`${apiURL}/users?name=${userObj.name}&email=${userObj.email}`)
		.then(response => response.json())
		.then(parsedUser => {
			//is there a user?
			if (parsedUser.length > 0) {
				setLoggedInUser(parsedUser[0]);
				return getLoggedInUser();
			} else {
				//no user
				return false;
			}
		})
}

export const registerUser = (userObj) => {
	return fetch(`${apiURL}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userObj)
	})
		.then(response => response.json())
		.then(parsedUser => {
			setLoggedInUser(parsedUser);
			return getLoggedInUser();
		})
}


///// snack functions

let snackCollection = [];

export const useSnackCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //the spread operator makes quick work
  const snackCollectionCopy = [...snackCollection]
  return snackCollectionCopy;
}

// export const makeSnackList = (snacksArray) => {
// 	render(snacksArray)
// };

// const render = (snackData) => {
// 	const snackDisplay = document.querySelector(".container");
// 	let HTMLArray = snackData.map(oneTopping => {
// 		return SnackDetails(oneTopping)
// 	})
// 	snackDisplay.innerHTML = HTMLArray.join("");
// }

export const getSnacks = () => {
	return fetch(`${apiURL}/snacks`)
		.then(response => response.json())
		.then(parsedResponse => {
			snackCollection = parsedResponse
			return parsedResponse;
		})
}

export const getSingleSnack = (snackId) => {
	return fetch(`${apiURL}/snacks/${snackId}?_expand=type&_expand=shape&_expand=inFlavor&_expand=season`)
	.then(response => response.json())
}

export const getToppings = (snackId) => {
	return fetch(`${apiURL}/snackToppings?snackId=${snackId}&_expand=topping&_expand=snack`)
	.then(response => response.json())
}

export const getSnacksByTopping = (toppingId) => {
	return fetch(`${apiURL}/snackToppings?toppingId=${toppingId}&_expand=snack`)
	.then(response => response.json())
}


//toppings
let toppingsCollection = [];

export const useSnackToppingsCollection = () => {
	const toppingsCollectionCopy = [...toppingsCollection]
	return toppingsCollectionCopy;
}

export const getSnackToppings = () => {
 return fetch (`${apiURL}/toppings`)
.then (response => response.json())
.then(parsedResponse => {
	toppingsCollection = parsedResponse
	return parsedResponse;
})}

//types
let typesCollection = [];

export const useSnackTypesCollection = () => {
	const typesCollectionCopy = [...typesCollection]
	return typesCollectionCopy;
}
export const getSnackTypes = () => {
	return fetch (`${apiURL}/types`)
   .then (response => response.json())
   .then(parsedResponse => {
	   typesCollection = parsedResponse
	   return parsedResponse;
   })}

//create a SnackPost fetch call

export const createSnack = (snackObj) => {
	return fetch("http://localhost:8088/snacks", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(snackObj)
  
	})
		.then(response => response.json())
  }