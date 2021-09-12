const form = document.querySelector('.form');
const input = document.querySelector('.input');
const button = document.querySelector('.button');
const results = document.querySelector('.results');

const fetchSearchResults = async (query) => {
    const res = await fetch(`https://paneer-store.herokuapp.com/dishes?q=${query}`);
    if (res.status >= 200 && res.status <= 299) {
        const data = await res.json();
        return data;
    }
    console.log(res.status, res.statusText);
}

const getInput = () => {
    return input.value;
}

const renderItem = (item) => {
    const markup = `
    <a href="#" class="item">
        <p class="item-title">${item.name}</p>
    </a>
    `; 
    results.insertAdjacentHTML('beforeend', markup);
}

const renderItems = (items) => items.forEach(renderItem);

const renderResults = async () => {
    const query = getInput();
    if(query){
        const res = await fetchSearchResults(query);
        renderItems(res);
    }
}

const clearResults = () => {
    results.innerHTML = '';
}


form.addEventListener('submit', e => {
    e.preventDefault();
    clearResults();
    renderResults();
});