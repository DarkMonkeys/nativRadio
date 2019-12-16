import { Component, OnInit } from "@angular/core";
import { Item } from "./item";
import { ItemService } from "./item.service";
const firebase = require("nativescript-plugin-firebase");
import { RouterExtensions } from "nativescript-angular/router";
import { ios } from "tns-core-modules/application";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { registerElement } from "nativescript-angular";
registerElement("WebImage", () => require("nativescript-web-image-cache").WebImage);
var imageCache = require("nativescript-web-image-cache");
import { Fontawesome } from 'nativescript-fontawesome';



@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    styleUrls: ['./items-components.css']
})
export class ItemsComponent implements OnInit {
    private items = new Map<String,Item>();
    private itemsNew = new Map<String,Item>();
    transitions;
    searchPhrase: string;
    constructor(private itemService: ItemService, private router: RouterExtensions) {imageCache.initialize();}

    ngOnInit(): void {
        Fontawesome.init();
         this.items = this.itemService.getItems();
         //this.items.get("Rouge FM").description = "true";
         if (ios) {
            this.transitions = ["flip"];
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
     searchRadio(args) {

           // this.items = this.itemService.getItems().filter(item => item.nom.toUpperCase().includes(this.searchPhrase.toUpperCase()));

       this.itemsNew.clear();
        const searchBar = args.object as SearchBar;
        this.itemService.getItems().forEach((value: Item, key: String) => {
        if(key.toLowerCase().includes(searchBar.text.toLowerCase())){
        this.itemsNew.set(key,value);
        }
    });
    this.items = this.itemsNew;

     }

     onClear(){
        this.items = this.itemService.getItems();
     }
        
    }

