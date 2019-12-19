import { Injectable } from "@angular/core";
import { Item } from "./item";
const firebase = require("nativescript-plugin-firebase");
@Injectable({
    providedIn: "root"
})
export class ItemService {

    item: Item;
    itemArray: Item;
    cpt: Number = 1;
    private items = new Map<String,Item>();
    private fbValue:JSON;
    
      
        

    constructor(){


        this.items.set("Rouge FM",{ id: 1, streamurl: "https://onefm.ice.infomaniak.ch/rougefm-high.mp3", image: "https://upload.wikimedia.org/wikipedia/fr/9/92/Rouge_FM_2011_logo.png",description:"quel couleur ta radio?", favoris:false }),
        this.items.set("Radio Lac",{ id: 2, streamurl: "https://radiolac.ice.infomaniak.ch/radiolac-high.mp3", image: "https://www.rts.ch/2018/08/31/14/11/9812189.image/16x9/scale/width/624",description:"quel couleur ta radio?",favoris:false }),
        this.items.set("Virgin Radio Rock Switzerland",{ id: 3, streamurl: "http://icecast.argovia.ch/vrock", image: "https://cdn-profiles.tunein.com/s303413/images/logog.png",description:"quel couleur ta radio?" ,favoris:false}),
        this.items.set("NRJ Léman",{ id: 4, streamurl: "http://cdn.nrjaudio.fm/audio1/ch/50001/aac_64.mp3", image: "https://www.nrjleman.com/templates/nrjleman/images/2019/logo-nrj.png",description:"quel couleur ta radio?" ,favoris:false}),
        this.items.set("Radio Chablais",{ id: 5, streamurl: "http://185.52.127.163/ch/50001/aac_64.mp3", image: "https://www.radiochablais.ch/telechargement.php?file=logo_RC.png",description:"quel couleur ta radio?" ,favoris:false}),
        this.items.set("One FM",{id: 6 , streamurl: "https://onefm.ice.infomaniak.ch/onefm-high.mp3", image: "https://www.onefmunplugged.ch/wp-content/uploads/2019/09/onefm-unplugged-rgb-1.png",description:"quel couleur ta radio?" ,favoris:false})

    }

    getFirebase(result): void{
        
        console.log(result);
        this.fbValue = result;
        console.log(this.fbValue);




    }

    getItems(): Map<String,Item> {

        /*if(localStorage.getItem("favoris") != null){

            //return this.items = localStorage.getItem("favoris");
            return this.items;

        }else{

            return this.items;
        }*/
        /*
        if(localStorage.getItem("favoris") === null){
     
            return this.items;
        }
            var retrievedObject = localStorage.getItem('favoris');
            return this.items = JSON.parse(retrievedObject);*/

            return this.items;
    
    }

    getItem(id: number): Item {
        return Array.from(this.items.values()).filter((item: Item) => item.id === id)[0];
    }
}
