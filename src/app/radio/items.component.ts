import { Component, OnInit } from "@angular/core";
import { Item } from "./item";
import { ItemService } from "./item.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ios } from "tns-core-modules/application";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { registerElement } from "nativescript-angular";
registerElement("WebImage", () => require("nativescript-web-image-cache").WebImage);
var imageCache = require("nativescript-web-image-cache");
import * as Toast from 'nativescript-toast';
import { Page, isAndroid } from "tns-core-modules/ui/page/page";
import { from } from "rxjs";
const appSettings = require("tns-core-modules/application-settings");

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    styleUrls: ['./items-components.css']
})
export class ItemsComponent implements OnInit {
    private items = new Map<String,Item>();
    private arrayFavorites = new Array();
    private cpt:number = 0;
    private itemsNew = new Map<String,Item>();
    transitions;
    searchPhrase: string;
    colorize:string;
    scroll1:string = "visible";
    scroll2:string = "collapsed";
    constructor(private itemService: ItemService, private router: RouterExtensions) {imageCache.initialize();

    }

    ngOnInit(): void {
        
        
        //  somethingElse = page.getViewById('');
        //somethingElse.focus();

         this.items = this.itemService.getItems();
         if (ios) {
            this.transitions = ["fdlip"];
        } else {
            this.transitions = ["flip"];
        }
    }
    onNavigate(idItem: Item ): void {
        this.router.navigate(['item/'+ idItem],
            {
                animated: true,
                transition: {
                    name: this.transitions[Math.floor(Math.random() * this.transitions.length)],
                    duration: 680,
                    curve: "easeIn"
                }
            });
    }


    textChangeRadio(args) {
       
    this.itemsNew.clear();
     const searchBar = args.object as SearchBar;
     if (searchBar != null){
     this.itemService.getItems().forEach((value: Item, key: String) => {
     if(key.toLowerCase().includes(searchBar.text.toLowerCase())){
     this.itemsNew.set(key,value);
     }
 });
 this.items = this.itemsNew;
}

  }
     searchRadio(args) {

       this.itemsNew.clear();
        const searchBar = args.object as SearchBar;
        if (searchBar != null){
        this.itemService.getItems().forEach((value: Item, key: String) => {
        if(key.toLowerCase().includes(searchBar.text.toLowerCase())){
        this.itemsNew.set(key,value);
        }
    });
    this.items = this.itemsNew;
    searchBar.dismissSoftInput();
}
     }

     addFavorite(keyItem: string, etat: boolean){

        if(etat){

            this.items.get(keyItem).favoris = false;
            var toast = Toast.makeText("Webradio supprimée des favoris !");
            toast.show();
            this.cpt = 0;
            this.items.forEach(element => {
                
                this.arrayFavorites[this.cpt] = element.favoris;
                this.cpt++;
            });
            appSettings.setString("favorites", JSON.stringify(this.arrayFavorites));

        } else{

            this.items.get(keyItem).favoris = true;
            var toast = Toast.makeText("Webradio ajoutée dans les favoris !");
            toast.show();
            this.cpt = 0;
            this.items.forEach(element => {
                this.arrayFavorites[this.cpt] = element.favoris;
                this.cpt++;
            });
            appSettings.setString("favorites", JSON.stringify(this.arrayFavorites));
        }
   }
   
    sBLoaded(args){

const searchBar = args.object as SearchBar;
    setTimeout(() => {
        searchBar.dismissSoftInput();
    }, 300);

  
}
     onClear(args){
        this.items = this.itemService.getItems();
        const searchBar = args.object as SearchBar;
        searchBar.dismissSoftInput();
     }
     
     tabSelected(args: number) {
        
        if(args == 0){

            this.scroll1 = "visible";
            this.scroll2 = "collapsed";

        }else{

           this.scroll1 = "collapsed";
           this.scroll2 = "visible";
    }
        
    }
}

