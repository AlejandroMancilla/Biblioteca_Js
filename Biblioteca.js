const BtnAdd = document.getElementById('AddBook');
const BtnDelete = document.getElementById('btnDelete');
const BtnReserve = document.getElementById('btnReserve');
const LstName = document.getElementById('LstName');
const LstReserve = document.getElementById('LstReserve');
const BookCover = document.getElementById('Cover');
const BookTitle = document.getElementById('TitleBook');
const BookAuthor = document.getElementById('Author');
const BookYear = document.getElementById('Year');
const BookAvailable = document.getElementById('Available');
const BookLoan = document.getElementById('Loan');
const ShowBooks = document.getElementById('Books');
const BtnOrdName = document.getElementById('OrdName');
const BtnOrdAuthor = document.getElementById('OrdAuthor');
const BtnOrdYear = document.getElementById('OrdYear');
const BtnOrdAvailable = document.getElementById('OrdAvailable');

var Books = [];

BtnAdd.addEventListener('click', function(){
  let Book = {
    Cover : BookCover.value,
    Title : BookTitle.value,
    Author : BookAuthor.value,
    Year : BookYear.value,
    Available : BookAvailable.value,
    Loan : BookLoan.value
  };
  Books.push(Book);
  UpdateBooks();
});

BtnDelete.addEventListener('click', function(){

});

BtnReserve.addEventListener('click', function(){
  
});

BtnOrdName.addEventListener('click', function(){
  Books.sort(function(x,y){
    if(x.Title < y.Title){
      return -1;
    }else if(x.Title > y.Title){
      return 1;
    }else{
      return 0;
    }
  });
  UpdateBooks();
});

BtnOrdAuthor.addEventListener('click', function(){

});

BtnOrdYear.addEventListener('click', function(){

});

BtnOrdAvailable.addEventListener('click', function(){

});

function CollapseMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
};

function UpdateBooks(){
  ShowBooks.innerHTML = "";
  Books.forEach(function(x){
    const NewCard = document.createElement('div');
    NewCard.classList = "card";
    NewCard.id = x.Title;
    if(x.Available=='True'){
      NewCard.setAttribute("style", "background-color:rgba(204,255,204,0.5);");
    }else{
      NewCard.setAttribute("style", "background-color:rgba(255,204,204,0.5);");
    }
    const Portada = document.createElement('img');
    Portada.classList = "portada";
    Portada.src = x.Cover;
    const TitleText = document.createElement('h2');
    TitleText.innerHTML = x.Title;
    const AuthorText = document.createElement('h3');
    AuthorText.innerHTML = x.Author;
    NewCard.appendChild(Portada);
    NewCard.appendChild(TitleText);
    NewCard.appendChild(AuthorText);
    ShowBooks.appendChild(NewCard);
  });
};

Disponile.setAttribute('data-bs-target', '#modalNombre')