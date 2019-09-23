$(".asc").show();
$(".desc").hide();

$("#desc").on("click", function() {
  $(".asc").hide();
  $(".desc").show();
  $('input[type="checkbox"]').prop("checked", false);
});

$("#asc").on("click", function() {
  $(".desc").hide();
  $(".asc").show();
  $('input[type="checkbox"]').prop("checked", true);
});

$('input[type="checkbox"]').click(function() {
  if ($(this).prop("checked") == true) {
    $(".desc").hide();
    $(".asc").show();
  } else if ($(this).prop("checked") == false) {
    $(".asc").hide();
    $(".desc").show();
  }
});

$('input[type="search"]').on("keyup", function() {
  var searchValue = $(this)
      .val()
      .toLowerCase(),
    names = document.querySelectorAll(".info span"),
    nameDisplay = document.querySelectorAll(".container");

  if (searchValue != " ") {
    names.forEach(function(name, i) {
      if (name.innerHTML.toLowerCase().indexOf(searchValue) > -1) {
        nameDisplay[i].style.display = "";
      } else {
        nameDisplay[i].style.display = "none";
      }
    });
  }
});
