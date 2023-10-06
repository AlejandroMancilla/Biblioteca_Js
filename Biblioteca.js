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

var Books = [];

BtnAdd.addEventListener('click', function(){
  let Book = new Object;
  Book = {
    Cover : BookCover.value,
    Title : BookTitle.value,
    Author : BookAuthor.value,
    Year : BookYear.value,
    Available : BookAvailable.value,
    Loan : BookLoan.value
  };
  Books.push(Book);
  console.log(Books);
  UpdateBooks();
});

BtnDelete.addEventListener('click', function(){

});

BtnReserve.addEventListener('click', function(){
  
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
    const Portada = document.createElement('img');
    Portada.classList = "portada";
    Portada.src = x.Cover;
    const TitleText = document.createElement('h2');
    TitleText.innerHTML = x.Title;
    NewCard.appendChild(Portada);
    NewCard.appendChild(TitleText);
    ShowBooks.appendChild(NewCard);
  });
};