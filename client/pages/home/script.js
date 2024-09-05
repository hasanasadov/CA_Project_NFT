const creators = document.querySelector(".creators");


// Function to create a creator card
function createCreatorCard(creator) {
    const item = document.createElement("div");
    item.classList.add("creator");
    item.innerHTML = `
            <span class="creator-id">${creator.id}</span>
            <div class="creator-top">
                <img src="../../../${creator.profileImgPath}" alt="">
            </div>
            <div class="creatop-bottom">
                <h5>${creator.name}</h5>
                <div class="spans">
                    <span>Total Sales:</span>
                    <span class="creator-span2">${creator.totalSale.value} ${creator.totalSale.currency}</span>
                </div>
            </div>
    `;
    creators.appendChild(item);
}

async function getCreators() {
    const response = await fetch("http://localhost:3000/api/creators");
    const creators = await response.json();
    creators.forEach(creator => createCreatorCard(creator));
    console.log(creators);
}

getCreators();


