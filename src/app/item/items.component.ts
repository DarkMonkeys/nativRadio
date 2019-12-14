import { Component, OnInit } from "@angular/core";
import { Item } from "./item";
import { ItemService } from "./item.service";
const firebase = require("nativescript-plugin-firebase");
import { RouterExtensions } from "nativescript-angular/router";
import { ios } from "tns-core-modules/application";
import { SearchBar } from "tns-core-modules/ui/search-bar";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    styleUrls: ['./items-components.css']
})
export class ItemsComponent implements OnInit {
    items: Array<Item>;
    itemsNew: Array<Item>;
    transitions;
    searchPhrase: string;
    constructor(private itemService: ItemService, private router: RouterExtensions) { }

    ngOnInit(): void {
         this.items = this.itemService.getItems();
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
     searchRadio() {
            
        if(this.searchPhrase == null){
            console.log(this.searchPhrase);
            this.items = this.itemService.getItems();
        }else{
            console.log(this.searchPhrase);
            this.items = this.itemService.getItems().filter((item) => item.nom.includes(this.searchPhrase));
        }
     }
        
    }

