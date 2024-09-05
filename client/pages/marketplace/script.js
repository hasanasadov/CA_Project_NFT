const nfts = document.querySelector("#nfts");
const nftBottom = document.querySelector(".nft-bottom");
const loadMoreBtn = document.querySelector("#load-more");
function fillNfts(nftsData) {
    nftsData.forEach((nft) => {
        const nftElement = document.createElement("div");
        nftElement.classList.add("nft-item");
        nftElement.innerHTML = `
                <div class="nft-image">
                    <img src="../../../${nft.imgPath}" alt="">
                </div>
                <div class="nft-image-bottom">
                    <h5>Space Walking</h5>
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
async function getNfts(count = 0) {
    skip += count;
    const response = await fetch(`http://localhost:3000/api/nfts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "pageSize": 3, 
            "skip": skip
        }),
    });
    const nftsData = await response.json();
    fillNfts(nftsData.nfts);
    if(!nftsData.hasMore){return;} 
}

loadMoreBtn.addEventListener("click", () => {
    getNfts(3);
});


getNfts();
