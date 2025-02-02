document.addEventListener("DOMContentLoaded", function () {
    const heroText = document.querySelector(".hero h2");
    setTimeout(() => {
        heroText.style.textShadow = "0 0 15px cyan";
    }, 1500);
});
document.addEventListener("DOMContentLoaded", function () {
    let year = new Date().getFullYear();
    document.getElementById("current-year").textContent = year;
    document.getElementById("floating-year").textContent = year;
});
document.addEventListener("DOMContentLoaded", function () {
    loadComments();
});

// Function to Add Comment
function addComment() {
    let commentInput = document.getElementById("comment-input");
    let commentText = commentInput.value.trim();

    if (commentText !== "") {
        let commentList = document.getElementById("comments-list");

        // Create Comment Element
        let commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");

        let commentID = Date.now();
        commentDiv.setAttribute("data-id", commentID);

        commentDiv.innerHTML = `
            <p>${commentText}</p>
            <button class="reply-button" onclick="showReplyBox(${commentID})">Reply</button>
            <div class="reply-box" id="reply-box-${commentID}">
                <textarea id="reply-input-${commentID}" placeholder="Write a reply..." required></textarea>
                <button class="sci-fi-button" onclick="addReply(${commentID})">Post Reply</button>
            </div>
            <div class="replies" id="replies-${commentID}"></div>
        `;

        // Add to Comment List
        commentList.prepend(commentDiv);

        // Save to Local Storage
        saveComment({ id: commentID, text: commentText, replies: [] });

        // Clear Input Box
        commentInput.value = "";
    }
}

// Function to Show Reply Box
function showReplyBox(commentID) {
    let replyBox = document.getElementById(`reply-box-${commentID}`);
    replyBox.style.display = replyBox.style.display === "none" || replyBox.style.display === "" ? "block" : "none";
}

// Function to Add Reply
function addReply(commentID) {
    let replyInput = document.getElementById(`reply-input-${commentID}`);
    let replyText = replyInput.value.trim();

    if (replyText !== "") {
        let replyList = document.getElementById(`replies-${commentID}`);

        // Create Reply Element
        let replyDiv = document.createElement("div");
        replyDiv.classList.add("comment");
        replyDiv.innerHTML = `<p>${replyText}</p>`;

        // Add to Reply List
        replyList.appendChild(replyDiv);

        // Save to Local Storage
        saveReply(commentID, replyText);

        // Clear Input Box
        replyInput.value = "";
    }
}

// Function to Save Comment to Local Storage
function saveComment(commentObj) {
    let comments = JSON.parse(localStorage.getItem("wcetComments")) || [];
    comments.push(commentObj);
    localStorage.setItem("wcetComments", JSON.stringify(comments));
}

// Function to Save Reply to Local Storage
function saveReply(commentID, replyText) {
    let comments = JSON.parse(localStorage.getItem("wcetComments")) || [];
    let comment = comments.find(c => c.id === commentID);

    if (comment) {
        comment.replies.push(replyText);
        localStorage.setItem("wcetComments", JSON.stringify(comments));
    }
}

// Function to Load Comments & Replies from Local Storage
function loadComments() {
    let comments = JSON.parse(localStorage.getItem("wcetComments")) || [];
    let commentList = document.getElementById("comments-list");

    comments.reverse().forEach(comment => {
        let commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.setAttribute("data-id", comment.id);
        commentDiv.innerHTML = `
            <p>${comment.text}</p>
            <button class="reply-button" onclick="showReplyBox(${comment.id})">Reply</button>
            <div class="reply-box" id="reply-box-${comment.id}"></div>
            <div class="replies" id="replies-${comment.id}"></div>
        `;

        comment.replies.forEach(reply => {
            let replyDiv = document.createElement("div");
            replyDiv.classList.add("comment");
            replyDiv.innerHTML = `<p>${reply}</p>`;
            commentDiv.querySelector(".replies").appendChild(replyDiv);
        });

        commentList.appendChild(commentDiv);
    });
}
