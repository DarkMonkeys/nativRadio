import { Injectable } from "@angular/core";
const firebase = require("nativescript-plugin-firebase");
import { Item } from "./item";
const Cache = require("tns-core-modules/ui/image-cache").Cache;

@Injectable({
    providedIn: "root"
})
export class ItemService {

    item: Item;
    itemArray: Item;
    cpt: Number = 1;
    private items = new Array<Item>(

        
        { id: 1, nom: "Rouge FM", streamurl: "https://onefm.ice.infomaniak.ch/rougefm-high.mp3", image: "https://www.rouge.com/img/logo.png",description:"quel couleur ta radio?" },
        { id: 2, nom: "Radio Lac", streamurl: "http://broadcast.infomaniak.net/yesfm-high.mp3", image: "https://www.rts.ch/2018/08/31/14/11/9812189.image/16x9/scale/width/624",description:"quel couleur ta radio?" },
        { id: 3, nom: "Virgin Radio Rock Switzerland", streamurl: "http://icecast.argovia.ch/vrock", image: "https://cdn-profiles.tunein.com/s303413/images/logoq.png?t=151792",description:"quel couleur ta radio?" },
        { id: 4, nom: "NRJ Léman", streamurl: "http://cdn.nrjaudio.fm/audio1/ch/50001/aac_64.mp3", image: "https://www.nrjleman.com/templates/nrjleman/images/2019/logo-nrj.png",description:"quel couleur ta radio?" },
        { id: 5, nom: "Radio Chablais", streamurl: "http://185.52.127.163/ch/50001/aac_64.mp3", image: "https://www.radiochablais.ch/telechargement.php?file=logo_RC.png",description:"quel couleur ta radio?" },
        {id: 6 , nom: "One FM", streamurl: "https://onefm.ice.infomaniak.ch/onefm-high.mp3", image: "https://www.onefm.ch/wp-content/uploads/2017/07/logos-1.png",description:"quel couleur ta radio?" }
        );

    constructor(){
        //Appel Firebase

        
        //objet firebase radioFb
        /*
        this.items.forEach(element => {
            
            this.itemArray = { id: cpt , nom: radioFb.nom , streamurl: radioFb.streamurl, image: radioFb.logo ,description: radioFb.description};
            this.items.push(this.itemArray);
            cpt++;
        });
        */

    }
    getItems(): Array<Item> {

        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter((item) => item.id === id)[0];
    }


}
