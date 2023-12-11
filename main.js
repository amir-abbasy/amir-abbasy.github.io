function gotoHome(go = true) {
  const coverPhotoTransform = go
    ? "translate(-50%, -50%)"
    : "translate(-0%, -50%)";
  const coverPhotoLeft = go ? "50%" : "0%";
  const coverPhotoBackground = go ? "./face_1.png" : "./face_2.png";

  $(".cover_photo")
    .addClass("transition-effect" + (go ? "-fast" : ""))
    .css({
      transform: coverPhotoTransform,
      left: coverPhotoLeft,
      "background-image": `url('${coverPhotoBackground}')`,
    });

  setTimeout(() => {
    $(".circle").toggleClass("fade_circle", !go);
  }, 200);

  $(".main_menu")
    .addClass("transition-effect-buttons")
    .css({
      transform: go ? "translate(-50%, -50%)" : "translate(-100%, -100%)",
      scale: go ? "1" : "0.5",
      opacity: go ? "1" : "0",
    });

  go ? $(".name_container").show() : $(".name_container").hide();

  if (go) {
    // section_skills
    $(".section_skills").css("display", "none");
    $(".section_skills .skill_el").css("opacity", "0");

    $(".section_projects").css("display", "none");
    $(".section_projects .projects_el").css("opacity", "0");

    $(".section_repos").css("display", "none");
    $(".section_repos .repos_el").css("opacity", "0");

    $(".section_about").css("display", "none");
  }
}

// SECTION SKILLS

function showSkill() {
  gotoHome(false);
  // load more
  $(".section_skills").css("display", "grid");
  anime({
    targets: ".section_skills .skill_el",
    // translateX: -window.innerWidth - -window.innerWidth/3,
    keyframes: [
      { translateX: 400, opacity: 0 },
      { translateX: -0, opacity: 1 },
    ],
    delay: anime.stagger(150), // increase delay by 100ms for each elements.
  });
}

function showCircle() {
  gotoHome();
}

// SECTION ABOUT
function showAbout(show = true) {
  gotoHome(!show);
  $(".section_about").css("display", "block");

  fetch("./data.json").then(async (response) => {
    var json = await response.json();
    json.experience.reverse().forEach((exp) => {
      var stacks = exp.stacks.map((stack) => `<span>${stack}</span>`);
      $(".experience").append(`<div class="exp">
      <p class="exp_date">${exp.time}</p>
      <div class="exp_main">
        <div class="content">
          <p class="role">${exp.role}</p>
          <h1 class="title">${exp.title}</h1>
          <p class="desc">${exp.desc}
          </p>
          <div class="stacks">
           ${stacks.join(' ')}
          </div>
        </div>
      </div>
    </div>`);
    });
  });

  // anime({
  //   targets: ".section_repos .repos_el",
  //   keyframes: [
  //     { translateY: 400, opacity: 0 },
  //     { translateY: -0, opacity: 1 },
  //   ],
  //   delay: anime.stagger(150),
  // });
}

// SECTION Projects
function showProjects(show = true) {
  gotoHome(!show);
  $(".section_projects").css("display", "block");
  anime({
    targets: ".section_projects .projects_el",
    keyframes: [
      { translateY: 400, opacity: 0 },
      { translateY: -0, opacity: 1 },
    ],
    delay: anime.stagger(150),
  });
}

// SECTION Repos
function showRepos(show = true) {
  gotoHome(!show);
  $(".section_repos").css("display", "block");
  anime({
    targets: ".section_repos .repos_el",
    keyframes: [
      { translateY: 400, opacity: 0 },
      { translateY: -0, opacity: 1 },
    ],
    delay: anime.stagger(150),
  });
}

// SET DATA

$(document).ready(function () {
  fetch("./data.json").then(async (response) => {
    var json = await response.json();
    // console.log("--", json.projects);
    if (!json) return;
    json.projects.forEach((element) => {
      $(".section_projects").append(`<li class="projects_el">
        <a href="${element.link}">${element.name}</a>
        <p class="des">${element.des}</p>
        </li>`);
    });

    // skills
    json.skills.forEach((skill) => {
      $(".section_skills").append(`<div class="skill_el">${skill}</div>`);
    });

 
  });

  // GIT REPOS
  fetch("https://api.github.com/users/amir-abbasy/repos").then(
    async (response) => {
      var repos = await response.json();
      // console.log(repos);
      repos.forEach((repo) => {
        $(".section_repos").append(`<li class="repos_el">
          <div>
          <a target="_blank" href="${repo.html_url}">${repo.name}</a>
          <p class="des">${repo?.description ?? repo.html_url}</p>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/128/4926/4926624.png" class="git_logo" />
          </li>`);
      });
    }
  );

  const greetingMessage = getTimeGreeting();
  console.log(greetingMessage);
  $("#greeting").text(greetingMessage);
  // $('#time_greeting').text('')
});

function getTimeGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning!";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon!";
  } else {
    return "Good evening!";
  }
}



