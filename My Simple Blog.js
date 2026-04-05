document.addEventListener("DOMContentLoaded", () => {
  // dom elements

  const postsContainer = document.getElementById("postsContainer");
  const form = document.getElementById("blogForm");
  const newPostBtn = document.getElementById("newPostBtn");
  const blogmodal = document.getElementById("blogModal");
  const viewmodal = document.getElementById("viewModal");
  const cancelBtn = document.getElementById("cancelBtn");
  const closeviewbtn = document.getElementById("closeViewBtn");
  const closebtns = document.querySelectorAll(".close-btn");
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  // event listeners
  displayposts();
  newPostBtn.addEventListener("click", createmodal);
  cancelBtn.addEventListener("click", closemodal);
  closebtns.forEach((btn) => {
    btn.addEventListener("click", closemodal);
  });

  blogmodal.addEventListener("submit", handleformsubmit);

  function createmodal() {
    blogmodal.classList.add("active");
  }

  function closemodal() {
    blogmodal.classList.remove("active");
    viewmodal.classList.remove("active");
  }

  function handleformsubmit(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const imageUrl = document.getElementById("image").value;
    const postid = document.getElementById("postId").value;

    const newpost = {
      id: Date.now(),
      title,
      description,
      imageUrl,
      id: postid,
    };

    posts.unshift(newpost);
    saveposts();
    form.reset();
    closemodal();
    displayposts();
  }

  function displayposts() {
    postsContainer.innerHTML = "";
    if (posts.length === 0) {
      postsContainer.innerHTML =
        "<div class='no-posts'>No posts available.</div>";
      return;
    }
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerHTML = `
    ${
      post.imageUrl
        ? `<img src="${post.imageUrl}" class=post-img alt="${post.title}">`
        : ""
    }
    <h2 class="post-title">${post.title}</h2>
    <p class="post-description">${
      post.description.length > 100
        ? `${post.description.substring(0, 100)}...`
        : post.description
    }</p>
    <div class="post-actions">
      <button class=" btn btn-outline view-btn" data-id="${
        post.id
      }">View More</button>
      <button class=" btn btn-outline edit-btn" data-id="${
        post.id
      }">Edit</button>
      <button class="btn dangar delete-btn" data-id="${post.id}">Delete</button>
    </div>
    `;
      postsContainer.appendChild(postElement);
    });
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", viewpost);
    });
    document.querySelectorAll(".edit-btn").forEach((bt)=>{
      bt.addEventListener("click",deleted);
    })
  }

  const saveposts = () => {
    localStorage.setItem("posts", JSON.stringify(posts));
  };
  function viewpost(e) {
    const postId = e.target.getAttribute("data-id");
    const post = posts.find((p) => p.id == postId);
    if (post) {
      document
        .getElementById("viewModalTitle").textContent=post.title;
      const viewModalBody=document.getElementById("viewModalBody")
      viewModalBody.innerHTML=` ${
      post.imageUrl
        ? `<img src="${post.imageUrl}" class=post-img alt="${post.title}">`
        : ""
    } <P>${post.description}</P>

    `
    }
    viewmodal.classList.add("active");
  }

  function deleted(e){
    const postId = e.target.getAttribute("data-id");
    const postIndex = posts.findIndex((p) => p.id == postId);
    if(postIndex>-1){
      posts.splice(postIndex,1);
      saveposts();
      displayposts();
    }
  }

});
