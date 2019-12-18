import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./radio/items.component";
import { ItemDetailComponent } from "./radio/details/item-detail.component";
import { registerElement } from "nativescript-angular";
registerElement("WebImage", () => require("nativescript-web-image-cache").WebImage);
import { Fontawesome } from 'nativescript-fontawesome';
Fontawesome.init();

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { BottomBarModule } from './bottomBar/bottomBar.module';
import { TNSFontIconModule , TNSFontIconService } from 'nativescript-ngx-fonticon';

@NgModule({
   bootstrap: [
      AppComponent
   ],
   imports: [
      NativeScriptModule,
      AppRoutingModule,
      BottomBarModule,
		TNSFontIconModule.forRoot({
			'fa': require('./assets/font-awesome.css')
		})
   ],
   declarations: [
      AppComponent,
      ItemsComponent,
      ItemDetailComponent,
   ],
   providers: [],
   schemas: [
      NO_ERRORS_SCHEMA
   ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
