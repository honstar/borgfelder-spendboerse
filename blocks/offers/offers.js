const OFFERS_JSON = '/offers.json';

export default function decorate(block) {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  block.append(loader);

  const url = `${window.hlx.codeBasePath}${OFFERS_JSON}`;
  console.log(`url: ${url}`);

  const offerContainer = document.createElement('div');
  offerContainer.classList.add('container');

  loadOffers(url).then(items => {
    items.forEach(item => {
      const offerEl = document.createElement('div');
      offerEl.classList.add('item');

      const title = document.createElement('h3');
      title.innerText = item.title;
      
      const description = document.createElement('p');
      const descText = document.createTextNode(item.description);
      description.appendChild(descText);

      offerEl.appendChild(title);
      offerEl.appendChild(description);

      offerContainer.appendChild(offerEl);
    });

    loader.parentElement.removeChild(loader);
    block.append(offerContainer);
  });
}

async function loadOffers(url) {
  const response = await fetch(url);
  const offers = await response.json();
  if (!response.ok) {
      throw new Error(`Unexpected response: ${res.status} . ${JSON.stringify(res)}`);
  }
  console.log(`found ${offers.total} items in JSON response`);

  await new Promise(r => setTimeout(r, 500));

  return offers.data;
}
