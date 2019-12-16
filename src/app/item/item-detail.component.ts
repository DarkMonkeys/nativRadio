import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TNSPlayer } from "nativescript-audio";
import { isIOS } from "tns-core-modules/platform";
import { Item } from "./item";
import { ItemService } from "./item.service";
import {
    LoadingIndicator,
    Mode,
    OptionsCommon
  } from '@nstudio/nativescript-loading-indicator';
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { EventData } from "tns-core-modules/data/observable";
var imageCache = require("nativescript-web-image-cache");
var frameModule = require("ui/frame");
@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html",
    styleUrls: ['./item-detail-component.css']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
    item: Item;
    player: TNSPlayer;
    _checkInterval;
    progress = 0;
    isPlaying = false;
    isBusy: boolean = true;


    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute) {

            imageCache.initialize();
            setTimeout(() => {
                this.isBusy = false;
            }, 8000);
           
    }
    onBusyChanged(args: EventData) {
        let indicator: ActivityIndicator = <ActivityIndicator>args.object;
        console.log("indicator.busy changed to: " + indicator.busy);
    }

    ngOnInit(): void {
        
        const id = +this.route.snapshot.params.id;
        this.item = this.itemService.getItem(id);
        this.playerLoad();
       
    }
    playPause() {
        if (this.player.isAudioPlaying()) {
            this.player.pause();
        } else {
            
            this.player.play();
            
        }
    }
    playerLoad(){

        this.player = new TNSPlayer();
        this.player.android;

        const playerOptions = {
            audioFile: this.item.streamurl, //this.item.streamurl,  https://www.w3schools.com/html/horse.mp3
            loop: false,
            autoplay: false,
        };

        this.player
            .initFromUrl(playerOptions)
            .then((res) => {
              //  console.log(res);
            })
            .catch((err) => {
             //   console.log("something went wrong...", err);
            });

            this._checkInterval = setInterval(() => {
                this.player.getAudioTrackDuration().then((duration: any) => {
                    // iOS: duration is in seconds
                    // Android: duration is in milliseconds
                    let current = this.player.currentTime
                    if (isIOS) {
                        duration *= 1000
                        current *= 1000
                    }
    
                    this.progress = Math.ceil(current / duration * 100);
    
                    this.isPlaying = this.player.isAudioPlaying()
                });
            }, 200);
    }
    resume(){
        this.playerLoad();
    }

    ngOnDestroy() {
        clearInterval(this._checkInterval);
    }

    
}
