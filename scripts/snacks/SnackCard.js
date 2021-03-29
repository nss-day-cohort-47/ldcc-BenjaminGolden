export const SnackCard = (snackObject) => {
  let snack = snackObject
  if (snackObject.hasOwnProperty("snack")){
    snack = snackObject.snack
  }
	return `
	<div class="col">
		<div class="card shadow-sm">
            <img class="bd-placeholder-img card-img-top card-img-top-list"  aria-label="Placeholder:${snack.name}" preserveAspectRatio="xMidYMid slice" focusable="false" src="${snack.snackImg}" alt="${snack.name}">
            <div class="card-body">
			<h5 color="primary">${snack.name}</h5>
              <p class="card-text">${snack.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" id="detailscake__${snack.id}">Details</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary" id="deletecake__${snack.id}" disabled>Delete</button>
                </div>
                <small class="text-muted">Count: ${snack.count}</small>
              </div>
            </div>
    	</div>
	</div>
	`
}