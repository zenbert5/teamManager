import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { ListComponent } from './players/list/list.component';
import { AddPlayerComponent } from './players/add-player/add-player.component';
import { GameComponent } from './status/game/game.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
    { path: 'players', component: PlayersComponent, children:[
        { path: 'list', component: ListComponent },
        { path: 'addPlayer', component: AddPlayerComponent }
    ]},
    { path: 'status', component: StatusComponent, children:[
        { path: 'game/:id', component: GameComponent }
    ]},
    { path: '', pathMatch: 'full', redirectTo: '/players/list' },
    { path: '**', redirectTo: '/players/list' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
