
const data = {
    produtos: [
        {
            id: 1,
            nome: "iPhone 14",
            preco: 5999.90,
            categoria: "Celulares",
            imagem: "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=iPhone+14",
            descricao: "Smartphone Apple com tela de 6.1 polegadas",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Samsung Galaxy S23",
            preco: 4599.00,
            categoria: "Celulares",
            imagem: "https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Galaxy+S23",
            descricao: "Celular Samsung com câmera de alta qualidade",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Notebook Dell",
            preco: 3999.00,
            categoria: "Notebooks",
            imagem: "https://via.placeholder.com/300x200/95E1D3/FFFFFF?text=Dell+Notebook",
            descricao: "Notebook Dell com Intel Core i5 e 8GB RAM",
            emEstoque: false
        },
        {
            id: 4,
            nome: "MacBook Air",
            preco: 8999.00,
            categoria: "Notebooks",
            imagem: "https://via.placeholder.com/300x200/F38181/FFFFFF?text=MacBook+Air",
            descricao: "Notebook Apple leve e potente",
            emEstoque: true
        },
        {
            id: 5,
            nome: "Fone Bluetooth",
            preco: 299.90,
            categoria: "Acessórios",
            imagem: "https://via.placeholder.com/300x200/AA96DA/FFFFFF?text=Fone+BT",
            descricao: "Fone de ouvido sem fio com cancelamento de ruído",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Mouse Gamer",
            preco: 199.00,
            categoria: "Acessórios",
            imagem: "https://via.placeholder.com/300x200/FCBAD3/FFFFFF?text=Mouse+Gamer",
            descricao: "Mouse com LED RGB e 7 botões programáveis",
            emEstoque: true
        },
        {
            id: 7,
            nome: "PlayStation 5",
            preco: 4299.00,
            categoria: "Games",
            imagem: "https://via.placeholder.com/300x200/A8D8EA/FFFFFF?text=PS5",
            descricao: "Console de última geração da Sony",
            emEstoque: false
        },
        {
            id: 8,
            nome: "Xbox Series S",
            preco: 2499.00,
            categoria: "Games",
            imagem: "https://via.placeholder.com/300x200/FFAAA5/FFFFFF?text=Xbox+Series+S",
            descricao: "Console compacto da Microsoft",
            emEstoque: true
        }
    ]
};


const productList = document.getElementById('product-list');
const productDetails = document.getElementById('product-details');
const btnRender = document.getElementById('btnRender');

const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');

function formatPrice(preco) {
    return "R$ " + preco.toFixed(2).replace('.', ',');
}

function createProductCard(produto) {
    const card = document.createElement('div');
    
    card.classList.add('card');
    
    card.setAttribute('data-id', produto.id);
    
    card.style.border = '1px solid #ddd';
    
    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <span class="card-categoria">${produto.categoria}</span>
        <p class="card-preco">${formatPrice(produto.preco)}</p>
        <button class="btn-detalhes">Ver detalhes</button>
        <button class="btn-destacar">Destacar</button>
    `;
    
    const btnDetalhes = card.querySelector('.btn-detalhes');
    btnDetalhes.addEventListener('click', function() {
        showProductDetails(produto);
    });
    
    const btnDestacar = card.querySelector('.btn-destacar');
    btnDestacar.addEventListener('click', function() {
        card.classList.toggle('highlight');
    });
    
    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = '';
    
    produtos.forEach(function(produto) {
        const card = createProductCard(produto);
        productList.appendChild(card); // appendChild adiciona o card na lista
    });
    
    const todosOsCards = document.querySelectorAll('.card');
    console.log('Total de cards renderizados:', todosOsCards.length);
    
    todosOsCards.forEach(function(card) {
        console.log('Card ID:', card.getAttribute('data-id'));
    });
}

function renderCategories() {
    const categorias = ['Todas'];
    
    data.produtos.forEach(function(produto) {
        if (!categorias.includes(produto.categoria)) {
            categorias.push(produto.categoria);
        }
    });
    
    categorySelect.innerHTML = '';
    
    categorias.forEach(function(categoria) {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    // Criar o HTML com as informações do produto
    const statusEstoque = produto.emEstoque 
        ? '<span style="color: green;">✓ Em estoque</span>' 
        : '<span style="color: red;">✗ Fora de estoque</span>';
    
    productDetails.innerHTML = `
        <h2>Detalhes do Produto</h2>
        <h3>${produto.nome}</h3>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Status:</strong> ${statusEstoque}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
    
    productDetails.classList.add('show');
}

function filterProducts() {

    const textoBusca = searchInput.value.toLowerCase();
    
    const categoriaSelecionada = categorySelect.value;
    
   
    const produtosFiltrados = data.produtos.filter(function(produto) {
        const nomeContem = produto.nome.toLowerCase().includes(textoBusca);
        const categoriaBate = categoriaSelecionada === 'Todas' || 
                              produto.categoria === categoriaSelecionada;
        return nomeContem && categoriaBate;
    });
    
    renderProducts(produtosFiltrados);
}

btnRender.addEventListener('click', function() {
    filterProducts();
});

searchInput.addEventListener('input', function() {
    filterProducts();
});

categorySelect.addEventListener('change', function() {
    filterProducts();
});

console.log('=== MINI ECOMMERCE CARREGADO ===');
console.log('Total de produtos:', data.produtos.length);
