function ajout()
{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function()
    {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200)
        {
           var response = JSON.parse(this.responseText);
           var ajoutRender = document.getElementById("ajout");
           ajoutRender.innerHTML=response[0].price;
           console.log(response);
        }
    }
    
    request.open("GET","http://localhost:3000/api/cameras");
    request.send();
}

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */