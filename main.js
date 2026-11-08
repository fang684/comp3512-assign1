/*import*/
import config from './data-minifed.json' with { type: 'json' };

document.addEventListener('DOMContentLoaded', () => 
{
    // Select the results container
    const resultsContainer = document.querySelector('#results');
    
    // Get the first 20 products
    const firstTwentyProducts = config.products.slice(0, 20);
    
    // Build cards for the first 20 products
    for (const product of firstTwentyProducts) 
    {
        const card = createProductCard(product);
        resultsContainer.appendChild(card);
    }
    
    // Listen for clicks on the results container
    resultsContainer.addEventListener('click', handleCardClick);
});



/** Creates the HTML elements for a single product card. */
function createProductCard(product) 
{
    const card = document.createElement('article');
    card.className = 'card';
    card.title = product.title; /*shows full name when hovered*/
    
    // Create thumbnail button wrapper
    const thumbBtn = document.createElement('button');
    thumbBtn.type = 'button';
    thumbBtn.className = 'thumb-button';
    thumbBtn.dataset.action = 'view';
    thumbBtn.dataset.id = product.id;
    
    // Create image
    const img = document.createElement('img');
    img.className = 'thumb-image';
    img.src = product.thumbnail;
    img.alt = product.title;
    img.loading = 'lazy';
    
    // Handle broken images by adding the missing class
    img.addEventListener('error', () => 
    {
        thumbBtn.classList.add('thumb-button--missing');
    }, { once: true });
    
    thumbBtn.appendChild(img);
    
    //footer
    const footer = document.createElement('div');
    footer.className = 'card-footer';
    
    //text container
    const textContainer = document.createElement('div');
    textContainer.className = 'card-text';
    
    //title
    const title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = product.title;
    title.title = product.title; 
    
    //price
    const price = document.createElement('p');
    price.className = 'card-price';
    price.textContent = "$" + product.price.toFixed(2);
    
    textContainer.appendChild(title);
    textContainer.appendChild(price);
    
    // Add to Cart button
    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'add-button';
    addBtn.textContent = '+';
    addBtn.dataset.action = 'add';
    addBtn.dataset.id = product.id;
    addBtn.dataset.title = product.title;
    
    footer.appendChild(textContainer);
    footer.appendChild(addBtn);
    
    card.appendChild(thumbBtn);
    card.appendChild(footer);
    
    return card;
}

/** Click events handler  inside the results container. */
function handleCardClick(event) 
{
    // Find the closest element with a data action attribute
    const actionElement = event.target.closest('[data-action]');
    
    if (actionElement != null) 
    {
        const action = actionElement.dataset.action;
        
        // Check if thumbnail was clicked
        if (action === 'view') 
        {
            alert("Product ID: " + actionElement.dataset.id);
        }
        // Check if Add to Cart button was clicked
        else if (action === 'add') 
        {
            alert("Product ID: " + actionElement.dataset.id + "\nTitle: " + actionElement.dataset.title);
        }
    }
}