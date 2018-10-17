import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { ListComponent } from './players/list/list.component';
import { AddPlayerComponent } from './players/add-player/add-player.component';
import { GameComponent } from './status/game/game.component';
import { StatusComponent } from './status/status.component';

@NgModule({
    declarations: [
        AppComponent,
        PlayersComponent,
        ListComponent,
        AddPlayerComponent,
        GameComponent,
        StatusComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [HttpService],
    bootstrap: [AppComponent]
})
export class AppModule { }
