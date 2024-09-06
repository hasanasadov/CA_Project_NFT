



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
const profileImg = document.querySelector("#profile-img");
const creatorName = document.querySelector("#creator-name");
const nftSold = document.querySelector("#nft-sold");
const volume = document.querySelector("#volume");
const followers = document.querySelector("#followers");
const creator_bio = document.querySelector("#creator-bio");
const chainIds = document.querySelectorAll("#chainId");
const created_nft_length = document.querySelector("#created-nft-length");
function fillCreators(creator) {
    if (creator.nfts.length === 0) {
        nfts.innerHTML = `
            <div class="no-creators">
                <h2>No NFTs found</h2>
            </div>
        `;
    }
    creatorName.innerHTML = `${creator.name}`;
    profileImg.src = `../../../${creator.profileImgPath}`;
    nftSold.innerHTML = `${creator.nftSold > 1000 ? creator.nftSold/1000 + `k` : creator.nftSold }`;
    volume.innerHTML = `${creator.volume > 1000 ? creator.volume/1000 + `k` : creator.volume }`;
    followers.innerHTML = `${creator.followers > 1000 ? creator.followers/1000 + `k` : creator.followers }`;
    creator_bio.innerHTML = `${creator.bio}`;
    created_nft_length.innerHTML = `${creator.nfts.length}`;
    chainIds.forEach((chainId) => {
        chainId.innerHTML = `<img src="../../assests/svg/copy.svg" alt="">${creator.chainId}`;
        if (creator.chainId.length > 10) {
            chainId.innerHTML = `<img src="../../assests/svg/copy.svg" alt="">${creator.chainId.slice(0,5)}...${creator.chainId.slice(-5)}`;
        }
        chainId.addEventListener("click", () => {
            navigator.clipboard.writeText(creator.chainId);
            chainId.innerHTML = `<img src="../../assests/svg/copy.svg" alt="">Copied!`;
            setTimeout(() => {
                chainId.innerHTML = `<img src="../../assests/svg/copy.svg" alt="">${creator.chainId.slice(0,5)}...${creator.chainId.slice(10,creator.chainId.length)}`;
            }, 1000);
        }
        );
    });
    
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
