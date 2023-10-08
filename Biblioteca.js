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
const BtnOrdReverse = document.getElementById('OrdInverter');
const ListSide = document.getElementById('sidebar');
const CloseList = document.getElementById('CloseSideBar');
const NameList = document.getElementById('NameList');
const TextList = document.getElementById('TextList');
const List = document.getElementById('Lista');
const Tabla = document.getElementById('TableBooks');

var Books = [];
var Order = 0;

BtnAdd.addEventListener('click', function(){
  if(BookCover.value == '' || BookTitle.value == '' || BookAuthor.value == '' || BookYear.value == ''){
    alert('Por favor, Ingrese todos los campos')
  }else {
    let Book = {
      Cover : BookCover.value.trim(),
      Title : BookTitle.value.trim(),
      Author : BookAuthor.value.trim(),
      Year : BookYear.value.trim(),
      Available : BookAvailable.value,
      Loan : BookLoan.value.trim()
    };
    Books.push(Book);
    BookCover.value = '';
    BookCover.value = '';
    BookTitle.value = '';
    BookAuthor.value = '';
    BookYear.value = '';
    BookLoan.value = '';
    UpdateBooks();
    localStorage.setItem('Libros', JSON.stringify(Books));
  }
});

BtnDelete.addEventListener('click', function(){
  ListSide.classList.toggle('active');
  NameList.innerHTML = 'Delete Books';
  TextList.innerHTML = 'Click on the book you want to delete'
  UpdateTableDelete();
});

BtnReserve.addEventListener('click', function(){
  ListSide.classList.toggle('active');
  NameList.innerHTML = 'Reserve Books';
  TextList.innerHTML = 'Click on the book you want to Reserve/Unreserve' 
  UpdateTableReserve();
});

BtnOrdName.addEventListener('click', function(){
  OrderBy(1);
  Order = 1;
  localStorage.setItem('Order', Order);
  UpdateBooks();
});

BtnOrdAuthor.addEventListener('click', function(){
  OrderBy(2);
  Order = 2;
  localStorage.setItem('Order', Order);
  UpdateBooks();
});

BtnOrdYear.addEventListener('click', function(){
  OrderBy(3);
  Order = 3;
  localStorage.setItem('Order', Order);
  UpdateBooks();
});

BtnOrdAvailable.addEventListener('click', function(){
  OrderBy(4);
  Order = 4;
  localStorage.setItem('Order', Order);
  UpdateBooks();
});

BtnOrdReverse.addEventListener('click', function(){
  Books.reverse();
  UpdateBooks();
})

BookAvailable.addEventListener('change', function() {
  console.log('Seleccion');
  if (BookAvailable.value == "True") {
    BookLoan.disabled = true;
  } else {
    BookLoan.disabled = false;
  };
});

CloseList.addEventListener('click', function(){
  ListSide.classList = '';
})

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
    const AuthorText = document.createElement('h3');
    AuthorText.innerHTML = x.Author;
    const YearText = document.createElement('h3');
    YearText.innerHTML = x.Year;
    const LoanText = document.createElement('h3');
    if(x.Available=='True'){
      NewCard.setAttribute("style", "background-color:rgba(204,255,204,0.7);");
    }else{
      NewCard.setAttribute("style", "background-color:rgba(255,204,204,0.7);");
      TitleText.setAttribute("style", "text-decoration: line-through");
      LoanText.innerHTML = "Loan to: " + x.Loan;
    }
    NewCard.appendChild(Portada);
    NewCard.appendChild(TitleText);
    NewCard.appendChild(AuthorText);
    NewCard.appendChild(YearText);
    NewCard.appendChild(LoanText);
    ShowBooks.appendChild(NewCard);
  });
};

function OrderBy(N){
  switch (N) {
    case 1:
      Books.sort(function(x,y){
        if(x.Title < y.Title){
          return -1;
        }else if(x.Title > y.Title){
          return 1;
        }else{
          return 0;
        }
      });
      break;
    case 2:
      Books.sort(function(x,y){
        if(x.Author < y.Author){
          return -1;
        }else if(x.Author > y.Author){
          return 1;
        }else{
          return 0;
        }
      });
      break;
    case 3:
      Books.sort(function(x,y){
        if(x.Year < y.Year){
          return -1;
        }else if(x.Year > y.Year){
          return 1;
        }else{
          return 0;
        }
      });
      break;
    case 4:
      Books.sort(function(x,y){
        if(x.Available < y.Available){
          return -1;
        }else if(x.Available > y.Available){
          return 1;
        }else{
          return 0;
        }
      });
      break;
  }
}

document.body.onload = function() {
  Books = JSON.parse(localStorage.getItem('Libros'));
  Order = JSON.parse(localStorage.getItem('Order'));
  if(Books != null){
      if(Order != null){
        OrderBy(Order);
      }
      UpdateBooks();
  }else{
      Books = [];
      let Book = {
        Cover : "https://images.cdn1.buscalibre.com/fit-in/360x360/a6/18/a618be10eae5c2a608ec6e22e6917e29.jpg",
        Title : "Don Quijote de la Mancha",
        Author : "Miguel de Cervantes",
        Year : "1605",
        Available : "True",
        Loan : ""
      };
      Books.push(Book);
      UpdateBooks();
  }
};

function DeleteBook(N) {
  Books.splice(N, 1);
  UpdateBooks();
  UpdateTableDelete();
  localStorage.setItem('Libros', JSON.stringify(Books));
};

function ReserveBook(N){
  console.log(Books[N].Available);
  if(Books[N].Available == 'True'){
    Books[N].Loan = window.prompt("Who is going to rent '" + Books[N].Title + "'?");
    Books[N].Available = 'False';
  }else{
    if(window.confirm("Are you sure to unreserve '" + Books[N].Title + "'?")){
      Books[N].Available = 'True';
      Books[N].Loan = '';
    }
  }
  UpdateBooks();
  UpdateTableReserve();
  localStorage.setItem('Libros', JSON.stringify(Books));
};

function UpdateTableDelete(){
  Tabla.innerHTML = '';
  const TblHead = document.createElement('thead');
  const TblBody = document.createElement('tbody');
  var Encabezado = document.createElement('tr');
  var Enc1 = document.createElement('th');
  Enc1.style.width = '60%';
  var TxtEnc1 = document.createTextNode('BOOK');
  var Enc2 = document.createElement('th');
  Enc2.style.width = '40%';
  var TxtEnc2 = document.createTextNode('AUTHOR');
  Enc1.appendChild(TxtEnc1);
  Enc2.appendChild(TxtEnc2);
  Encabezado.appendChild(Enc1);
  Encabezado.appendChild(Enc2);
  TblHead.appendChild(Encabezado);
  var RowSearch = document.createElement('tr');
  var Search = document.createElement('td');
  Search.colSpan = 3;
  var InputSearch = document.createElement('input');
  InputSearch.type = 'text';
  InputSearch.placeholder = 'Write something to filter';
  InputSearch.setAttribute("style", "width: 400px");
  InputSearch.addEventListener('keyup', function(){
    texto = InputSearch.value.toLowerCase();
      var r=0;
      while(row = TblBody.rows[r++])
      {
        if ( row.innerText.toLowerCase().indexOf(texto) !== -1 )
          row.style.display = null;
        else
          row.style.display = 'none';
      }
    });
  Search.appendChild(InputSearch);
  RowSearch.appendChild(Search);
  TblHead.appendChild(RowSearch);

  var Cont = 0
  OrderBy(1);        
  Books.forEach(function(x) {
      var Fila = document.createElement('tr');
      Fila.classList = 'RowWhite';
      Fila.id = Cont;
      var CeldaName = document.createElement('td');
      var TxtCelda = document.createTextNode(x.Title);
      Fila.addEventListener('click', function(){
        DeleteBook(Fila.id);
      });
      var CeldaAuthor = document.createElement('td');
      var TxtAuthor = document.createTextNode(x.Author);
      CeldaName.appendChild(TxtCelda);
      Fila.appendChild(CeldaName);
      CeldaAuthor.appendChild(TxtAuthor);
      Fila.appendChild(CeldaAuthor);
      TblBody.appendChild(Fila);
      Cont++;
  });
  Tabla.appendChild(TblHead);
  Tabla.appendChild(TblBody);
};

function UpdateTableReserve(){
  Tabla.innerHTML = '';
  const TblHead = document.createElement('thead');
  const TblBody = document.createElement('tbody');
  var Encabezado = document.createElement('tr');
  var Enc1 = document.createElement('th');
  Enc1.style.width = '60%';
  var TxtEnc1 = document.createTextNode('BOOK');
  var Enc2 = document.createElement('th');
  Enc2.style.width = '20%';
  var TxtEnc2 = document.createTextNode('STATUS');
  var Enc3 = document.createElement('th');
  Enc3.style.width = '20%';
  var TxtEnc3 = document.createTextNode('LOAN TO');
  Enc1.appendChild(TxtEnc1);
  Enc2.appendChild(TxtEnc2);
  Enc3.appendChild(TxtEnc3);
  Encabezado.appendChild(Enc1);
  Encabezado.appendChild(Enc2);
  Encabezado.appendChild(Enc3);
  TblHead.appendChild(Encabezado);
  var RowSearch = document.createElement('tr');
  var Search = document.createElement('td');
  Search.colSpan = 3;
  var InputSearch = document.createElement('input');
  InputSearch.type = 'text';
  InputSearch.placeholder = 'Write something to filter';
  InputSearch.setAttribute("style", "width: 400px");
  InputSearch.addEventListener('keyup', function(){
    texto = InputSearch.value.toLowerCase();
      var r=0;
      while(row = TblBody.rows[r++])
      {
        if ( row.innerText.toLowerCase().indexOf(texto) !== -1 )
          row.style.display = null;
        else
          row.style.display = 'none';
      }
    });
  Search.appendChild(InputSearch);
  RowSearch.appendChild(Search);
  TblHead.appendChild(RowSearch);

  var Cont = 0
  OrderBy(4);
  Books.reverse();
  Books.forEach(function(x) {
      var Fila = document.createElement('tr');
      Fila.id = Cont;
      var CeldaName = document.createElement('td');
      var TxtCelda = document.createTextNode(x.Title);
      Fila.addEventListener('click', function(){
        ReserveBook(Fila.id);
      });
      var CeldaStatus = document.createElement('td');
      CeldaStatus.setAttribute('style', 'text-align : center');
      if(x.Available == 'True') {
        var TxtStatus = document.createTextNode('Available');
        Fila.classList = 'RowGreen';
      }else {
        var TxtStatus = document.createTextNode('Loaned');
        Fila.classList = 'RowRed';
      }
      var CeldaTaker = document.createElement('td');
      CeldaTaker.setAttribute('style', 'text-align : center');
      if(x.Loan == '') {
        var TxtTaker = document.createTextNode('--');
      }else {
        var TxtTaker = document.createTextNode(x.Loan);
      }
      CeldaName.appendChild(TxtCelda);
      Fila.appendChild(CeldaName);
      CeldaStatus.appendChild(TxtStatus);
      Fila.appendChild(CeldaStatus);
      CeldaTaker.appendChild(TxtTaker);
      Fila.appendChild(CeldaTaker);
      TblBody.appendChild(Fila);
      Cont++;
  });
  Tabla.appendChild(TblHead);
  Tabla.appendChild(TblBody);
}