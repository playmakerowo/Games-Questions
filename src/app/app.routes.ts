import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { GameComponent } from './views/game/game.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'game/:category', component: GameComponent },
    { path: '**', component: HomeComponent }
];