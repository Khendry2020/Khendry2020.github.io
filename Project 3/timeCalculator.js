function timeMath(){
    const AU = 149597870; //Astronomical Unit. distance between earth and sun in kilometers
      const SOL = 299792458; //Speed of light in M/S. Time light takes to reach earth from the sun
      const QTS = 0.2; //Quantum travel speed is 0.2 the speed of light
      const Scale = 8; //Scale of the game universe vs our univerese is 1/8 so we divide by 8
      var x = 0.0; //temp variaable to allow math
      var input = document.getElementById('distance').value; // user input
      var ans = 0; //answer
      var time;

      x = parseFloat(input) * AU;
      console.log(x);
      x = x / SOL;
      console.log(x);
      x = x * 1000;
      console.log(x);
      x = x / QTS;
      console.log(x);
      x = x / 60;
      console.log(x);
      x = x / Scale;
      console.log(x);
      ans = x;
      console.log(ans);

      ans = ans / 60;
      console.log(ans);

    if (ans <= 60){
        time = " minute's";
    }
    else {
        time = " hour's"
    }

      document.getElementById('time').innerHTML = "Quantum travel time to Destination " +ans.toFixed(2)+time;
}