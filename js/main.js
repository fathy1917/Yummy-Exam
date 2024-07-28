// / <reference types="../@types/jquery"/>;


$("#nav-icon").on("click", function(){

    if($(this).hasClass("fa-solid open-close-icon fa-align-justify fa-2x") == true ) {
        $(this).removeClass("fa-solid open-close-icon fa-align-justify fa-2x")
        $(this).addClass("fa-solid open-close-icon fa-2x fa-x")
        
        $(".side-nav").animate({left: "0"})


        $(".nav-link ul li").eq(0).animate({top:0},600);
        $(".nav-link ul li").eq(1).animate({top:0},700);
        $(".nav-link ul li").eq(2).animate({top:0},800);
        $(".nav-link ul li").eq(3).animate({top:0},900);
        $(".nav-link ul li").eq(4).animate({top:0},1000);
        


    }else{
        $(this).removeClass("fa-solid open-close-icon fa-2x fa-x")
        $(this).addClass("fa-solid open-close-icon fa-align-justify fa-2x")
        $(".side-nav").animate({left:-257})
        $(".nav-link ul li").animate({top:200},50);
    }
})


function closeNav (){
    $(".side-nav").animate({left:-257})
    $("#nav-icon").removeClass("fa-solid open-close-icon fa-2x fa-x")
    $("#nav-icon").addClass("fa-solid open-close-icon fa-align-justify fa-2x")
}


async function api(){

    let meals = [];
    for(let i = 0; i < 20; i++){
        let mealRes = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        let mealData = await mealRes.json();
        meals.push(mealData.meals[0])
    }
    return meals;
    
}

async function app(){

document.getElementById("load").classList.remove("d-none")

    let mealData = await api();
    // console.log(mealData);
    displayMeals(mealData)
    
document.getElementById("load").classList.add("d-none")

}


function displayMeals(meals){
    let cartona = '';
    for(let i = 0; i < meals.length; i++){
        cartona +=         `                
        <div class="col-md-3 py-3">
            <div class="item position-relative overflow-hidden" dataId="${meals[i].idMeal}">
                <img class="w-100" src="${meals[i].strMealThumb}" alt="">
                <div class="layer position-absolute">
                    <h2 class="ms-1">${meals[i].strMeal}</h2>
                </div>
            </div>
        </div>`
        
    }
    document.getElementById("myRow").innerHTML = cartona;

    for(let i = 0; i < meals.length; i++){
        let item = document.querySelectorAll(".item");
        item[i].addEventListener("click", function(){
            apiDetails(meals[i].idMeal)
        })
    }

}

async function apiDetails(id){
document.getElementById("load").classList.remove("d-none")

    let detailsRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let detailsData = await detailsRes.json()
    displayDetails(detailsData)

document.getElementById("load").classList.add("d-none")

}


function displayDetails(data){
    let cartona = "";
    meal = data.meals
    for(let i = 0; i < meal.length; i++){
        cartona += `                
        <div class="col-md-4">
                    <div class=" ms-3">
                        <img src="${meal[i].strMealThumb}" alt="meal photo" class="w-100 rounded-2">
                        <h2 class="text-white">${meal[i].strMeal}</h2>
                    </div>
                </div>
                    <div class="col-md-8">
                        <div class=" text-white">
                            <h2>Instructions</h2>
                            <p>${meal[i].strInstructions}</p>
                                <h3><span class="fw-bolder">Area : ${meal[i].strArea} </span>American</h3>
                                <h3><span class="fw-bolder">Category : ${meal[i].strCategory}</span>Beef</h3>
                                <h3>Recipes :</h3>
                                <ul class="list-unstyled d-flex g-3 flex-wrap">`

                                for(let j = 1; j <= 20; j++){
                                    let ingredient = meal[i][`strIngredient${j}`];
                                    if (ingredient) {
                                        cartona += `<li class="alert alert-info m-2 p-1">${ingredient}</li>`;
                                    }
                                }

                                cartona += `</ul>
                                <h3>Tags:</h3>
                                <a target="_blank" href="${meal[i].strSource}" class="btn btn-success">Source</a>
                                <a target="_blank" href="${meal[i].strYoutube}" class="btn btn-danger">Youtube</a>
                            </div>
                        </div>`;
    }
    document.getElementById("myRow").innerHTML = cartona
    document.getElementById("rowSearch").innerHTML = "";

}

// -------------------------------------------------
// -------------------------------------------------


document.getElementById("search").addEventListener("click", function(){
    displaySearch()
    closeNav()
})

function displaySearch(){
    let cartona = '';
    cartona = `
    <div class="col-6 z-search">
        <input class="form-control bg-transparent ms-auto text-white" type="text" placeholder="Search By Name" id="searchByName">
    </div>
    <div class="col-6 z-search">
        <input maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter" id="searchByLetter">
    </div>`

    document.getElementById("myRow").innerHTML = cartona;

    let myInput = document.getElementById("searchByName");
    myInput.addEventListener("keyup", function(){
        let word = myInput.value
        apiSearch(api="s",word)
    })

    let myInput2 = document.getElementById("searchByLetter")
    myInput2.addEventListener("keyup", function(){
        let letter = myInput2.value
        apiSearch(api="f",letter)
        if(letter == ''){
            apiSearch(api="f",word="a")
        }
    })

    

}

async function apiSearch(letter,word){
document.getElementById("load").classList.remove("d-none")

    let searchRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${api}=${word}`);
    let searchData = await searchRes.json()
    displaySearchData(searchData)
    
document.getElementById("load").classList.add("d-none")
}

function displaySearchData(data){
    let cartona = "";
    let meals = data.meals;
    for(let i = 0; i < meals.length; i++){
        cartona += `
                <div class="col-md-3 py-3">
                    <div class="item position-relative overflow-hidden" dataId="${meals[i].idMeal}">
                        <img class="w-100" src="${meals[i].strMealThumb}" alt="">
                        <div class="layer position-absolute">
                            <h2 class="ms-1">${meals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById("rowSearch").innerHTML = cartona;

    for(let i = 0; i < meals.length; i++){
        let item = document.querySelectorAll(".item");
        item[i].addEventListener("click", function(){
            apiDetails(meals[i].idMeal)
        })
    }
}

app()

// -------------------------------------------------
// -------------------------------------------------

document.getElementById("category").addEventListener("click", function(){
    document.getElementById("rowSearch").innerHTML = "";
    closeNav()
    apiCategory()
})

async function apiCategory(){
document.getElementById("load").classList.remove("d-none")
    let categoryRes = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let categoryData = await categoryRes.json();
    displayCategory(categoryData)    
document.getElementById("load").classList.add("d-none")
}

function displayCategory(data){
    let meals = data.categories;
    let cartona = '';
        for(let i = 0; i < meals.length; i++){
            cartona += `                
            <div class="col-md-3 p-3">
                <div class="item position-relative overflow-hidden categoryList">
                    <img class="w-100" src="${meals[i].strCategoryThumb}" alt="">
                    <div class="layer position-absolute d-flex flex-column">
                        <h2 class="ms-1 categoryName">${meals[i].strCategory}</h2>
                        <p class="text-center">${meals[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>
        `
        }
        document.getElementById("myRow").innerHTML = cartona
        
        document.querySelectorAll(".categoryList").forEach(function(element) {
            element.addEventListener("click", function() {
                
                let categoryName = this.querySelector(".categoryName").textContent
                apiCategoryList(categoryName)
            });
        });
        

}

async function apiCategoryList(strMeal){
document.getElementById("load").classList.remove("d-none")

    let categoryListRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strMeal}`);
    let categoryListData = await categoryListRes.json();
    displayCategoryList(categoryListData)
    
document.getElementById("load").classList.add("d-none")

}



function displayCategoryList(data){
    let cartona = "";
    let meals = data.meals;
    for(let i = 0; i < meals.length; i++){
        cartona += `        
        <div class="col-md-3 py-3">
            <div class="item position-relative overflow-hidden" dataId="${meals[i].idMeal}">
                <img class="w-100" src="${meals[i].strMealThumb}" alt="">
                <div class="layer position-absolute">
                    <h2 class="ms-1">${meals[i].strMeal}</h2>
                </div>
            </div>
        </div>`
    }

    document.getElementById("myRow").innerHTML = cartona;

    for(let i = 0; i < meals.length; i++){
        let item = document.querySelectorAll(".item");
        item[i].addEventListener("click", function(){
            apiDetails(meals[i].idMeal)
        })
    }
}

// -------------------------------------------------
// -------------------------------------------------

document.getElementById("area").addEventListener("click", function(){
    document.getElementById("rowSearch").innerHTML = "";
    apiArea(api="list", area="list", letter="a")
    closeNav()
})


async function apiArea(api, area, letter){
    document.getElementById("load").classList.remove("d-none")
        let areaRes = await fetch(`https://www.themealdb.com/api/json/v1/1/${api}.php?${letter}=${area}`);
        let areaData = await areaRes.json();
        if(api ===  "list" && area === "list" && letter === "a"){
            displayArea(areaData)
        }else if(api === "filter" && letter === "a"){
        displayCategoryList(areaData)
        }else if(api === "list" && letter === "i" && area === "list"){
            displayIngredients(areaData);
        }else if(api === "filter" && letter === "i"){
            displayCategoryList(areaData)
        }

    document.getElementById("load").classList.add("d-none")
    }

function displayArea(data){
    let cartona = "";
    meal = data.meals
    for(let i = 0; i < meal.length; i++){
        cartona += `
                <div class="col-md-3">
                    <div class="item text-light text-center p-3 itemArea">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class="areaName">${meal[i].strArea}</h3>
                    </div>
                </div>`
    }
    document.getElementById("myRow").innerHTML = cartona

    document.querySelectorAll(".itemArea").forEach(function(element){
        element.addEventListener("click", function(){
            let areaName = this.querySelector(".areaName").textContent
            apiArea(api="filter", area=areaName, letter="a")
        })
    })
}

// -------------------------------------------------
// -------------------------------------------------

document.getElementById("ingredients").addEventListener("click", function(){
    document.getElementById("rowSearch").innerHTML = "";
    apiArea(api="list", area="list", letter="i")
    closeNav()
})


function displayIngredients(data){
    let cartona = "";
    meal = data.meals
    for(let i = 0; i < 20; i++){
        cartona += `
                <div class="col-md-3">
                    <div class="item text-light text-center p-3 itemArea">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class="areaName">${meal[i].strIngredient}</h3>
                        <p>${meal[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
                    </div>
                </div>`
    }
    document.getElementById("myRow").innerHTML = cartona

    document.querySelectorAll(".itemArea").forEach(function(element){
        element.addEventListener("click", function(){
            let areaName = this.querySelector(".areaName").textContent
            apiArea(api="filter", area=areaName, letter="i")
        })
    })
}

// -------------------------------------------------
// -------------------------------------------------


document.getElementById("contact").addEventListener("click", function() {
    document.getElementById("rowSearch").innerHTML = "";
    closeNav();
    document.getElementById("myRow").innerHTML = `                         
        <div class="col-md-6">
            <input type="text" oninput="validateInputs(this)" placeholder="Enter Your Name" class="form-control w-75 m-2 mg" id="nameInputValue">
            <div class="alert alert-danger w-75 text-center d-none mg">Special characters and numbers not allowed</div>
        </div>
        <div class="col-md-6">
            <input type="email" oninput="validateInputs(this)" placeholder="Enter Your Email" class="form-control w-75 m-2" id="emailInputValue">
            <div class="alert alert-danger w-75 text-center d-none m-2">Email not valid gmail & yahoo.com</div>
        </div>
        <div class="col-md-6">
            <input type="text" oninput="validateInputs(this)" placeholder="Enter Your Phone" class="form-control w-75 m-2 mg" id="phoneInputValue">
            <div class="alert alert-danger w-75 text-center d-none mg">valid phone number at least 11 number</div>
        </div>
        <div class="col-md-6">
            <input type="number" oninput="validateInputs(this)" placeholder="Enter Your Age" class="form-control w-75 m-2" id="ageInputValue">
            <div class="alert alert-danger w-75 text-center d-none m-2">Enter valid age</div>
        </div>
        <div class="col-md-6">
            <input type="password" oninput="validateInputs(this)" placeholder="Enter Your Password" class="form-control w-75 m-2 mg" id="passInputValue">
            <div class="alert alert-danger w-75 text-center d-none mg">Enter valid password *Minimum seven characters, at least one letter and one number:*</div>
        </div>
        <div class="col-md-6">
            <input type="password" oninput="validateInputs(this)" placeholder="Repassword" class="form-control w-75 m-2" id="repassInputValue">
            <div id="test" class="alert alert-danger w-75 text-center d-none m-2">Passwords do not match</div>
        </div>
    </div>
    <div class="text-center">
        <button disabled="true" class="btn btn-outline-danger px-2 mt-3" id="submitBtn">Submit</button>
    </div>
    `

    let nameValue = document.getElementById("nameInputValue");
    let emailValue = document.getElementById("emailInputValue");
    let phoneValue = document.getElementById("phoneInputValue");
    let ageValue = document.getElementById("ageInputValue");
    let passValue = document.getElementById("passInputValue");
    let repassValue = document.getElementById("repassInputValue");
});

// -------------------------------------------------
// -------------------------------------------------



// -------------------------------------------------
// -------------------------------------------------

function validateInputs(element){
    let regex = {

    nameInputValue: /^[A-Za-z]{1,}$/,
    emailInputValue: /^[a-zA-Z0-9]+@(gmail\.com|yahoo\.com)$/,
    phoneInputValue: /^\d{11,}$/,
    ageInputValue: /^\d+$/,
    passInputValue: /^(?=.*\d)(?=.*[a-zA-Z]).{7,}$/,

    };

    if(regex[element.id] && regex[element.id].test(element.value)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        element.nextElementSibling.classList.replace("d-block", "d-none")
    }else{
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        element.nextElementSibling.classList.replace("d-none", "d-block")
    }

    if (element.id === 'repassInputValue') {
        const password = document.getElementById("passInputValue").value;
        if (element.value === password && element.value !== '') {
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
            element.nextElementSibling.classList.replace("d-block", "d-none");
        } else {
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
            element.nextElementSibling.classList.replace("d-none", "d-block");
        }
    }
    checkFormValidity()
}

function checkFormValidity() {
    const allInputsValid = Array.from(document.querySelectorAll('#myRow input')).every(input => {
        return (input.id !== 'repassInputValue' && input.classList.contains('is-valid')) ||
            (input.id === 'repassInputValue' && input.value === document.getElementById('passInputValue').value && input.classList.contains('is-valid'));
    });
    document.getElementById('submitBtn').disabled = !allInputsValid;
}

