  //When the button is clicked, the value is fetched to the api
  document.getElementById("submit").addEventListener('click', async () => {
    const inputValue = Number(document.getElementById("arabic-numeral").value);
    if (inputValue) {
        if (inputValue >= 1 && inputValue <= 100) {
            //Since we don't need to process asynchronous actions, we're using async/await to have a more readable code
            //Waiting the fetch promise
            response = await fetch("/api/conversion", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    data: inputValue
                })
            });

            //Waiting the response.text() promise to display the result
            document.getElementById("result").style.color = "BLACK";
            document.getElementById("result").value = await response.text();

        } else {
            //The arabic-numeral variable is out of range (1 to 100)
            alert("Error : Invalid number");
            document.getElementById("result").style.color = "RED";
            document.getElementById("result").value = `Enter a Arabic numeral from 1 to 100 and ${inputValue} is not in this range`;
        }
    }
    else{
        //The arabic-numeral variable is undefined
        alert("Error : Enter a number");
        document.getElementById("result").style.color = "RED";
        document.getElementById("result").value = `Enter an Arabic numeral from 1 to 100`;
    }
});