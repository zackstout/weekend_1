console.log('js');
$(document).ready(f1);

//Connect pressing "enter" to submitting form:
$(document).keypress(function(e) {
    if(e.which == 13) {
        submitInfo();
    }
});

function f1(){
  console.log('jq');
  $('#submit').on('click', submitInfo);
  $('#table').on('click', '.lose', deleteIt);
}

var cost = 0;

function submitInfo(){
  var $first = $('#first').val();
  var $last = $('#last').val();
  var $id = $('#id').val();
  var $title = $('#title').val();
  var $sal = $('#sal').val();
  var month = (parseInt($sal)/12);

  //Ensure salary input is valid:
  var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (var i = 0; i < $sal.length; i++){
    if (!nums.includes($sal.charAt(i))){
      alert("Salary must be a number . . .");
      $('#sal').val('');
      return;
    }
  }
  if ($sal.length === 0){
    alert("Please enter a salary . . .");
    return;
  }

  //Append entered data to the table:
  $('#store').append('<tr><td>' + $last + ', ' + $first +
  '</td><td>' + $id + '</td><td id="title">' + $title + '</td><td id="money">' +
  cleanMoney($sal) + '</td><td id="gone"><button class="lose">YA FIRED!</button></td></tr>'
);
$('#first').val('');
$('#last').val('');
$('#id').val('');
$('#title').val('');
$('#sal').val('');

//Add the hired employee's salary to the cost and update the DOM:
cost += Number(month);
console.log($sal);
console.log(cost);
console.log(month);
$('#output').text(cleanMoney(cost.toFixed(2)));
}

function deleteIt(){
  $(this).parent().parent().remove();

  //Convert "clean" salary-string to a number:
  var moneyString = $(this).parent().prev().text();
  var dirtyMoney = '';
  for (var i = 0; i < moneyString.length; i++){
    var x = moneyString.charAt(i);
    if ((x !== ',') && (x !== '$')){
      dirtyMoney += x;
    }
  }
  console.log(Number(dirtyMoney));

  //Subtract the deleted employee's salary from total cost and update the DOM:
  cost -= (Number(dirtyMoney)/12);
  $('#output').text(cleanMoney(cost.toFixed(2)));
}

//Format the salary string:
function cleanMoney(num){
  var out = '', str = String(num);
  for (var i = 1; i <= str.length; i++){
    var x = str.charAt(str.length - i);
    out = x + out;
    if (i % 3 === 0 && i < str.length &&
      !((str.includes('.')) && i === 3)){
        out = ',' + out;
      }
    }
    out = '$' + out;
    return out;
  }
