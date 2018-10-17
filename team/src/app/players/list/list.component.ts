import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    players: object;
    constructor(
        private _httpService: HttpService,
    ) {}

    ngOnInit() {
        this.getPlayers()
    }

    // fetch all players from the server
    getPlayers() {
        let observable = this._httpService.getAllPlayers();
        observable.subscribe(data => {
            console.log(`fetched all players ${data}`);
            this.players = data;
        })
    }

    // delete player
    deletePlayer(id: string) {
        console.log('deleteing player', id)
        let observable = this._httpService.deleteThisPlayer(id);
        observable.subscribe(data => {
            console.log(`deleted player with result code ${data}`);
            this.getPlayers();
        })
    }
}