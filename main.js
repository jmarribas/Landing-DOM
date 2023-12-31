import './style.css'

const toyStore = [
  {
    name: "Muñeca Barbie",
    price: 19.99,
    seller: "Toy Emporium",
    image: "./assets/img/barbie.jpeg",
  },
  {
    name: "Lego City Set",
    price: 29.99,
    seller: "Brick Land",
    image: "./assets/img/lego.jpeg",
  },
  {
    name: "Peluche de Unicornio",
    price: 14.99,
    seller: "Toy Emporium",
    image: "./assets/img/unicorn.jpeg",
  },
  {
    name: "Juego de Ajedrez",
    price: 24.99,
    seller: "Chess Master",
    image: "./assets/img/chess.jpeg",
  },
  {
    name: "Puzzle de 1000 piezas",
    price: 17.99,
    seller: "Game Master",
    image: "./assets/img/puzzle.jpeg",
  },
  {
    name: "Coche de Carreras de Control Remoto",
    price: 39.99,
    seller: "Brick Land",
    image: "./assets/img/rc_car.jpeg",
  },
  {
    name: "Set de Arte para Niños",
    price: 12.99,
    seller: "Game Master",
    image: "./assets/img/art_set.jpeg",
  },
  {
    name: "Pelota de Fútbol",
    price: 9.99,
    seller: "Game Master",
    image: "./assets/img/soccer_ball.jpeg",
  },
  {
    name: "Avión de Juguete de Madera",
    price: 18.99,
    seller: "Brick Land",
    image: "./assets/img/wooden_plane.jpeg",
  },
  {
    name: "Muñeco de Peluche de Dinosaurio",
    price: 13.99,
    seller: "Toy Emporium",
    image: "./assets/img/dinosaur_plush.jpeg",
  },
];

let filterToys = toyStore;

const filters = document.getElementById('filters')
const filtersDiv = document.createElement('div');
filtersDiv.className = 'filtersDiv';
filters.appendChild(filtersDiv);

const printProducts = (toys) => {

  const products = document.getElementById('products')
  products.innerHTML = "";
  const productContainer = document.createElement('div');
  productContainer.id = 'productContainer';
  products.appendChild(productContainer);

  if (toys.length === 0) {
    const noSearchText = document.createElement('h3')
    noSearchText.textContent = 'No se han encontrado artículos por debajo de este Precio...'
    products.appendChild(noSearchText)
  }

  for (const toy of toys) {
    const productCard = document.createElement('div');
    productCard.classList.add('productCard');
    const divImage = document.createElement('div');
    const productImage = document.createElement('img');
    const productName = document.createElement('h3');
    const productPrice = document.createElement('p');
    const productSeller = document.createElement('p');
    productSeller.classList.add('productSeller');
    const productOrder = document.createElement('button');

    productImage.src = toy.image;
    productName.textContent = toy.name;
    productPrice.textContent = toy.price + " €";
    productSeller.textContent = `Vendido por: ${toy.seller}`;
    productOrder.textContent = 'Comprar';

    productContainer.appendChild(productCard);
    productCard.appendChild(divImage);
    divImage.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(productSeller);
    productCard.appendChild(productOrder);
  }
}

const menu = () => {
  filtersDiv.innerHTML = '';

  const printFilterMenu = () => {
    const filterText = document.createElement('h4');
    filterText.textContent = 'Filtra por vendedor:';
    const categorySelect = document.createElement('select');
    filtersDiv.appendChild(filterText);
    filtersDiv.appendChild(categorySelect);

    const allOption = document.createElement('option');
    allOption.value = 'todos';
    allOption.textContent = 'Todos';
    categorySelect.appendChild(allOption);

    const filtersArray = [];
    const removeSeller = (filterToys) => {
      filterToys.forEach(toy => {
        if (!filtersArray.includes(toy.seller)) {
          filtersArray.push(toy.seller)

          const option = document.createElement('option');
          option.value = toy.seller;
          option.textContent = toy.seller;
          categorySelect.appendChild(option);
        }

      });
    };
    removeSeller(filterToys);
    console.log(filtersArray);

    const selectedSeller = filtersArray.length === 1 ? filterToys[0].seller : 'todos';
    categorySelect.value = selectedSeller;

    categorySelect.addEventListener('change', (e) => {
      filterSeller(e);
    })

  }

  const printFilterPrice = () => {
    const filterPriceText = document.createElement('h4');
    filterPriceText.textContent = 'Filtra por precio:';
    const inputPriceForm = document.createElement('form');
    const inputPrice = document.createElement('input');
    const inputPriceButton = document.createElement('button');
    inputPriceButton.textContent = 'Buscar';
    inputPriceButton.classList.add('inputPriceButton');
    inputPrice.type = "number";


    filtersDiv.appendChild(filterPriceText);
    filtersDiv.appendChild(inputPriceForm);
    inputPriceForm.appendChild(inputPrice);
    inputPriceForm.appendChild(inputPriceButton);

    inputPriceButton.addEventListener("click", (e) => {
      e.preventDefault();
      filterPrice(inputPrice.value);
      inputPrice.value = "";
    });
  }

  const resetFilters = () => {
    const buttonReset = document.createElement("button");
    buttonReset.textContent = "Borrar";
    filtersDiv.appendChild(buttonReset);

    buttonReset.addEventListener("click", () => {
      filtersDiv.innerHTML = ""
      filterToys = toyStore
      printProducts(filterToys)
      printFilterMenu()
      printFilterPrice();
      resetFilters();
    });
  }
  printFilterMenu()
  printFilterPrice()
  resetFilters()
}

const filterSeller = (e) => {
  if (e.target.value === 'todos') {
    filterToys = toyStore
    menu()
    printProducts(filterToys)
  }
  else {
    filterToys = filterToys.filter(toy => toy.seller === e.target.value)
    menu()
    printProducts(filterToys)
  }
}

const filterPrice = (price) => {
  toyStore.forEach(toy => {
    filterToys = filterToys.filter(toy => toy.price <= price)
    printProducts(filterToys)
  });
  menu()

}

printProducts(filterToys);
menu();