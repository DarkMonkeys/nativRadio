import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TNSPlayer } from "nativescript-audio";
import { isIOS } from "tns-core-modules/platform";
import { Item } from "./item";
import { ItemService } from "./item.service";
import { Video } from 'nativescript-videoplayer';
import { AsyncAction } from "rxjs/internal/scheduler/AsyncAction";

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


    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute) {
           
    }

    ngOnInit(): void {
        
        const id = +this.route.snapshot.params.id;
        this.item = this.itemService.getItem(id);
        
        this.player = new TNSPlayer();
        this.player.android;

        const playerOptions = {
            audioFile: this.item.streamurl, //this.item.streamurl,  https://www.w3schools.com/html/horse.mp3
            loop: false,
            autoplay: false,
            encoder: 3,
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
    playPause() {
        if (this.player.isAudioPlaying()) {
            this.player.pause();
        } else {
            this.player.play();
        }
    }

    ngOnDestroy() {
        clearInterval(this._checkInterval);
    }
}
