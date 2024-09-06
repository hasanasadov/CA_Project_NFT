



async function getCreatorInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const creatorId = urlParams.get("id");
    try {
        const response = await fetch(`http://localhost:3000/api/creators/${creatorId}`);
        const creator = await response.json();
        return creator;
    } catch (error) {
    }
}

getCreatorInfo();



const nfts = document.querySelector("#creators");
const creatorBottom = document.querySelector(".creator-bottom");
let creator = getCreatorInfo();

function fillCreators(creator) {
    if (creator.nfts.length === 0) {
        nfts.innerHTML = `
            <div class="no-creators">
                <h2>No NFTs found</h2>
            </div>
        `;
    }
    creator.nfts.forEach((data) => {
        const creatorElement = document.createElement("div");
        creatorElement.classList.add("creator-item");
        creatorElement.innerHTML = `
                <div class="creator-image">
                    <img src="../../../${data.imgPath}" alt="">
                </div>
                <div class="creator-image-bottom">
                    <h5>${data.name}</h5>
                    <div class="creator-image-bottom__bottom">
                        <img src="../../../${creator.profileImgPath}" alt=""> ${data.name}
                    </div>
                    <div class="creator-price">
                        <div class="price-left">
                            <p>Price</p>
                            <span>${data.price.value} ${data.price.currency}</span>
                        </div>
                        <div class="price-right">
                            <p>Highest Bid</p>
                            <span>${data.highestBid.value} ${data.highestBid.currency}</span>
                        </div>
                    </div>
                </div>
        `;
        creatorBottom.appendChild(creatorElement);
    });
}

creator.then((data) => {
    fillCreators(data);
});
