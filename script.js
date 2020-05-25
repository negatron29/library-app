let myLibrary = [
    {
        title: "The Bible",
        author: "God",
        pages: 2000,
        read: "Y"
    },
    {
        title: "Mody Dick",
        author: "Herman Melville",
        pages: 450,
        read: "N"
    }
];

let tbl = document.querySelector("table");
let itemCnt = -1;
let body = document.querySelector("body");
let hbhlder = document.querySelector("#buttonHolder");
let formOpen = 0;

function incrementItem () {
    itemCnt +=1;
}

//It's DRYer to write a function to add the DOM element
function addItem (itemArray,tgtId) {
    let tgtStr = tgtId.toString();
    console.log(tgtStr);
    for (let i = 0; i < itemArray.length; i++) {
        let newData = itemArray[i]; //put the data into a variable;
        let newItem = document.createElement("td"); //Create a new HTML item
        newItem.innerHTML = newData;
        //we have to be able to identify the "Read Y/N" column
        if (i ===  3) {
            newItem.setAttribute("class","readCol")
        }
        document.getElementById(tgtStr).appendChild(newItem);
    }
    
}

function newRow () {
    incrementItem();
    console.log("newRow is being read.")
    let nextRow = document.createElement("tr");
    //nextRow.innerHTML = inputText;
    nextRow.setAttribute("id",itemCnt);
    //console.log(nextRow);
    tbl.appendChild(nextRow);
    //console.log(itemCnt);
}

//The render() function creates a new row for each array in the myLibrary obj
function render(myLibrary) {
    console.log("It's working.")
   
    for (let i = 0; i < myLibrary.length; i++) {//For every array in the initial library
        let bookData = loadBook(myLibrary[i]);//Read the attributes into an array of specific book into array
        //console.table(bookData);
        newRow();//Make a new row in the HTML table; sets id equal to next available
        addItem(bookData,itemCnt);
        readButton(itemCnt);
        delButton2(itemCnt);
        //initiate();
        
    }
    addButton();
   
}

function Book(title,author,pages,read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  /*this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}.`
    }*/
}

function addBookToLibrary(title,author,pages,read) {
  // this should include everything needed to successfully add the book
  let newBook = new Book(title,author,pages,read);
  myLibrary.push(newBook);
  newRow();//Make a new row in the HTML table; sets id equal to next available
  let toLoad = loadBook(newBook); //Load the book's attributes into an array
  addItem(toLoad,itemCnt);
  readButton(itemCnt);
  delButton2(itemCnt);
  initiate(itemCnt);
  delInitNew(itemCnt);
}

//Function for loading book object contents into an array
function loadBook (newBook) {
    let bookData = Object.values(newBook);
    return bookData;
}

function addButton () {
    //let itemChar = itemCnt.toString();
    //console.log(itemChar);
    let newButton = document.createElement("button");
    newButton.setAttribute("id","addbutton");
    newButton.innerHTML = "Add A New Book";
    body.append(newButton);
    
}

function delButton2(tgtId) {
    let tgtStr = tgtId.toString();
    let eButton = document.createElement("button");
    console.log(eButton);
    eButton.setAttribute("class","delButton");
    eButton.setAttribute("type","button");
    eButton.innerHTML = "Delete from list";
    let newItem = document.createElement("td"); //Create a new HTML item
    newItem.appendChild(eButton);
    console.log(newItem);
    document.getElementById(tgtStr).appendChild(newItem);
}


function readButton(tgtId) {
    let tgtStr = tgtId.toString();
    let eButton = document.createElement("button");
    console.log(eButton);
    eButton.setAttribute("class","readButton");
    eButton.setAttribute("type","button");
    eButton.innerHTML = "Mark As Read";
    let newItem = document.createElement("td"); //Create a new HTML item
    newItem.appendChild(eButton);
    console.log(newItem);
    document.getElementById(tgtStr).appendChild(newItem);
}

//this function will go on the "Mark as Read" button
function markRead (tgtId) {
    let tgtStr = tgtId.toString();
    let col = document.getElementById(tgtStr).querySelector(".readCol");
    console.log(col.innerHTML);
    if (col.innerHTML === "Y") {
        col.innerHTML = "N";
    }
    else {
        col.innerHTML = "Y"
    }
}

function initiate(itemCnt) {
    if (arguments.length == 0) {
        let readButtons = document.getElementsByClassName("readButton");
        let arrayButtons = Array.from(readButtons);
        for (let i = 0; i < arrayButtons.length; i++) {
            console.log(arrayButtons[i])
            arrayButtons[i].addEventListener("click", function() {
                let parentId = this.parentElement.parentElement.getAttribute("id").toString();
                //console.log(parentId);
                let col = document.getElementById(parentId).querySelector(".readCol");
                //col.innerHTML = "It's working";
                console.log(col.innerHTML);
                if (col.innerHTML === "Y") {
                    col.innerHTML = "N";
                }
                else {
                    col.innerHTML = "Y";
                }
            })
        }
    }
    else {
        let itemStr = itemCnt.toString();
        let nB = document.getElementById(itemStr).querySelector(".readButton");
        console.log(nB);
        nB.addEventListener("click", function() {
            let parentId = this.parentElement.parentElement.getAttribute("id").toString();
            //console.log(parentId);
            let col = document.getElementById(parentId).querySelector(".readCol");
            //col.innerHTML = "It's working";
            console.log(col.innerHTML);
            if (col.innerHTML === "Y") {
                col.innerHTML = "N";
            }
            else {
                col.innerHTML = "Y";
            }
        })
    }
    
    //console.log("Listener activated on " + col);
}
/*
document.addEventListener("click", function() {
    let parentId = this.parentElement.parentElement.getAttribute("id");
    console.log(parentId);
})
*/
function toProperCase (str) {
    let strLen = str.length;
    let propArr = [];
    let firstLtr = str.charAt(0).toUpperCase();
    propArr.push(firstLtr);
    for (let i = 1; i < strLen; i++) {
        propArr.push(str[i].toLowerCase());
    }
    return propArr.join("");
}

function renderForm () {
    let formDiv = document.getElementById("formDiv");
    let formEl = document.createElement("form");
    formDiv.appendChild(formEl);
    let allProps = Object.keys(myLibrary[0]);
    //console.log(allProps);
    for (let i = 0; i < allProps.length; i++) {
        let br = document.createElement("br");
        let br2 = document.createElement("br");
        let br3 = document.createElement("br");
        let propStr = toProperCase(allProps[i]);
        let inputBox = document.createElement("input");
        inputBox.setAttribute("id",propStr);
        inputBox.setAttribute("name",propStr);
        inputBox.setAttribute("type","text");
        let label = document.createElement("label");
        label.setAttribute("for",propStr);
        label.innerHTML = propStr;
        formEl.appendChild(label);
        formEl.appendChild(br);
        formEl.appendChild(inputBox);
        formEl.appendChild(br2);
        formEl.appendChild(br3);
        formOpen = 1;
        //
    }
}

function unRender () {
    let formDiv = document.getElementById("formDiv");
    let thisForm = formDiv.querySelector("form");
    formDiv.removeChild(thisForm);
    let addB = document.getElementById("addbutton");
    addB.style.color = "black";
    let subB = document.getElementById("submitbutton");
    body.removeChild(subB);
    formOpen = 0;
    //newListener();
}
//this function adds event listeners on the delete buttons
//on initial page load
function delInit () {
    let delButtons = document.getElementsByClassName("delButton");
    let arrayDels = Array.from(delButtons);
    for (let i = 0; i < arrayDels.length; i++) {
        console.log(arrayDels[i])
        arrayDels[i].addEventListener("click", function() {
            //let pId = this.parentElement.parentElement.getAttribute("id").toString();
            //console.log(pId);
            //delItem();
            let tgt = this.parentElement//.getAttribute("id");
            let tgtParent = tgt.parentElement;
            let grandParent = tgtParent.parentElement
            //console.log(tgtParent);
            grandParent.removeChild(tgtParent);
        })
    }
    //console.log("Listener activated on " + col);
}

//This adds an event listener on the delete buttons for added items
function delInitNew (itemCnt) {
    let newDel = document.getElementById(itemCnt).querySelector(".delButton");
    newDel.addEventListener("click", function() {
        let tgt = this.parentElement//.getAttribute("id");
        let tgtParent = tgt.parentElement;
        let grandParent = tgtParent.parentElement
        //console.log(tgtParent);
        grandParent.removeChild(tgtParent);
    })
}

function submitButton () {
    //let itemChar = itemCnt.toString();
    //console.log(itemChar);
    let sub = document.createElement("button");
    sub.setAttribute("id","submitbutton");
    sub.innerHTML = "Add To Library";
    body.append(sub);
    
}
//This function will be run when the user hits "Add To Library" button
function submitBook () {
    let newTitle = document.getElementById("Title").value;
    let newAuthor = document.getElementById("Author").value;
    let newPages = document.getElementById("Pages").value;
    let newRead = document.getElementById("Read").value;
    console.log(newTitle);
    addBookToLibrary(newTitle,newAuthor,newPages,newRead);

}

//Need to add an event listener on the "Add New Book" button
function newListener() {
    let addB = document.getElementById("addbutton");
    addB.addEventListener("click", function () {
        if (formOpen === 0) {
            renderForm();
            addB.style.color = "lightgray"
            submitButton();
        }
        let newSub = document.getElementById("submitbutton");
        console.log(newSub);
        newSub.addEventListener("click", function () {
        submitBook();
        unRender();
    })
    })
    
}


//Initial page render scripts
render(myLibrary);
initiate();
//renderForm();
delInit();
newListener();