import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
    game: string = '1';
    players: object;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            this.game = params['id']
        })
        this.getPlayers();
    }

    setGame(id: string) {
        this._router.navigate([`/status/game/${id}`]);
    }

    // get all the players info
    getPlayers() {
        let observable = this._httpService.getAllPlayers();
        observable.subscribe(data => {
            console.log(`fetched all players ${data}`);
            this.players = data;
        })
    }

    // set the player's game status to playing
    setPlaying(id: string) {
        let shipStatus = {
            uid: id,
            game: this.game,
            status: 'playing'
        }
        let observable = this._httpService.setPlayerStatus(shipStatus);
        observable.subscribe(data => {
            console.log(`game.component.ts player status set! ${data}`)
            this.getPlayers();
        })
    }

    // set the player's game status to not playing
    setNotPlaying(id: string) {
        let shipStatus = {
            uid: id,
            game: this.game,
            status: 'notplay'
        }
        let observable = this._httpService.setPlayerStatus(shipStatus);
        observable.subscribe(data => {
            console.log(`game.component.ts player status set! ${data}`)
            this.getPlayers();
        })
    }

    // set the player's game status to undecided
    setUndecided(id: string) {
        let shipStatus = {
            uid: id,
            game: this.game,
            status: 'undecided'
        }
        let observable = this._httpService.setPlayerStatus(shipStatus);
        observable.subscribe(data => {
            console.log(`game.component.ts player status set! ${data}`)
            this.getPlayers();
        })
    }
}
