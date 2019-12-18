import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { AnimationCurve } from "ui/enums";
import { screen } from "platform";
import { setTimeout } from "timer";

@Component({
	selector: "BottomBar",
	moduleId: module.id,
	templateUrl: "./bottomBar.component.html",
	styleUrls: ['./bottomBar.component.css']
})
export class BottomBarComponent implements OnInit {

	@ViewChild('tabHighlight', { static: false }) tabHighlight: ElementRef;
	selectedTab: number = 0;

	@ViewChild('image1', { static: false }) image1: ElementRef;
	@ViewChild('image2', { static: false }) image2: ElementRef;

	@Output() tabSelected = new EventEmitter<number>();


	constructor() {
	}

	ngOnInit(): void {
	}

	ngAfterViewInit() {
		setTimeout(() => { this.animateCurrentImage(this.image1); }, 100);
	}

	selectTab(index: number) {
		let previousTab = this.selectedTab;
		if (index != this.selectedTab) {
			this.selectedTab = index;
			this.tabHighlight.nativeElement.animate({
				translate: { x: index * screen.mainScreen.widthDIPs / 2, y: 0 },
				curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
				duration: 300
			})
			this.animateCurrentImage(this.getImage(index));
			this.animatePreviousImage(this.getImage(previousTab));
			this.tabSelected.emit(this.selectedTab);
		}
	}

	getImage(index) {
		let currentImage;
		switch (index) {
			case 0:
				currentImage = this.image1;
				break;
			case 1:
				currentImage = this.image2;
				break;
			default:
				break;
		}
		return currentImage;
	}

	animateCurrentImage(arg: any) {
		arg.nativeElement.animate({
			scale: { x: 1.2, y: 1.2 },
			curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
			duration: 300
		});
	}

	animatePreviousImage(arg: any) {
		arg.nativeElement.animate({
			scale: { x: 1, y: 1 },
			curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
			duration: 300
		})
	}

}