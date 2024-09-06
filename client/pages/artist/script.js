



async function getCreatorInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const creatorId = urlParams.get("id");
    try {
        const response = await fetch(`http://localhost:3000/api/creators/${creatorId}`);
        const creator = await response.json();
        console.log(creator);
    } catch (error) {
        console.log(error);
    }
}

getCreatorInfo();