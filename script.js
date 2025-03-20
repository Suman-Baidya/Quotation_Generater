
const newQuoteButton = document.getElementById("new-quote");
const copyButton = document.getElementById("copy-button");
const twitterButton = document.getElementById("twitter-button");
const exportButton = document.getElementById("export-button");

const quote_description = document.getElementById("quote-description");
const author_name = document.getElementById("author-name");

const canvas = document.getElementById("full-card");

const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';

async function getData() {
    const promise = await fetch(url);
    return await promise.json();
}

newQuoteButton.addEventListener("click", async () => {
    const result = await getData();
    quote_description.innerText = result.data.content;
    author_name.innerText = result.data.author;
})

copyButton.addEventListener("click", () => {

    const quote = quote_description.innerText;
    const quoteAuthor = author_name.innerText;
    const final_copying_value = `"${quote}" by -${quoteAuthor}`

    navigator.clipboard.writeText(final_copying_value);
})

twitterButton.addEventListener("click", () => {
    const quote = quote_description.innerText;
    const quoteAuthor = author_name.innerText;
    let tweetText = `"${quote}" by -${quoteAuthor}`;
    let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    window.open(tweetUrl, "_blank"); // For shair to twitter
})

exportButton.addEventListener("click", () => {

    html2canvas(canvas).then(canvas => {
        let image = canvas.toDataURL("image/jpeg", 1.0); // Convert canvas to JPG
        let link = document.createElement("a");
        link.href = image;
        link.download = "quotation.jpg"; // Set file name
        link.click();
    });
})
