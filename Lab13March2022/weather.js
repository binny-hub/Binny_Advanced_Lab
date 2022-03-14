const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const searchBox=document.querySelector('.search-box');
  searchBox.addEventListener('keypress', setQuery);

  function setQuery(evt){
      if(evt.keyCode== 13){
          // Enter key - 13 is the ASCII code
          getResults(searchBox.value);

      }
  }

  function getResults(city){
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
      .then(weather => {
          return weather.json();
      }).then(response => {
            console.log(response)
            displayResults(response)
      });
    }

    function displayResults(response){
        let city = document.querySelector('.location .city');
        city.innerText= `${response.name}, ${response.sys.country}`;

        let now = new Date();
        let myDate= document.querySelector('.location .date');
        myDate.innertext= dateBuilder(now);

        let temp = document.querySelector('.current .temp');
        temp.innerHTML=`${Math.round(response.main.temp)} <span>&deg;c</span>`;
        
        let weather= document.querySelector('.current .weather');
        weather.innerText= response.weather[0].main;
        
        let highLow= document.querySelector('.hi-low');
        highLow.innerHTML=`${Math.round(response.main.temp_min)}&deg;c : ${Math.round(response.main.temp_max)}&deg;c`
    }

    function dateBuilder(dt){

        let mon= ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let days= ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let day, date, month, year;
        day = days[dt.getDay()];
        month = mon[dt.getMonth()];
        year= dt.getFullYear();
        date= dt.getDate();

        return `${day} ${month}, ${year} ${date}`;
    }