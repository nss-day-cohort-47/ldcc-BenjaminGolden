import { populateToppings, populateTypes } from "../nav/NavBar.js"

export const SnackPost = () => {
    return`
    <div class="newSnack">

        <div>            
            <input value=""
                    name="name"
                    class="newSnack__input"
                    type="text"
                    placeholder="Snack Name" />
        </div>
        <div>            
            <input value=""
                    name="snackImg"
                    class="newSnack__input"
                    type="text"
                    placeholder="Snack Img" />
        </div>
        <div>            
            <input value=""
                    name="count"
                    class="newSnack__input"
                    type="text"
                    placeholder="Snack count" />
        </div>
        <div class="typeDropdown" aria-label="Select A Type">            
        ${populateTypes()}
                    
        </div>
        
        <div>            
            <input value=""
                    name="shapeId"
                    class="newSnack__input"
                    type="text"
                    placeholder="shape id" />
        </div>
        <div>            
            <input value=""
                    name="inFlavorId"
                    class="newSnack__input"
                    type="text"
                    placeholder="in flavor id" />
        </div>        
        <div>            
            <input value=""
                    name="seasonId"
                    class="newSnack__input"
                    type="text"
                    placeholder="season id" />
        </div>
        <textarea name="description"
            class="newSnack__input newSnack__description"
            placeholder="description">
        </textarea>
        <textarea name="toppings"
            class="newSnack__input newSnack__toppings"
            placeholder="toppigs">
        </textarea>

        <div>
            <button id="newSnack__submit">Save</button>
            <button id="newSnack__cancel">Cancel</button>

        </div> 
    </div>`
    
}

