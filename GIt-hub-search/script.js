const apiBaseURL = `https://api.github.com/users`;

//error message
const errorMessage = (status) => {
  const messageDiv = document.getElementById("message");
  let errmsg = "";
  if (response.status === 404) {
    errmsg = `<div class="alert alert-danger text-center">Profile doesn't exist.</div>`;
  }
  messageDiv.innerHTML = errmsg;
  setTimeout(() => {
    messageDiv.innerHTML = "";
  }, 3000);
};

//getting github profile
const getGitHubProfile = async (login) => {
  try {
    const response = await fetch(`${apiBaseURL}/${login}`);

    if (response.status !== 200) {
      if (response.status === 404) {
        errorMessage(response.status);
      }
      new Error(`Something went wrong! status code:${response.status}`);
    }
    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

//getting repos
const getGitRepos = async (login) => {
  try {
    const response = await fetch(`${apiBaseURL}/${login}/repos`);
    if (response.status !== 200) {
      new Error(`Something went wrong! status code:${response.status}`);
    }
    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

//rendering left snipeet
const renderProfile = (data) => {
  let profileSnnipet = ``;
  profileSnnipet += `
  <div class="profile-userpic">
                 <img src="${data.avatar_url}" class="d-block">
               </div>
               <div class="profile-usertitle"> 
               `; //this div is not closed bcoz we will add  item;
  //checking does the user has a name
  if (data.name !== null) {
    profileSnnipet += `<div class="profile-usertitle-name">${data.name}</div>`;
  }
  profileSnnipet += `<div class="profile-usertitle-job">
   ${data.login}
   </div>
   </div><!-- we are closing here-->
   <div class="portlet light bordered">
   <!-- STAT -->
            <div class="row list-separated profile-stat">
            <div class="col-md-6 col-sm-6 col-xs-6" >
                 <div class="uppercase profile-stat-title">${data.followers}</div>
                 <div class="uppercase profile-stat-text">Followers</div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
            <div class="uppercase profile-stat-title">${data.following}</div>
            <div class="uppercase profile-stat-text">Following</div>
            </div>
            </div>`;

  if (data.bio !== null) {
    profileSnnipet += `<div><h4 class="profile-desc-title">About ${data.name}</h4>
    <span class="profile-desc-text">${data.bio}</span></div>`;
  }

  if (data.twitter_username !== null) {
    profileSnnipet += `<div class="margin-top-20 profile-desc-link">
    <i class="fab fa-twitter"></i>
    <a target="_blank" href="https://www.twitter.com/${data.twitter_username}">@${data.twitter_username}</a>
    </div>`;
  }

  profileSnnipet += `</div>`; //closing the portlet light div
  document.getElementById("profile").innerHTML = profileSnnipet;
};

//list repos
const listRepos = (repo) => {
  let reposList = "";
  if (repo.length > 0) {
    repo.forEach((repo) => {
      reposList += `<li class="mb-3 d-flex flex-content-stretch col-12 col-md-6 col-lg-6">
      <div class="card" style="width: 22.5rem;">
        <div class="card-body">
        <h5 class="card-title"><a target="_blank" href="${repo.html_url}">${
        repo.name
      }</a></h5>
        
        <p class="card-text">${
          repo.description !== null ? repo.description : ""
        }</p>`;
      if (repo.language !== null) {
        reposList += `<i class="far fa-star"></i> ${repo.stargazers_count}</p>
          </div>
          </div>
          </li>`;
      }
    });
  }
  document.getElementById("repos").innerHTML = reposList;
};

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#searchForm");
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchInput = document.querySelector("#searchInput");
    const gitHubLogin = searchInput.value.trim();

    if (gitHubLogin.length > 0) {
      const userProfile = await getGitHubProfile(gitHubLogin);
      if (userProfile.login) {
        const gitRepos = await getGitRepos(gitHubLogin);
        renderProfile(userProfile);
        listRepos(gitRepos);
        document.querySelector(".searchblock").style.display = "none";
        document.querySelector(".profile").style.display = "block";
      }
    }
  });
});
