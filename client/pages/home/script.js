const creators = document.querySelector(".creators");

const joinForm = document.querySelector(".form-join");
const joinEmail = joinForm.querySelector("#join-email");

function validateJoinEmailInput() {
    let value = joinEmail.value.trim();
    let isTrue = true;
    if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        joinEmail.parentElement.classList.remove("error8");
        joinEmail.parentElement.classList.remove("errorbadge");
        joinEmail.parentElement.classList.add("done8");
    } else {
        joinEmail.parentElement.classList.add("error8");
        joinEmail.parentElement.classList.remove("done8");
        joinEmail.parentElement.classList.add("errorbadge");
        isTrue = false;
    }
    return isTrue;
}

function joinEmaill() {
    joinEmail.addEventListener("keyup", validateJoinEmailInput);
}
joinEmaill()

joinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isEmailValid = validateJoinEmailInput();

    if (isEmailValid) {
        Toastify({
            text: "Subscribed successfully",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "info",
        }).showToast();
    }
    else {
        Toastify({
            text: "Not subscribed",
            backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
            className: "info",
        }).showToast();
    }
    joinEmail.value = "";
    joinEmail.parentElement.classList.remove("error8");
    joinEmail.parentElement.classList.remove("errorbadge");
    joinEmail.parentElement.classList.add("done8");
});








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

    item.addEventListener("click", () => {
        window.location.href = `../artist/index.html?id=${creator.id}`;
    });

}

async function getCreators() {
    const response = await fetch("http://localhost:3000/api/creators");
    const creators = await response.json();
    creators.forEach(creator => createCreatorCard(creator));
}


getCreators();




const nftBottom = document.querySelector(".nft-bottom");
const loadMoreBtn = document.querySelector("#load-more");
const searchInput = document.querySelector("#search");
const nftCount= document.querySelector("#nft-count");


function fillNfts(nftsData) {
    nftsData.forEach((nft) => {
        const nftElement = document.createElement("div");
        nftElement.classList.add("nft-item");
        nftElement.innerHTML = `
                <div class="nft-image">
                    <img src="../../../${nft.imgPath}" alt="">
                </div>
                <div class="nft-image-bottom">
                    <h5>${nft.name}</h5>
                    <div class="nft-image-bottom__bottom">
                        <img src="../../../${nft.creator.profileImgPath}" alt=""> ${nft.creator.name}
                    </div>
                    <div class="nft-price">
                        <div class="price-left">
                            <p>Price</p>
                            <span>${nft.price.value} ${nft.price.currency}</span>
                        </div>
                        <div class="price-right">
                            <p>Highest Bid</p>
                            <span>${nft.highestBid.value} ${nft.highestBid.currency}</span>
                        </div>
                    </div>
                </div>
        `;
        nftBottom.appendChild(nftElement);
        console.log(nftBottom);

    });
}

async function getNfts(count = 3) {
    const response = await fetch(`http://localhost:3000/api/nfts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pageSize: count,
        }),
    });
    const nftsData = await response.json();
    console.log(nftsData);
    fillNfts(nftsData.nfts);
}

getNfts();
