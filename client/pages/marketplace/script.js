const nfts = document.querySelector("#nfts");
const nftBottom = document.querySelector(".nft-bottom");
const loadMoreBtn = document.querySelector("#load-more");
const searchInput = document.querySelector("#search");
const nftCount = document.querySelector("#nft-count");
const allNfts_btn = document.querySelector("#allNfts-btn");
const favoriteBtn = document.querySelector("#favorite-btn");

/*! -------------------------- FILL NFTS -------------------------- */
function fillNfts(nftsData) {
    nftsData.forEach((nft) => {
        const nftElement = document.createElement("div");
        nftElement.classList.add("nft-item");
        nftElement.innerHTML = `
                <button id="heart"><img src="../../assests/svg/heart.svg" alt="${nft.name}"></button>
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
let likedDatas = new Array();
function likedNFTS() {
    let heartItems = document.querySelectorAll("#heart");
    heartItems.forEach((heartItem) => {
        heartItem.addEventListener("click", (e) => {
            if (e.target.src.includes("heart-fill")) {
                e.target.src = "../../assests/svg/heart.svg";
                return;
            }
            e.target.src = "../../assests/svg/heart-fill.svg";
            likedDatas.push(e.target.alt);
            likedDatas = likedDatas.filter((item, index) => likedDatas.indexOf(item) === index);
            console.log(likedDatas);
            favoriteBtn.querySelector("span").innerHTML = likedDatas.length;
        });
    });

}
favoriteBtn.addEventListener("click",() => {
    favoriteBtn.classList.add("selected");
    favoriteBtn.classList.remove("not-selected");
    allNfts_btn.classList.remove("selected");
    allNfts_btn.classList.add("not-selected");
    nftBottom.innerHTML = "";
    loadMoreBtn.style.display = "none";
    likedDatas.forEach(async(likedData) => {
        try {
            const response = await fetch(`http://localhost:3000/api/nfts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pageSize: 18,
                    searchStr: likedData,
                }),
            });
            let data = await response.json();
            console.log(data);
            fillNfts(data.nfts);  
        } catch (err) {
            console.log(err);
            Toastify({
                text: err,
                style: {
                    background: "red",
                },
                duration: 3000,
            }).showToast();
        }
    });
    likedNFTS();

});

allNfts_btn.addEventListener("click", () => {
    nftBottom.innerHTML = "";
    allNfts_btn.classList.add("selected");
    allNfts_btn.classList.remove("not-selected");
    favoriteBtn.classList.remove("selected");
    favoriteBtn.classList.add("not-selected");
    getNfts();
    loadMoreBtn.style.display = "block";
});

/*! -------------------------- FILL NFTS END -------------------------- */

/*! -------------------------- GET NFTS by skip -------------------------- */
let skip = 0;
let hasMore = true;
async function getNfts(count = 0) {
    skip += count;
    try {
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
        nftCount.innerHTML = nftsData.totalCount;
        fillNfts(nftsData.nfts);
        likedNFTS();
    } catch (err) {
        console.log(err);
        Toastify({
            text: err,
            style: {
                background: "red",
            },
            duration: 3000,
        }).showToast();
    }
}

/*! -------------------------- GET NFTS by skip END -------------------------- */

/*! -------------------------- Load More Button -------------------------- */
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
/*! -------------------------- Load More Button END -------------------------- */

/*! -------------------------- Search NFTS -------------------------- */
searchInput.addEventListener("keyup", async (e) => {
    try {
        const response = await fetch(`http://localhost:3000/api/nfts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pageSize: "18",
                searchStr: e.target.value,
            }),
        });
        const nftsData = await response.json();
        nftBottom.innerHTML = "";
        fillNfts(nftsData.nfts);
        loadMoreBtn.style.display = "none";
    } catch (err) {
        console.log(err);
        Toastify({
            text: err,
            style: {
                background: "red",
            },
            duration: 3000,
        }).showToast();
    }
});
/*! -------------------------- Search NFTS END -------------------------- */


setTimeout(() => {
    nftBottom.innerHTML = "";
}, 1000);
setTimeout(() => {
    getNfts();
}, 1000);
