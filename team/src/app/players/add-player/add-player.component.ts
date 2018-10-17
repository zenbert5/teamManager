
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-player',
    templateUrl: './add-player.component.html',
    styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
    player: object;

    constructor(
        private _httpService: HttpService,
        private _router: Router
    ) {}

    ngOnInit() {
        this.player = {
            name: '',
            position: '',
            status: {
                1: 'undecided',
                2: 'undecided',
                3: 'undecided'
            }
        }
    }

    // add player method -- invoked from add player form
    addPlayer() {
        let observable = this._httpService.addAPlayer(this.player);
        console.log(`submitting a new player --> ${this.player}`);
        console.log(this.player['status']);
        observable.subscribe(data => {
            console.log(`completed user registration --> ${data}`);
            this._router.navigate(['/players/list']);
        })
    }
}
