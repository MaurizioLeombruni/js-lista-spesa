let groceryElement;
let groceryCount = 0;

const groceryArray=[];
const groceryList = document.getElementById('groceryList');

//La funzione getElement() assegna a groceryElement il valore nell'input del form. Se l'input è vuoto, viene ignorato.
//Se l'input è valido, mette l'elemento nell'array.

//La funzione clearGroceryList() pulisce completamente la lista della spesa, permettendo di iniziare da capo. Prende in ingresso una booleana, per indicare
//se vogliamo una pulizia completa (true) o solo dell'HTML (false).

function clearGroceryList(bool){

    //Rimuove tutti gli elementi dalla lista nel documento HTML.

    while(groceryList.hasChildNodes()){
        groceryList.removeChild(groceryList.firstChild);
    }

    //Se la funzione viene chiamata con true, pulisce anche l'array dei valori della lista.

    if(bool){
        while(groceryArray.length > 0){
            groceryArray.pop();
        }
    
    }

}

//La funzione addElementToList() prende un indice in ingresso e lo usa per determinare l'oggetto da aggiungere alla lista. Dopodiché procede a creare l'oggetto
//e le sue caratteristiche da aggiungere alla visualizzazione in browser.

function addElementToList(index){

    //Creiamo gli elementi necessari a stilare l'elemento della lista, prendendo il testo e creando l'apposito bottone.

    let node = document.createElement('li');
    let textnode = document.createTextNode(groceryArray[index]);
    let newButton = document.createElement('button');
    let buttonText = document.createTextNode('Elimina')
    
    //Settiamo gli attributi necessari al corretto funzionamento dell'elemento della lista.
    //Forniamo all'elemento un id dinamico, basato sulla posizione dell'elemento nell'array. L'id servirà a trovare l'oggetto
    //in caso l'utente voglia poi rimuoverlo.

    newButton.setAttribute('onclick', "removeElement(" + index +")");
    newButton.setAttribute('class', 'btn btn-primary m-3')
    newButton.appendChild(buttonText);
    node.setAttribute('id', index);

    //Rendiamo il testo e il bottone figli dell'elemento <li>, in modo da eliminare tutto rimuovendo semplicemente il tag HTML.
    node.appendChild(textnode);
    node.appendChild(newButton);
    
    //Inseriamo l'elemento nella lista.

    groceryList.appendChild(node);
}

function getElement(){
    groceryElement = document.getElementById('inputElement').value;

    if(groceryElement === null || groceryElement === "" || groceryElement === " "){
        return false;
    } else {
        groceryArray.push(groceryElement);
        addElementToList(groceryArray.length-1);
    }
}

//La funzione removeElement() prende in ingresso un id (fornito alla creazione dinamica del bottone) e lo usa trovare l'elemento nell'array, dove viene eliminato.
//Dopodiché la lista viene ricostruita da 0, riassegnando correttamente i nuovi id a tutti gli elementi.
//La mancanza di una riassegnazione degli id comporterebbe l'eliminazione degli elementi sbagliati nella lista.

function removeElement(itemId){

    groceryArray.splice(itemId, 1);

    clearGroceryList(false);
    writeList();

}



//La funzione writeList() prepara la lista della spesa da stampare.

function writeList(){

    //Un ciclo while pulisce la vecchia lista stampata, se esiste.

    clearGroceryList(false);

    //SANITY CHECK: la funzione viene ignorata se la lista della spesa è vuota.

    if(groceryArray.length !== 0){

        //Stiliamo la lista con un ciclo for.

        for(i=0; i<groceryArray.length; i++){

            addElementToList(i);

        }

    }

    

}