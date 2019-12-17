import { Injectable } from "@angular/core";
const firebase = require("nativescript-plugin-firebase");
import { Item } from "./item";
const appSettings = require("tns-core-modules/application-settings");
@Injectable({
    providedIn: "root"
})
export class ItemService {

    item: Item;
    itemArray: Item;
    cpt: Number = 1;
    private items = new Map<String,Item>();

        
        

    constructor(){

        this.items.set("Rouge FM",{ id: 1, streamurl: "https://onefm.ice.infomaniak.ch/rougefm-high.mp3", image: "https://upload.wikimedia.org/wikipedia/fr/9/92/Rouge_FM_2011_logo.png",description:"quel couleur ta radio?", favoris:true }),
        this.items.set("Radio Lac",{ id: 2, streamurl: "https://radiolac.ice.infomaniak.ch/radiolac-high.mp3", image: "https://www.rts.ch/2018/08/31/14/11/9812189.image/16x9/scale/width/624",description:"quel couleur ta radio?",favoris:true }),
        this.items.set("Virgin Radio Rock Switzerland",{ id: 3, streamurl: "http://icecast.argovia.ch/vrock", image: "https://cdn-profiles.tunein.com/s303413/images/logog.png",description:"quel couleur ta radio?" ,favoris:false}),
        this.items.set("NRJ Léman",{ id: 4, streamurl: "http://cdn.nrjaudio.fm/audio1/ch/50001/aac_64.mp3", image: "https://www.nrjleman.com/templates/nrjleman/images/2019/logo-nrj.png",description:"quel couleur ta radio?" ,favoris:false}),
        this.items.set("Radio Chablais",{ id: 5, streamurl: "http://185.52.127.163/ch/50001/aac_64.mp3", image: "https://www.radiochablais.ch/telechargement.php?file=logo_RC.png",description:"quel couleur ta radio?" ,favoris:false}),
        this.items.set("One FM",{id: 6 , streamurl: "https://onefm.ice.infomaniak.ch/onefm-high.mp3", image: "https://www.onefmunplugged.ch/wp-content/uploads/2019/09/onefm-unplugged-rgb-1.png",description:"quel couleur ta radio?" ,favoris:false})
        //Appel Firebase
       /* db.ref("radio").on('value', (snap) => {
             var rootVals = snap.val();
             console.log(rootVals);
          } );
          */
          
      
        
        //objet firebase radioFb
        /*
        this.radioFb.forEach(element => {
            
            this.itemArray = { id: cpt , nom: element.nom , streamurl: element.streamurl, image: element.logo ,description: element.description};
            this.items = null;
            this.items.push(this.itemArray);
            cpt++;
        });
        */

    }
    getItems(): Map<String,Item> {

        /*if(localStorage.getItem("favoris") != null){

            //return this.items = localStorage.getItem("favoris");
            return this.items;

        }else{

            return this.items;
        }*/
        console.log("hello");
        if(localStorage.getItem("favoris") === null){
            console.log("test");
            return this.items;
        }
        console.log("test2");
            var retrievedObject = localStorage.getItem('favoris');
            return this.items = JSON.parse(retrievedObject);
    
    }

    getItem(id: number): Item {
        return Array.from(this.items.values()).filter((item: Item) => item.id === id)[0];
    }
}
