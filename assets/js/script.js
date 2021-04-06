
var tableBody = document.getElementById('results');
var fetchButton = document.getElementById('get-button');

function getApi() {
    var searchField = document.getElementById('searchField')
    //saving search data
    localStorage.setItem("searchedCity", searchField.value);
    //showMessage();<-- could not ge this to work :(

  // fetch request 
  var requestUrl =  'https://api.openweathermap.org/data/2.5/forecast?zip='+searchField.value+'&units=imperial&appid=03f0c8b418c584aa207b383e5b4ab47c';
  ;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     console.log(data)
      //console.log(data.list)

      //Loop over the data to generate a table
      for (var i = 0; i < data.list.length; i++) {
        fiveDays = data.list.filter(function(value, index, Arr){
            return index % 7 == 0;
        })
        

        iconArray = fiveDays[i].weather[0].icon;
        
        // Creating elements
        var createTableRow = document.createElement('tr');
        var tableData = document.createElement('td');
        var temp = document.createElement('p');
        var tempMin = document.createElement('p');
        var feelsLike = document.createElement('p');
        var pTag = document.createElement('p');
        var dateStamp = document.createElement('p');
        var typeDay = document.createElement('p');
        var icon = document.createElement('img')
        

        //clearing old info for newvar table
        
        
        // Setting the text-- looping through array
        dateStamp.textContent = "Date: "+ fiveDays[i].dt_txt;
        icon.src = 'http://openweathermap.org/img/wn/'+iconArray+'@2x.png'
        typeDay.textContent = "Skys: "+ fiveDays[i].weather[0].main; 
        temp.textContent = "Temp: "+ fiveDays[i].main.temp;
        feelsLike.textContent = "Feels like: "+ fiveDays[i].main.feels_like;
        tempMin.textContent = "Low: "+ fiveDays[i].main.temp_min;
        pTag.textContent = "Humidity: "+ fiveDays[i].main.humidity;
        
        
        //
        //changing colors
        createTableRow.style.backgroundColor = '#3d85c6';
        createTableRow.style.color = 'white';
        createTableRow.style.margin = '8px';
        createTableRow.style.border = 'thick solid #575f68'
        temp.style.marginLeft = '18px';
        typeDay.style.marginLeft = '18px';
        feelsLike.style.marginLeft = '18px';
        tempMin.style.marginLeft = '18px';
        pTag.style.marginLeft = '18px'; 

        // Appending the tabledata 

        tableData.appendChild(dateStamp);
        //tableData.appendChild(cityName);
        tableData.appendChild(icon);
        tableData.appendChild(typeDay);
        tableData.appendChild(temp);
        tableData.appendChild(feelsLike);
        tableData.appendChild(tempMin);
        tableData.appendChild(pTag);
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
        
        
      }
      
    });
    
  
}

fetchButton.addEventListener('click', getApi);

function changeColorClouds(){
    if (typeDay.textContent.includes('clouds')){
      typeDay.style.backgroundColor = 'gray';
    }
} 

function showMessage(){
  var last = document.getElementById('lastzipcode')
  var zipcode = JSON.parse(localStorage.getItem("searchedCity"));
  if (zipcode !== null){
   last.textContent = zipcode;
  }
}


