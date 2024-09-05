const nfts = document.querySelector("#nfts");
const nftBottom = document.querySelector(".nft-bottom");
const loadMoreBtn = document.querySelector("#load-more");
const searchInput = document.querySelector("#search");

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
    });
}

let skip = 0;
let hasMore = true;
async function getNfts(count = 0) {
    skip += count;

    const response = await fetch(`http://localhost:3000/api/nfts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pageSize: 3,
            skip: skip,
        }),
    });
    const nftsData = await response.json();
    hasMore = nftsData.hasMore;
    console.log(nftsData);
    fillNfts(nftsData.nfts);
}

loadMoreBtn.addEventListener("click", () => {
    getNfts(3);
    if (!hasMore) {
        Toastify({
            text: "This is no more items.",
            style: {
                background: "red",
            },
            duration: 1000,
        }).showToast();
        return;
    }
});

searchInput.addEventListener("keyup", async (e) => {
    const response = await fetch(`http://localhost:3000/api/nfts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "pageSize": "18",
            "searchStr": e.target.value,
        }),
    });
    const nftsData = await response.json();
    nftBottom.innerHTML = "";
    fillNfts(nftsData.nfts);
    loadMoreBtn.style.display = "none";
});

getNfts();
