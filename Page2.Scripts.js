
let currentPost = 0;
const postPerRow = 9;

// Fetcher posts og displayer
function fetchPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts?_start=${currentPost}&_limit=${postPerRow}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error with the status: " + response.status);
            }
            return response.json();
        })
        .then((posts) => {
            let postContainer = document.getElementById("postContainer");
            posts.forEach (post => {
                postContainer.innerHTML += `
                <div class="post">
                     <h2>${post.title}</h2>
                     <p>${post.body}</p>
                 </div>
                 `;
            });
        });
    currentPost += postPerRow;
}

// Sjekk om brukeren har scrollet til bunnen av siden
function checkScrollPosition() {

    const scrollPosition = window.innerHeight + window.scrollY;
    const bottomPosition = document.body.offsetHeight;

    if (scrollPosition >= bottomPosition - 100) {
        // Kall fetchPosts() for å hente nye innlegg
        fetchPosts();
    }
}

// Lytt etter når brukeren scroller og kjør checkScrollPosition
window.addEventListener('scroll', checkScrollPosition);

fetchPosts();